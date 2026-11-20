import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../app/App";
import { computeMembership } from "../db/membership";

describe("0979 membership badge and progression", () => {
  it("computes deterministic tiers from real study progress", () => {
    expect(computeMembership({ lessons: 0, mastered: 0, reviews: 0 })).toMatchObject({
      level: 1,
      code: "Lv.1",
      title: "初光见习",
      points: 0,
    });
    expect(computeMembership({ lessons: 2, mastered: 0, reviews: 0 })).toMatchObject({
      level: 2,
      code: "Lv.2",
      title: "睡莲探索",
      points: 6,
    });
    expect(computeMembership({ lessons: 10, mastered: 25, reviews: 40 })).toMatchObject({
      level: 5,
      code: "Lv.5",
      title: "印象典藏",
      nextPoints: null,
      progress: 100,
    });
  });

  it("replaces the top-right settings icon with the 0979 membership badge linking to settings", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );
    const badge = screen.getByRole("link", { name: /0979 会员等级 Lv\.1/ });
    expect(badge).toBeVisible();
    expect(badge).toHaveTextContent("0979");
    expect(badge).toHaveTextContent("Lv.1");
    fireEvent.click(badge);
    expect(screen.getByRole("heading", { level: 1, name: "关于与数据备份" })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /Lv\.1 · 初光见习/ })).toBeVisible();
  });
});
