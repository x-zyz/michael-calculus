import { test, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DataImport from "../components/DataImport";
import { parseBackup, importBackup, backupSummary } from "../db/backup";
const learning = JSON.stringify({
  completed: ["sine"],
  lastLesson: "sine",
  attempts: [
    {
      problemId: "p3",
      correct: true,
      answer: "3/5",
      at: "2026-11-15T12:00:00Z",
      hints: 1,
    },
  ],
});
const raw = {
  backupVersion: 1,
  applicationId: "com.michael.calculus",
  exportedAt: "2026-11-15T12:00:00Z",
  storage: {
    "mc-learning-v1": learning,
    "mc-theme": "dark",
    "mc-formula-v1": null,
  },
};
test("imports legacy records without inventing formula data or touching unrelated keys", () => {
  localStorage.setItem("other-app", "preserve");
  const b = parseBackup(JSON.stringify(raw));
  expect(backupSummary(b)).toEqual({ completed: 1, attempts: 1, reviews: 0 });
  importBackup(b);
  expect(localStorage.getItem("mc-learning-v1")).toBe(learning);
  expect(localStorage.getItem("mc-theme")).toBe("dark");
  expect(localStorage.getItem("other-app")).toBe("preserve");
  expect(localStorage.getItem("mc-formula-v1")).toBeNull();
});
test("rejects unknown app, keys, malformed JSON, invalid records and oversized files", () => {
  for (const data of [
    { ...raw, applicationId: "other.app" },
    { ...raw, storage: { ...raw.storage, unknown: "x" } },
    { ...raw, storage: { "mc-learning-v1": '{"completed":null}' } },
    { ...raw, storage: { "mc-theme": "invalid" } },
    { ...raw, storage: { "mc-formula-v1": "{}" } },
  ])
    expect(() => parseBackup(JSON.stringify(data))).toThrow();
  expect(() => parseBackup("{")).toThrow();
  expect(() => parseBackup(" ".repeat(2 * 1024 * 1024 + 1))).toThrow();
});
test("restores old values if a later storage write fails", () => {
  localStorage.setItem("mc-learning-v1", "original");
  localStorage.setItem("mc-theme", "light");
  const real = Storage.prototype.setItem;
  let writes = 0;
  const spy = vi
    .spyOn(Storage.prototype, "setItem")
    .mockImplementation(function (this: Storage, k, v) {
      writes++;
      if (writes === 2) throw Error("quota");
      return real.call(this, k, v);
    });
  expect(() => importBackup(parseBackup(JSON.stringify(raw)))).toThrow(
    "原记录已保留",
  );
  expect(localStorage.getItem("mc-learning-v1")).toBe("original");
  expect(localStorage.getItem("mc-theme")).toBe("light");
  spy.mockRestore();
});
test("previews the backup and requires explicit confirmation before replacing data", async () => {
  const done = vi.fn();
  render(<DataImport onImported={done} />);
  const file = new File([JSON.stringify(raw)], "backup.json", {
    type: "application/json",
  });
  Object.defineProperty(file, "text", {
    value: () => Promise.resolve(JSON.stringify(raw)),
  });
  fireEvent.change(screen.getByLabelText("选择 Michael calculus JSON 备份"), {
    target: { files: [file] },
  });
  await waitFor(() => expect(screen.getByText(/已读课程 1 节/)).toBeVisible());
  expect(
    screen.getByRole("button", { name: "确认导入并重新载入" }),
  ).toBeDisabled();
  expect(localStorage.getItem("mc-learning-v1")).toBeNull();
  fireEvent.click(screen.getByRole("checkbox"));
  fireEvent.click(screen.getByRole("button", { name: "确认导入并重新载入" }));
  expect(done).toHaveBeenCalledOnce();
  expect(localStorage.getItem("mc-learning-v1")).toBe(learning);
});
