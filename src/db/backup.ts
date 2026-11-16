import { lessons, problems } from "../data/learning";
import { validateStore } from "../features/formulas/engine";
export const backupKeys = [
  "mc-learning-v1",
  "mc-formula-v1",
  "mc-theme",
] as const;
type BackupKey = (typeof backupKeys)[number];
export interface Backup {
  backupVersion: 1;
  applicationId: "com.michael.calculus";
  exportedAt: string;
  storage: Partial<Record<BackupKey, string>>;
}
const obj = (v: unknown): v is Record<string, unknown> =>
  v !== null && typeof v === "object" && !Array.isArray(v);
export function parseBackup(text: string): Backup {
  if (new TextEncoder().encode(text).byteLength > 2 * 1024 * 1024)
    throw Error("备份超过 2 MB，请检查文件来源。");
  const raw: unknown = JSON.parse(text);
  if (
    !obj(raw) ||
    raw.backupVersion !== 1 ||
    raw.applicationId !== "com.michael.calculus" ||
    typeof raw.exportedAt !== "string" ||
    !Number.isFinite(Date.parse(raw.exportedAt)) ||
    !obj(raw.storage)
  )
    throw Error("这不是受支持的 Michael calculus 学习备份。");
  const storage: Backup["storage"] = {};
  for (const [key, value] of Object.entries(raw.storage)) {
    if (!backupKeys.includes(key as BackupKey))
      throw Error("备份含有不支持的存储项，已停止导入。");
    if (value === null) continue;
    if (typeof value !== "string") throw Error("备份存储值格式错误。");
    if (key === "mc-theme") {
      if (value !== "light" && value !== "dark") throw Error("主题格式错误。");
    } else {
      const data: unknown = JSON.parse(value);
      if (!obj(data)) throw Error("学习记录格式错误。");
      if (key === "mc-learning-v1") {
        if (
          !Array.isArray(data.completed) ||
          !data.completed.every((id) => lessons.some((l) => l.id === id)) ||
          !lessons.some((l) => l.id === data.lastLesson) ||
          !Array.isArray(data.attempts) ||
          data.attempts.length > 500 ||
          !data.attempts.every(
            (a) =>
              obj(a) &&
              problems.some((p) => p.id === a.problemId) &&
              typeof a.answer === "string" &&
              typeof a.correct === "boolean" &&
              typeof a.at === "string" &&
              Number.isFinite(Date.parse(a.at)) &&
              typeof a.hints === "number" &&
              Number.isInteger(a.hints) &&
              a.hints >= 0 &&
              a.hints <= 3,
          )
        )
          throw Error("课程备份损坏或来自更新的应用，请不要卸载旧版。");
      } else {
        if (
          data.version !== 1 ||
          !obj(data.cards) ||
          !Array.isArray(data.reviews) ||
          !Array.isArray(data.stuck) ||
          !obj(data.settings)
        )
          throw Error("公式备份格式错误。");
        const clean = validateStore(data);
        if (
          Object.keys(clean.cards).length !== Object.keys(data.cards).length ||
          clean.reviews.length !== data.reviews.length ||
          clean.stuck.length !== data.stuck.length
        )
          throw Error("公式备份包含损坏或本版不支持的记录，请不要卸载旧版。");
      }
    }
    storage[key as BackupKey] = value;
  }
  if (Object.keys(storage).length === 0)
    throw Error("备份为空，没有可导入的数据。");
  return {
    backupVersion: 1,
    applicationId: "com.michael.calculus",
    exportedAt: raw.exportedAt,
    storage,
  };
}
export function importBackup(backup: Backup, store: Storage = localStorage) {
  // Revalidate at the write boundary. Keep original values for rollback on quota/storage failure.
  const valid = parseBackup(JSON.stringify(backup));
  const entries = Object.entries(valid.storage);
  const previous = entries.map(([key]) => [key, store.getItem(key)] as const);
  const changed: string[] = [];
  try {
    for (const [key, value] of entries) {
      store.setItem(key, value!);
      changed.push(key);
    }
  } catch {
    let rollbackFailed = false;
    for (const [key, value] of previous
      .filter(([key]) => changed.includes(key))
      .reverse())
      try {
        if (value === null) store.removeItem(key);
        else store.setItem(key, value);
      } catch {
        rollbackFailed = true;
      }
    throw Error(
      rollbackFailed
        ? "保存失败，原记录未能完全恢复。请保留备份，不要卸载应用。"
        : "保存失败，原记录已保留。请检查设备存储空间，保留备份并重试。",
    );
  }
}
export function backupSummary(backup: Backup) {
  const learning = JSON.parse(
    backup.storage["mc-learning-v1"] || '{"completed":[],"attempts":[]}',
  );
  const formulas = JSON.parse(
    backup.storage["mc-formula-v1"] || '{"reviews":[]}',
  );
  return {
    completed: learning.completed.length,
    attempts: learning.attempts.length,
    reviews: formulas.reviews.length,
  };
}
