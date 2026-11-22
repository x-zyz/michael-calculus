
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, expect, it } from "vitest";
import App from "../app/App";
import { teachingByProblem } from "../data/teaching";
import { learningKey } from "../db/learning";

const id = "jc935-1-5-1-1";

afterEach(() => {
  delete teachingByProblem[id];
});

function openWrittenLesson() {
  teachingByProblem[id] = {
    solution: "1+1=2",
    steps: [{
      id: "fixture",
      goal: "选出合适的计算方法",
      plain: "先看分母会不会变成零。",
      formula: "1+1=2",
      detail: "这里的公式只用于测试揭示行为。",
      check: {
        prompt: "先检查哪个位置？",
        choices: ["分子", "分母"],
        correct: 1,
        feedback: ["先看除法是否有定义。", "可以继续。"],
        prerequisite: "想想能不能除以零。",
      },
      transfer: {
        prompt: "在下面的新算式中求值。",
        promptFormula: "2+2",
        answer: 4,
        signFeedback: "检查结果的正负。",
        remediation: "先把两组物品放在一起，再数一遍。",
        solution: "2+2=4",
      },
    }],
  };
  render(<MemoryRouter initialEntries={["/practice?ui=classic&problem=" + id]}><App /></MemoryRouter>);
}

function click(name: string) {
  fireEvent.click(screen.getByRole("button", { name }));
}

it("keeps written teaching gated and records assisted self-assessment across mode switches", () => {
  openWrittenLesson();
  click("ELI5 教学");
  const lesson = screen.getByRole("region", { name: "ELI5 教学步骤" });
  expect(lesson.querySelector(".formula")).toBeNull();
  fireEvent.click(within(lesson).getByRole("button", { name: "分母" }));
  expect(within(lesson).getByLabelText("迁移题题面")).toBeVisible();
  expect(within(lesson).queryByLabelText("迁移题解式")).toBeNull();
  expect(within(lesson).queryByLabelText("本步完整算式")).toBeNull();
  const transfer = within(lesson).getByRole("form", { name: "迁移小题" });
  fireEvent.change(within(transfer).getByRole("textbox"), { target: { value: "4" } });
  fireEvent.click(within(transfer).getByRole("button", { name: "检查迁移题" }));
  expect(within(lesson).getByLabelText("迁移题解式")).toBeVisible();
  click("收起 ELI5 教学");
  click("ELI5 教学");
  expect(lesson.querySelector(".formula")).toBeVisible();
  click("查看分步解析");
  expect(screen.queryByRole("button", { name: "我独立完成了" })).toBeNull();
  click("核对后确认完成");
  expect(screen.getByText(/练习记录 · 提示辅助完成/)).toBeVisible();
  const attempt = JSON.parse(localStorage.getItem(learningKey)!).attempts.at(-1);
  expect(attempt).toMatchObject({ problemId: id, hints: 1, teaching: { checksPassed: 1 } });
  click("再做一次");
  expect(screen.getByRole("button", { name: "我独立完成了" })).toBeVisible();
});

it("keeps independent written self-assessment separate from viewed solutions", () => {
  openWrittenLesson();
  click("我独立完成了");
  expect(screen.getByText(/练习记录 · 独立完成/)).toBeVisible();
  click("查看分步解析");
  expect(screen.getByRole("heading", { name: "参考解析" })).toBeVisible();
  const attempt = JSON.parse(localStorage.getItem(learningKey)!).attempts.at(-1);
  expect(attempt).toMatchObject({ problemId: id, hints: 0 });
  expect(attempt.teaching).toBeUndefined();
});
