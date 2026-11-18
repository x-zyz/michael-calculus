import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, List } from "lucide-react";
import { chapters, lessons, problems, errorTags } from "../../data/learning";
import { useLearning } from "../../db/learning";
import { Button, Sheet, ChipRow, Chip, Tabs } from "../../components/ui";
import StudyHeading from "../../components/StudyHeading";
import ReviewPage from "../review/ReviewPage";
import Question from "./Question";
export default function PracticePage() {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const showMistakes = pathname === "/practice/mistakes";
  const { state } = useLearning();
  const latest = new Map(state.attempts.map(({ problemId, correct }) => [problemId, correct]));
  const wrong = problems.filter(({ id }) => latest.get(id) === false).length;

  return (
    <div className="page focus-layout practice-study">
      <StudyHeading title="练习中心" chapter={5} />
      <Tabs
        label="练习分类"
        value={showMistakes ? "mistakes" : "questions"}
        items={[
          { value: "questions", label: "做题" },
          { value: "mistakes", label: wrong ? `错题 (${wrong})` : "错题" },
        ]}
        onChange={(value) => navigate(value === "mistakes" ? "/practice/mistakes" : "/practice")}
      />
      {showMistakes ? <ReviewPage /> : <PracticeQuestions key={search} />}
    </div>
  );
}

function PracticeQuestions() {
  const { state } = useLearning();
  const [query] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [chapter, setChapter] = useState(Number(query.get("chapter")) || 0);
  const [tag, setTag] = useState(query.get("tag") || "");
  const filtered = problems.filter(
    (p) =>
      (!query.get("lesson") || p.lessonId === query.get("lesson")) &&
      (!chapter ||
        lessons.find((l) => l.id === p.lessonId)?.chapter === chapter) &&
      (!tag || p.errorTag === tag),
  );
  const list = filtered.length ? filtered : problems;
  const [id, setId] = useState(query.get("problem") || list[0].id);
  const index = Math.max(
    0,
    list.findIndex((p) => p.id === id),
  );
  const current = list[index];
  const currentChapter = lessons.find(
    (l) => l.id === current.lessonId,
  )!.chapter;
  const latest = new Map(state.attempts.map((a) => [a.problemId, a.correct]));
  function changeFilter(c: number, t: string) {
    setChapter(c);
    setTag(t);
    const first = problems.find(
      (p) =>
        (!c || lessons.find((l) => l.id === p.lessonId)?.chapter === c) &&
        (!t || p.errorTag === t),
    );
    if (first) setId(first.id);
  }
  return (
    <>
      <div className="practice-toolbar">
        <span>
          第 {index + 1} / {list.length} 题 · 第{currentChapter}章
        </span>
        <div className="practice-nav">
          <Button
            className="icon-button"
            variant="ghost"
            aria-label="上一题"
            disabled={index === 0}
            onClick={() => setId(list[index - 1].id)}
          >
            <ChevronLeft size={24} />
          </Button>
          <Button
            className="icon-button"
            variant="ghost"
            aria-label="下一题"
            disabled={index === list.length - 1}
            onClick={() => setId(list[index + 1].id)}
          >
            <ChevronRight size={24} />
          </Button>
          <Button
            className="icon-button"
            aria-label="题目列表"
            onClick={() => setOpen(true)}
          >
            <List size={20} />
          </Button>
        </div>
      </div>
      <Question key={current.id} problem={current} />
      <Sheet title="题目列表" open={open} onClose={() => setOpen(false)}>
        <section data-testid="chapter-mastery">
          <ChipRow label="按章节筛选">
            <Chip selected={chapter === 0} onClick={() => changeFilter(0, tag)}>
              全部章节
            </Chip>
            {chapters.map((c) => (
              <Chip
                key={c.id}
                selected={chapter === c.id}
                onClick={() => changeFilter(c.id, tag)}
              >
                {c.short}
              </Chip>
            ))}
          </ChipRow>
          <ChipRow label="按错因标签筛选">
            <Chip selected={!tag} onClick={() => changeFilter(chapter, "")}>
              全部错因考点
            </Chip>
            {errorTags.map((t) => (
              <Chip
                key={t.tag}
                selected={tag === t.tag}
                onClick={() => changeFilter(chapter, t.tag)}
              >
                {t.label}
              </Chip>
            ))}
          </ChipRow>
        </section>
        {chapters
          .filter((c) => !chapter || c.id === chapter)
          .map((c) => (
            <section key={c.id}>
              <h3>{c.title}</h3>
              <div className="question-grid">
                {list
                  .filter(
                    (p) =>
                      lessons.find((l) => l.id === p.lessonId)?.chapter ===
                      c.id,
                  )
                  .map((p) => (
                    <Button
                      key={p.id}
                      aria-pressed={current.id === p.id}
                      className={
                        latest.get(p.id) === true
                          ? "status-done"
                          : latest.get(p.id) === false
                            ? "status-wrong"
                            : ""
                      }
                      onClick={() => {
                        setId(p.id);
                        setOpen(false);
                      }}
                    >
                      <strong>
                        {latest.get(p.id) === true
                          ? "✓"
                          : latest.get(p.id) === false
                            ? "✕"
                            : "○"}{" "}
                        第 {problems.indexOf(p) + 1} 题
                      </strong>
                      <small>{p.title}</small>
                    </Button>
                  ))}
              </div>
            </section>
          ))}
      </Sheet>
    </>
  );
}
