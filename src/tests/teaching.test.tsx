import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, it } from "vitest";
import App from "../app/App";
import { teachingEvidence } from "../data/teaching";
import { learningKey } from "../db/learning";
import { parseBackup } from "../db/backup";

function open() {
  render(<MemoryRouter initialEntries={["/practice?problem=p8"]}><App /></MemoryRouter>);
}

function click(name: string) {
  fireEvent.click(screen.getByRole("button", { name }));
}

function submit(value: string) {
  fireEvent.change(screen.getByLabelText("请输入指数 k 的数值或分数"), { target: { value } });
  click("检查答案");
}

it("checks understanding, offers remediation, records a skip, and folds older steps", () => {
  open();
  click("ELI5 教学");
  const lesson = screen.getByRole("region", { name: "ELI5 教学步骤" });
  click("x");
  expect(within(lesson).getByText(/x 确实趋近零/)).toBeVisible();
  expect(within(lesson).queryByRole("button", { name: "下一步" })).toBeNull();
  click("1−3x");
  expect(within(lesson).getByText(/先试个小数/)).toBeVisible();
  click("−3x");
  expect(within(lesson).getByText(/找对了/)).toBeVisible();
  click("下一步");
  click("查看详细原理");
  expect(within(lesson).getByText(/分母从 x 变成/)).toBeVisible();
  click("跳过检查");
  expect(within(lesson).getByText("第 3 步，共 4 步")).toBeVisible();
  expect(within(lesson).queryByText(/先把指数中的一部分|分母从 x 变成/)).toBeNull();
  click("查看历史步骤");
  const history = within(lesson).getByRole("list", { name: "历史步骤" });
  fireEvent.click(within(history).getByRole("button", { name: /第 1 步/ }));
  expect(within(history).getByText(/我们想认出一个熟悉的极限/)).toBeVisible();
  click("收起历史步骤");
  expect(within(lesson).queryByRole("list", { name: "历史步骤" })).toBeNull();
  submit("-6");
  expect(screen.getByText(/练习记录 · 提示辅助完成/)).toBeVisible();
  const payload = localStorage.getItem(learningKey)!;
  expect(JSON.parse(payload).attempts.at(-1)).toMatchObject({
    correct: true, hints: 3,
    teaching: { stepsSeen: 3, checksPassed: 1, checksSkipped: 1, wrongChecks: 2 },
  });
  expect(parseBackup(JSON.stringify({
    backupVersion: 1, applicationId: "com.michael.calculus", exportedAt: new Date().toISOString(),
    storage: { [learningKey]: payload },
  })).storage[learningKey]).toBe(payload);
});

it("classifies independent and delayed evidence separately from assisted correctness", () => {
  open();
  submit("-6");
  expect(screen.getByText(/练习记录 · 独立完成/)).toBeVisible();
  const independent = { problemId: "p8", correct: true, hints: 0, at: "2025-01-01T10:00:00Z" };
  expect(teachingEvidence([independent, { ...independent, at: "2025-01-02T10:00:00Z" }], "p8"))
    .toBe("延迟复习成功");
  expect(teachingEvidence([independent, { ...independent, hints: 2 }], "p8")).toBe("提示辅助完成");
});

it("suggests a possible sign error and checks it with a simpler fraction", () => {
  open();
  submit("6");
  const diagnostic = screen.getByRole("region", { name: "错因小检查" });
  expect(within(diagnostic).getByText(/有可能.*负号/)).toBeVisible();
  click("-6");
  expect(within(diagnostic).getByText(/上下都乘 −3/)).toBeVisible();
});
