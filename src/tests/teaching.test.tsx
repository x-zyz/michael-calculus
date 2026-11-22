import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, it } from "vitest";
import App from "../app/App";
import { teachingEvidence } from "../data/teaching";
import { learningKey } from "../db/learning";
import { parseBackup } from "../db/backup";

function open() {
  return render(<MemoryRouter initialEntries={["/practice?ui=classic&problem=p8"]}><App /></MemoryRouter>);
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
  expect(lesson.querySelector(".formula")).toBeNull();
  expect(within(lesson).queryByRole("button", { name: "查看详细原理" })).toBeNull();
  click("x");
  expect(within(lesson).getByText(/x 确实趋近零/)).toBeVisible();
  expect(lesson.querySelector(".formula")).toBeNull();
  expect(within(lesson).queryByRole("button", { name: "下一步" })).toBeNull();
  click("1−3x");
  expect(within(lesson).getByText(/先试个小数/)).toBeVisible();
  click("−3x");
  expect(within(lesson).getByText(/找对了/)).toBeVisible();
  expect(lesson.querySelector(".formula")).toBeInTheDocument();
  click("下一步");
  expect(within(lesson).getByRole("button", { name: "−6" })).toBeVisible();
  expect(within(lesson).queryByRole("button", { name: "查看详细原理" })).toBeNull();
  expect(lesson.querySelector(".formula")).toBeNull();
  click("跳过检查");
  click("跳过迁移题");
  click("查看详细原理");
  expect(within(lesson).getByText(/分母从 x 变成/)).toBeVisible();
  click("下一步");
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

function openTransfer() {
  open();
  click("ELI5 教学");
  click("−3x");
  click("下一步");
  click("−6");
  return screen.getByRole("form", { name: "迁移小题" });
}

function answerTransfer(form: HTMLElement, value: string) {
  fireEvent.change(within(form).getByRole("textbox"), { target: { value } });
  fireEvent.click(within(form).getByRole("button", { name: "检查迁移题" }));
}

it("grades a new coefficient without exposing either complete formula", () => {
  const form = openTransfer();
  const lesson = screen.getByRole("region", { name: "ELI5 教学步骤" });
  expect(lesson.querySelector(".formula")).toBeNull();
  expect(form).not.toHaveTextContent(/−8|-8/);
  answerTransfer(form, "-8");
  expect(within(form).getByText(/答对了/)).toBeVisible();
  expect(lesson.querySelector(".formula")).toBeInTheDocument();
  submit("-6");
  expect(screen.getByText(/提示辅助完成/)).toBeVisible();
  expect(JSON.parse(localStorage.getItem(learningKey)!).attempts.at(-1).teaching.transfer)
    .toEqual({ firstResult: "correct", resolved: true });
});

it("gives sign and remediation feedback without counting a corrected retry as a first pass", () => {
  const form = openTransfer();
  answerTransfer(form, "8");
  expect(within(form).getByText(/分子也要跟着换号/)).toBeVisible();
  answerTransfer(form, "-2");
  expect(within(form).getByText(/先试更小的例子/)).toBeVisible();
  expect(form).not.toHaveTextContent(/−8|-8/);
  expect(screen.getByRole("region", { name: "ELI5 教学步骤" }).querySelector(".formula")).toBeNull();
  answerTransfer(form, "-8");
  submit("-6");
  expect(JSON.parse(localStorage.getItem(learningKey)!).attempts.at(-1).teaching.transfer)
    .toEqual({ firstResult: "incorrect", resolved: true });
});

it("persists a chosen default without auto-starting ELI5 or changing the current session", () => {
  const view = open();
  click("ELI5 教学");
  click("设为默认解析模式");
  click("x");
  click("标准解析");
  expect(screen.queryByRole("region", { name: "ELI5 教学步骤" })).toBeNull();
  click("ELI5 教学");
  expect(screen.getByText(/x 确实趋近零/)).toBeVisible();
  view.unmount();
  open();
  expect(screen.getByRole("button", { name: "ELI5 教学" })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByRole("button", { name: "开始 ELI5 教学" })).toBeVisible();
  submit("-6");
  expect(screen.getByText(/独立完成/)).toBeVisible();
});
