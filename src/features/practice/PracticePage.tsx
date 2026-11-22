import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, List } from "lucide-react";
import { chapters, lessons, problems, errorTags, practiceDifficultyLabels, writtenProblemKinds, type PracticeDifficulty, type WrittenProblem } from "../../data/learning";
import { useLearning } from "../../db/learning";
import { Button, Sheet, ChipRow, Chip, Tabs, EmptyState } from "../../components/ui";
import StudyHeading from "../../components/StudyHeading";
import ReviewPage from "../review/ReviewPage";
import Question from "./Question";
import FocusedPractice from "./FocusedPractice";
import { p8FocusContent } from "./p8FocusContent";
import { focusedPracticeLesson } from "./focusedPracticeRollout";
export default function PracticePage() {
  const { pathname, search } = useLocation();
  const showMistakes = pathname === "/practice/mistakes";
  const query = new URLSearchParams(search);
  const requested = problems.find((problem) => problem.id === query.get("problem"));
  const compact = !showMistakes && query.get("ui") !== "classic" && requested && focusedPracticeLesson(requested);
  return compact ? <div className="page focus-layout"><PracticeQuestions key={search} compact /></div>
    : <PracticeOverview showMistakes={showMistakes} search={search} />;
}

function PracticeOverview({ showMistakes, search }: { showMistakes: boolean; search: string }) {
  const navigate = useNavigate();
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

function PracticeQuestions({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const { state } = useLearning();
  const [query] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [chapter, setChapter] = useState(Number(query.get("chapter")) || 0);
  const [tag, setTag] = useState(query.get("tag") || "");
  const [difficulty, setDifficulty] = useState<PracticeDifficulty | "">(() =>
    (Object.keys(practiceDifficultyLabels).find((key) => key === query.get("difficulty")) as PracticeDifficulty | undefined) ?? "");
  const [kind, setKind] = useState<WrittenProblem["kind"] | "数值题" | "">(() =>
    (["数值题", ...writtenProblemKinds] as const).find((value) => value === query.get("kind")) ?? "");
  const lesson = query.get("lesson");
  const list = problems.filter(
    (p) =>
      (!lesson || p.lessonId === lesson) &&
      (!chapter ||
        lessons.find((l) => l.id === p.lessonId)?.chapter === chapter) &&
      (!tag || p.errorTag === tag) &&
      (!kind || ("kind" in p ? p.kind : "数值题") === kind) &&
      (!difficulty || (p.difficulty ?? "basic") === difficulty),
  );
  const [id, setId] = useState(query.get("problem"));
  const index = Math.max(
    0,
    list.findIndex((p) => p.id === id),
  );
  const current = list[index];
  const currentChapter = lessons.find((l) => l.id === current?.lessonId)?.chapter;
  const latest = new Map(state.attempts.map((a) => [a.problemId, a.correct]));
  function openProblem(nextId: string) {
    const nextQuery = new URLSearchParams(query);
    nextQuery.set("problem", nextId);
    for (const [name, value] of Object.entries({ chapter, tag, difficulty, kind })) {
      if (value) nextQuery.set(name, String(value));
      else nextQuery.delete(name);
    }
    navigate({ pathname: "/practice", search: nextQuery.toString() });
  }

  const focusedLesson = query.get("ui") !== "classic" && current && focusedPracticeLesson(current);
  const next = list[index + 1];
  const focused = current && focusedLesson ? (
    <FocusedPractice key={current.id} problem={current} lesson={focusedLesson}
      content={current.id === "p8" ? p8FocusContent : { contextLabel: "第一章 · 函数、极限与连续" }}
      onNext={next ? () => openProblem(next.id) : undefined} />
  ) : null;
  if (compact && focused) return focused;
  return (
    <>
      <div className="practice-toolbar">
        <span>
          {current ? `第 ${index + 1} / ${list.length} 题 · 第${currentChapter}章` : "0 道匹配题目"}
        </span>
        <div className="practice-nav">
          {!focused && <>
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
            disabled={index >= list.length - 1}
            onClick={() => setId(list[index + 1].id)}
          >
            <ChevronRight size={24} />
          </Button>
          </>}
          <Button
            className="icon-button"
            aria-label="题目列表"
            onClick={() => setOpen(true)}
          >
            <List size={20} />
          </Button>
        </div>
      </div>
      {focused ?? (current ? <Question key={current.id} problem={current} /> : (
        <EmptyState title="没有匹配的题目" description="可以在题目列表中调整筛选条件。" />
      ))}
      <Sheet title="题目列表" open={open} onClose={() => setOpen(false)}>
        <section data-testid="chapter-mastery">
          <ChipRow label="按难度筛选">
            <Chip selected={!difficulty} onClick={() => setDifficulty("")}>全部难度</Chip>
            {(Object.keys(practiceDifficultyLabels) as PracticeDifficulty[]).map((level) => (
              <Chip key={level} selected={difficulty === level} onClick={() => setDifficulty(level)}>
                {practiceDifficultyLabels[level]}
              </Chip>
            ))}
          </ChipRow>
          <ChipRow label="按题型筛选">
            <Chip selected={!kind} onClick={() => setKind("")}>全部题型</Chip>
            {(["数值题", ...writtenProblemKinds] as const).map((value) => (
              <Chip key={value} selected={kind === value} onClick={() => setKind(value)}>{value}</Chip>
            ))}
          </ChipRow>
          <ChipRow label="按章节筛选">
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
          <ChipRow label="按错因标签筛选">
            <Chip selected={!tag} onClick={() => setTag("")}>
              全部错因考点
            </Chip>
            {errorTags.map((t) => (
              <Chip
                key={t.tag}
                selected={tag === t.tag}
                onClick={() => setTag(t.tag)}
              >
                {t.label}
              </Chip>
            ))}
          </ChipRow>
        </section>
        {chapters
          .filter((c) => list.some((p) => lessons.find((l) => l.id === p.lessonId)?.chapter === c.id))
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
                      aria-pressed={current?.id === p.id}
                      className={
                        latest.get(p.id) === true
                          ? "status-done"
                          : latest.get(p.id) === false
                            ? "status-wrong"
                            : ""
                      }
                      onClick={() => {
                        setOpen(false);
                        if (query.get("ui") !== "classic" && focusedPracticeLesson(p)) openProblem(p.id);
                        else setId(p.id);
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
                      <small>{practiceDifficultyLabels[p.difficulty ?? "basic"]} · {p.title}</small>
                    </Button>
                  ))}
              </div>
            </section>
          ))}
      </Sheet>
    </>
  );
}
