import {
  formulas,
  formulaById,
  type FormulaCard,
  type CardKind,
} from "../../data/formulas";
import { problems } from "../../data/learning";
import type { Attempt } from "../../db/learning";
export type Result = "good" | "fuzzy" | "forgot";
export type ReviewMode = "learn" | "due" | "spot";
export const errorTags = {
  sign: "符号或负号",
  coef: "系数",
  power: "指数或幂次",
  condition: "适用条件",
  order: "导数阶数",
  mixup: "公式记混",
  blank: "想不起来",
};
export type ErrorTag = keyof typeof errorTags;
export interface CardState {
  box: number;
  due: string;
  lapses: number;
  lastResult?: Result;
}
export interface Review {
  cardId: string;
  at: string;
  mode: ReviewMode;
  result: Result;
  errorTags: ErrorTag[];
}
export interface FormulaStore {
  version: 1;
  cards: Record<string, CardState>;
  reviews: Review[];
  stuck: { formulaId: string; problemId: string; at: string }[];
  settings: { newPerDay: number };
}
export function emptyStore(): FormulaStore {
  return {
    version: 1,
    cards: {},
    reviews: [],
    stuck: [],
    settings: { newPerDay: 5 },
  };
}
export const cards: FormulaCard[] = formulas.flatMap((f) => [
  ...f.cloze.map((_, index) => ({
    id: `${f.id}:cloze:${index}`,
    formulaId: f.id,
    kind: "cloze" as const,
    index,
  })),
  { id: `${f.id}:recall`, formulaId: f.id, kind: "recall" as const },
  ...(f.conditionQuiz
    ? [{ id: `${f.id}:condition`, formulaId: f.id, kind: "condition" as const }]
    : []),
  ...problems
    .filter((p) => p.formulaIds?.[0] === f.id)
    .map((p) => ({
      id: `${f.id}:recognize:${p.id}`,
      formulaId: f.id,
      kind: "recognize" as const,
      problemId: p.id,
    })),
]);
export const cardById = new Map(cards.map((c) => [c.id, c]));
export function localDay(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function addDays(day: string, n: number): string {
  const [y, m, d] = day.split("-").map(Number);
  return localDay(new Date(y, m - 1, d + n, 12));
}
function validDay(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value))
    return false;
  const [y, m, d] = value.split("-").map(Number);
  return localDay(new Date(y, m - 1, d, 12)) === value;
}
function validTime(v: unknown): v is string {
  return typeof v === "string" && Number.isFinite(Date.parse(v));
}
const resultValid = (v: unknown): v is Result =>
  v === "good" || v === "fuzzy" || v === "forgot";
const object = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);
export function validateStore(raw: unknown): FormulaStore {
  const out = emptyStore();
  if (!object(raw) || raw.version !== 1) return out;
  if (object(raw.cards))
    for (const [id, v] of Object.entries(raw.cards))
      if (
        cardById.has(id) &&
        object(v) &&
        Number.isInteger(v.box) &&
        Number(v.box) >= 0 &&
        Number(v.box) <= 6 &&
        validDay(v.due) &&
        Number.isInteger(v.lapses) &&
        Number(v.lapses) >= 0 &&
        (v.lastResult === undefined || resultValid(v.lastResult))
      )
        out.cards[id] = {
          box: Number(v.box),
          due: v.due,
          lapses: Number(v.lapses),
          ...(v.lastResult ? { lastResult: v.lastResult } : {}),
        };
  if (Array.isArray(raw.reviews))
    for (const v of raw.reviews)
      if (
        object(v) &&
        typeof v.cardId === "string" &&
        cardById.has(v.cardId) &&
        validTime(v.at) &&
        resultValid(v.result) &&
        (v.mode === "learn" || v.mode === "due" || v.mode === "spot")
      )
        out.reviews.push({
          cardId: v.cardId,
          at: v.at,
          mode: v.mode,
          result: v.result,
          errorTags: Array.isArray(v.errorTags)
            ? v.errorTags.filter(
                (x): x is ErrorTag =>
                  typeof x === "string" && Object.hasOwn(errorTags, x),
              )
            : [],
        });
  out.reviews = out.reviews.slice(-2000);
  if (Array.isArray(raw.stuck))
    for (const v of raw.stuck)
      if (
        object(v) &&
        typeof v.formulaId === "string" &&
        formulaById.has(v.formulaId) &&
        typeof v.problemId === "string" &&
        problems.some(
          (p) =>
            p.id === v.problemId &&
            p.formulaIds?.includes(v.formulaId as string),
        ) &&
        validTime(v.at)
      )
        out.stuck.push({
          formulaId: v.formulaId,
          problemId: v.problemId,
          at: v.at,
        });
  out.stuck = out.stuck.slice(-2000);
  if (
    object(raw.settings) &&
    Number.isInteger(raw.settings.newPerDay) &&
    Number(raw.settings.newPerDay) >= 0 &&
    Number(raw.settings.newPerDay) <= 20
  )
    out.settings.newPerDay = Number(raw.settings.newPerDay);
  return out;
}
export function recordReview(
  store: FormulaStore,
  cardId: string,
  result: Result,
  mode: ReviewMode,
  tags: ErrorTag[] = [],
  now = new Date(),
): FormulaStore {
  if (!cardById.has(cardId)) return store;
  const old = store.cards[cardId] ?? { box: 0, due: localDay(now), lapses: 0 };
  const box =
    result === "good"
      ? Math.min(6, old.box + 1)
      : result === "forgot"
        ? 1
        : Math.max(1, old.box);
  const interval = result === "good" ? [0, 1, 2, 4, 7, 15, 30][box] : 1;
  return {
    ...store,
    cards: {
      ...store.cards,
      [cardId]: {
        box,
        due: addDays(localDay(now), interval),
        lapses: old.lapses + (result === "forgot" ? 1 : 0),
        lastResult: result,
      },
    },
    reviews: [
      ...store.reviews,
      { cardId, at: now.toISOString(), mode, result, errorTags: tags },
    ].slice(-2000),
  };
}
export function markStuck(
  store: FormulaStore,
  formulaId: string,
  problemId: string,
  now = new Date(),
): FormulaStore {
  if (
    !problems.some(
      (p) => p.id === problemId && p.formulaIds?.includes(formulaId),
    )
  )
    return store;
  const next = {
    ...store,
    cards: { ...store.cards },
    stuck: [
      ...store.stuck,
      { formulaId, problemId, at: now.toISOString() },
    ].slice(-2000),
  };
  for (const c of cards.filter((c) => c.formulaId === formulaId))
    next.cards[c.id] = {
      ...(store.cards[c.id] ?? { box: 0, lapses: 0 }),
      due: localDay(now),
    };
  return next;
}
export function level(
  formulaId: string,
  store: FormulaStore,
  attempts: Attempt[] = [],
  now = new Date(),
): number {
  const mine = cards.filter((c) => c.formulaId === formulaId);
  const rev = store.reviews.filter(
    (r) => cardById.get(r.cardId)?.formulaId === formulaId,
  );
  if (!mine.some((c) => store.cards[c.id]?.lastResult) && !rev.length) return 0;
  if (
    !mine
      .filter((c) => c.kind === "cloze")
      .every((c) => store.cards[c.id]?.lastResult === "good")
  )
    return 1;
  const recall = mine.find((c) => c.kind === "recall")!;
  const goodDates = (kind: CardKind) =>
    new Set(
      rev
        .filter(
          (r) => cardById.get(r.cardId)?.kind === kind && r.result === "good",
        )
        .map((r) => localDay(new Date(r.at))),
    ).size;
  if (
    goodDates("recall") < 2 ||
    store.cards[recall.id]?.lastResult === "forgot"
  )
    return 2;
  const condition = mine.find((c) => c.kind === "condition");
  if (condition && store.cards[condition.id]?.lastResult !== "good") return 3;
  const recognized = rev.filter(
    (r) => cardById.get(r.cardId)?.kind === "recognize",
  );
  if (goodDates("recognize") < 2 || recognized.at(-1)?.result !== "good")
    return 4;
  if (
    store.stuck.some(
      (s) =>
        s.formulaId === formulaId &&
        localDay(new Date(s.at)) >= addDays(localDay(now), -13),
    )
  )
    return 4;
  const related = problems.filter((p) => p.formulaIds?.includes(formulaId));
  const latest = attempts
    .filter((a) => related.some((p) => p.id === a.problemId))
    .at(-1);
  if (related.length && !latest?.correct) return 4;
  return 5;
}
export function weak(
  formulaId: string,
  store: FormulaStore,
  now = new Date(),
): boolean {
  if (
    store.stuck.some(
      (s) =>
        s.formulaId === formulaId &&
        localDay(new Date(s.at)) >= addDays(localDay(now), -6),
    )
  )
    return true;
  return cards
    .filter((c) => c.formulaId === formulaId)
    .some((c) => {
      const recent = store.reviews.filter((r) => r.cardId === c.id).slice(-3);
      return (
        (store.cards[c.id]?.lapses ?? 0) >= 3 ||
        recent.filter((r) => r.result !== "good").length >= 2
      );
    });
}
export function counters(store: FormulaStore, now = new Date()) {
  const today = localDay(now);
  const newToday = new Set(
    store.reviews
      .filter((r) => r.mode === "learn" && localDay(new Date(r.at)) === today)
      .map((r) => cardById.get(r.cardId)?.formulaId),
  ).size;
  return {
    due: Object.values(store.cards).filter((c) => c.due <= today).length,
    newToday,
    weak: formulas.filter((f) => weak(f.id, store, now)).length,
  };
}
export type QueueMode = "due" | "cloze" | "recall" | "spot" | "recognize";
export interface QueueItem {
  cardId: string;
  mode: ReviewMode;
}
export function formulaReviewQueue(formulaId: string, store: FormulaStore): QueueItem[] {
  const matches = cards.filter((card) => card.formulaId === formulaId);
  const mode = matches.some((card) => store.cards[card.id]?.lastResult) ? "due" : "learn";
  return matches.map((card) => ({ cardId: card.id, mode }));
}

export function queue(
  store: FormulaStore,
  mode: QueueMode = "due",
  attempts: Attempt[] = [],
  now = new Date(),
  random = Math.random,
): QueueItem[] {
  const today = localDay(now);
  const due = cards
    .filter((c) => store.cards[c.id] && store.cards[c.id].due <= today)
    .sort((a, b) => store.cards[a.id].due.localeCompare(store.cards[b.id].due));
  let pool: FormulaCard[];
  if (mode === "spot") {
    pool = cards.filter(
      (c) =>
        c.kind === "recall" && level(c.formulaId, store, attempts, now) >= 3,
    );
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
  } else {
    const started = (id: string) =>
      cards.some(
        (c) =>
          c.formulaId === id && store.cards[c.id]?.lastResult !== undefined,
      );
    const todayLearned = new Set(
      store.reviews
        .filter((r) => r.mode === "learn" && localDay(new Date(r.at)) === today)
        .map((r) => cardById.get(r.cardId)?.formulaId),
    );
    const newFormulas =
      due.length > 40
        ? []
        : formulas
            .filter((f) => !started(f.id) && !todayLearned.has(f.id))
            .slice(
              0,
              Math.max(0, store.settings.newPerDay - todayLearned.size),
            );
    const unfinished = cards.filter(
      (c) =>
        !store.cards[c.id]?.lastResult &&
        (started(c.formulaId) ||
          todayLearned.has(c.formulaId) ||
          newFormulas.some((f) => f.id === c.formulaId)),
    );
    pool = [
      ...due,
      ...unfinished.filter((c) => !due.some((d) => d.id === c.id)),
    ];
    if (mode !== "due") pool = pool.filter((c) => c.kind === mode);
  }
  return pool
    .slice(0, 20)
    .map((c) => ({
      cardId: c.id,
      mode:
        mode === "spot"
          ? "spot"
          : cards.some(
                (x) =>
                  x.formulaId === c.formulaId && store.cards[x.id]?.lastResult,
              )
            ? "due"
            : "learn",
    }));
}
export function choices(formulaId: string): string[] {
  const f = formulaById.get(formulaId)!;
  const others = formulas
    .filter((x) => x.id !== formulaId)
    .sort(
      (a, b) =>
        Number(b.chapter === f.chapter) * 2 +
        Number(b.group === f.group) -
        (Number(a.chapter === f.chapter) * 2 + Number(a.group === f.group)),
    );
  const result = [formulaId, ...others.slice(0, 3).map((f) => f.id)];
  // Stable rotation avoids always putting the correct answer first, while remaining reproducible offline.
  const shift = [...formulaId].reduce((sum, c) => sum + c.charCodeAt(0), 0) % 4;
  return [...result.slice(shift), ...result.slice(0, shift)];
}

export function evidence(
  formulaId: string,
  store: FormulaStore,
  attempts: Attempt[] = [],
  now = new Date(),
) {
  const mine = cards.filter((c) => c.formulaId === formulaId),
    rev = store.reviews.filter(
      (r) => cardById.get(r.cardId)?.formulaId === formulaId,
    );
  const countDates = (kind: CardKind) =>
    new Set(
      rev
        .filter(
          (r) => r.result === "good" && cardById.get(r.cardId)?.kind === kind,
        )
        .map((r) => localDay(new Date(r.at))),
    ).size;
  const cloze = mine.filter((c) => c.kind === "cloze"),
    clozeGood = cloze.filter(
      (c) => store.cards[c.id]?.lastResult === "good",
    ).length;
  const recalled = countDates("recall"),
    recognized = countDates("recognize");
  const recall = mine.find((c) => c.kind === "recall")!,
    condition = mine.find((c) => c.kind === "condition");
  const recognizedLast = rev
    .filter((r) => cardById.get(r.cardId)?.kind === "recognize")
    .at(-1);
  const recentStuck = store.stuck.filter(
    (s) =>
      s.formulaId === formulaId &&
      localDay(new Date(s.at)) >= addDays(localDay(now), -13),
  );
  const related = problems.filter((p) => p.formulaIds?.includes(formulaId));
  const last = attempts
    .filter((a) => related.some((p) => p.id === a.problemId))
    .at(-1);
  return [
    {
      name: "L1 · 认识",
      met: mine.some((c) => store.cards[c.id]?.lastResult) || rev.length > 0,
      detail: "至少完成一次复习。",
    },
    {
      name: "L2 · 提示默写",
      met: clozeGood === cloze.length,
      detail: `填空最近记住 ${clozeGood}/${cloze.length} 张。`,
    },
    {
      name: "L3 · 完整默写",
      met: recalled >= 2 && store.cards[recall.id]?.lastResult !== "forgot",
      detail: `完整默写记住 ${recalled} 个不同日期，至少需要 2 个。${store.cards[recall.id]?.lastResult === "forgot" ? "最近一次忘记了，需要重新记住。" : ""}`,
    },
    {
      name: "L4 · 适用条件",
      met: !condition || store.cards[condition.id]?.lastResult === "good",
      detail: condition
        ? "条件卡最近一次必须答对。"
        : "没有条件卡，在满足 L3 后自动满足此项。",
    },
    {
      name: "L5 · 公式运用",
      met:
        recognized >= 2 &&
        recognizedLast?.result === "good" &&
        !recentStuck.length &&
        (!related.length || last?.correct === true),
      detail: `识别答对 ${recognized} 个不同日期，至少需要 2 个且最新一次答对。${mine.some((c) => c.kind === "recognize") ? "" : "目前没有对应识别题，暂不能取得 L5。"}近 14 天卡住 ${recentStuck.length} 次。${related.length ? (last?.correct ? "关联练习最近一次已答对。" : "还需正确完成关联练习。") : "无关联练习要求。"}`,
    },
  ];
}
