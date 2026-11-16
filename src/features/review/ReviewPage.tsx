import { useState } from "react";

import {
  problems,
  chapters,
  lessons,
  computeMastery,
} from "../../data/learning";
import { useLearning } from "../../db/learning";
import {
  PageHeader,
  ChipRow,
  Chip,
  Select,
  Card,
  Accordion,
  EmptyState,
  ListItem,
  ActionLink,
} from "../../components/ui";
import MasterySummary from "../../components/MasterySummary";
import { ReviewNavigation } from "../formulas/FormulaActions";
export default function ReviewPage() {
  const { state } = useLearning();
  const [chapter, setChapter] = useState(0);
  const [tag, setTag] = useState("");
  const mastery = computeMastery(state.attempts);
  const wrong = problems.filter(
    (p) =>
      state.attempts.filter((a) => a.problemId === p.id).at(-1)?.correct ===
      false,
  );
  const filtered = wrong.filter(
    (p) =>
      (!chapter ||
        lessons.find((l) => l.id === p.lessonId)?.chapter === chapter) &&
      (!tag || p.errorTag === tag),
  );
  return (
    <div className="page read-page">
      <PageHeader
        title="错题与复习"
        subtitle={`累计作答 ${state.attempts.length} 次 · 答对 ${state.attempts.filter((a) => a.correct).length} 次 · 待复习 ${wrong.length} 题`}
      />
      <ReviewNavigation />
      <MasterySummary onTag={setTag} />
      <ChipRow label="错题章节筛选">
        <Chip selected={chapter === 0} onClick={() => setChapter(0)}>
          全部章节
        </Chip>
        {chapters.map((c) => (
          <Chip
            key={c.id}
            selected={chapter === c.id}
            onClick={() => setChapter(c.id)}
          >
            {c.short}
          </Chip>
        ))}
      </ChipRow>
      <Select
        aria-label="筛选错因分类"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      >
        <option value="">全部错因分类</option>
        {mastery.tags.map((t) => (
          <option key={t.tag} value={t.tag}>
            {t.label}（已掌握 {t.mastered}/{t.total} · 待复习 {t.pending}）
          </option>
        ))}
      </Select>
      {filtered.length ? (
        <Card>
          <h2>待复习错题</h2>
          {[...new Set(filtered.map((p) => p.errorTag))].map((key) => (
            <section key={key}>
              <h3>{filtered.find((p) => p.errorTag === key)!.errorLabel}</h3>
              {filtered
                .filter((p) => p.errorTag === key)
                .map((p) => (
                  <ListItem
                    key={p.id}
                    title={p.title}
                    description="回看依据，再独立做一次"
                    status="wrong"
                    to={`/practice?problem=${p.id}`}
                    action={
                      <ActionLink to={`/practice?problem=${p.id}`}>
                        重新练习
                      </ActionLink>
                    }
                  />
                ))}
            </section>
          ))}
        </Card>
      ) : (
        <Card>
          <EmptyState
            title="目前没有待复习错题"
            description="完成练习后，这里会按错因整理你需要回看的题目。"
            action={
              <ActionLink variant="primary" to="/practice">
                去做几道题 →
              </ActionLink>
            }
          />
        </Card>
      )}
      <Accordion title="最近 20 次作答">
        {state.attempts.length === 0 ? (
          <p>完成第一道练习后，这里会显示你的记录。</p>
        ) : (
          state.attempts
            .slice(-20)
            .reverse()
            .map((a, i) => (
              <ListItem
                key={a.at + i}
                title={`${problems.find((p) => p.id === a.problemId)?.title} · ${a.correct ? "答对" : "待改进"}`}
                description={`你的答案：${a.answer} · 使用提示 ${a.hints} 次 · ${new Date(a.at).toLocaleString("zh-CN")}`}
                status={a.correct ? "done" : "wrong"}
                to={`/practice?problem=${a.problemId}`}
              />
            ))
        )}
      </Accordion>
    </div>
  );
}
