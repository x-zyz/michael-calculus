import { Button, Card } from "./ui";
import { useState } from "react";
import {
  parseBackup,
  backupSummary,
  importBackup,
  type Backup,
} from "../db/backup";
export default function DataImport({
  onImported = () => window.location.reload(),
}: {
  onImported?: () => void;
}) {
  const [backup, setBackup] = useState<Backup | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");
  const [reading, setReading] = useState(false);
  const summary = backup ? backupSummary(backup) : null;
  return (
    <Card>
      <h2>导入旧版学习备份</h2>
      <p>
        仅用于一次换签名迁移或恢复备份。请先保留旧版；备份成功且确认新版本可用后，再处理旧安装。今后的正式版本使用固定签名，可正常覆盖更新。
      </p>
      <label htmlFor="learning-backup">选择 Michael calculus JSON 备份</label>
      <input
        id="learning-backup"
        type="file"
        accept=".json,application/json"
        disabled={reading}
        onChange={async (e) => {
          setBackup(null);
          setConfirmed(false);
          setError("");
          const file = e.target.files?.[0];
          if (!file) return;
          if (file.size > 2 * 1024 * 1024) {
            setError("备份超过 2 MB。");
            return;
          }
          setReading(true);
          try {
            setBackup(parseBackup(await file.text()));
          } catch (err) {
            setError(err instanceof Error ? err.message : "无法读取备份。");
          } finally {
            setReading(false);
          }
        }}
      />
      {summary && (
        <>
          <p>
            备份时间：{new Date(backup!.exportedAt).toLocaleString()}
            <br />
            已读课程 {summary.completed} 节 · 作答 {summary.attempts} 次 ·
            公式复习 {summary.reviews} 次
          </p>
          <label className="backup-confirm">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            我已保留原备份，并确认用它替换本机对应记录
          </label>
          <Button
            variant="primary"
            disabled={!confirmed || reading}
            onClick={() => {
              try {
                importBackup(backup!);
                setError("");
                onImported();
              } catch (e) {
                setError(e instanceof Error ? e.message : "导入失败。");
              }
            }}
          >
            确认导入并重新载入
          </Button>
        </>
      )}
      {error && <p role="alert">{error}</p>}
      <p className="learning-note">
        导入只发生在本机，不上传文件。不会根据答错推断迁移，也不会自动卸载任何应用。
      </p>
    </Card>
  );
}
