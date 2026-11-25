import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, List } from "lucide-react";
import { chapters, practiceDifficultyLabels, writtenProblemKinds, type PracticeDifficulty, type WrittenProblem } from "../../data/learning";
import { useLearning } from "../../db/learning";
import { Button, Tabs, EmptyState, ActionLink } from "../../components/ui";
import StudyHeading from "../../components/StudyHeading";
import ReviewPage from "../review/ReviewPage";
import Question from "./Question";
import FocusedPractice from "./FocusedPractice";
import { p8FocusContent } from "./p8FocusContent";
import { problemIndex, problemIndexById, searchProblemIndex, type ProblemSearchFilter } from "../../data/bank";
import { useBankProblem } from "../../data/bank/useBankProblem";
import BankProblemStatus from "../../components/BankProblemStatus";
import PracticeProblemPicker from "./PracticeProblemPicker";
export default function PracticePage() {
  const { pathname, search } = useLocation();
  const showMistakes = pathname === "/practice/mistakes";
  const query = new URLSearchParams(search);
  const requested = problemIndexById.get(query.get("problem") ?? "");
  const compact = !showMistakes && query.get("ui") !== "classic" && requested?.hasEli5;
  return compact ? <div className="page focus-layout"><PracticeQuestions key={search} compact /></div>
    : <PracticeOverview showMistakes={showMistakes} search={search} />;
}

function PracticeOverview({ showMistakes, search }: { showMistakes: boolean; search: string }) {
  const navigate = useNavigate();
  const { state } = useLearning();
  const latest = new Map(state.attempts.map(({ problemId, correct }) => [problemId, correct]));
  const wrong = problemIndex.filter(({ id }) => latest.get(id) === false).length;

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
  const [picker, setPicker] = useState<{ displayedId?: string }>();
  const [filters, setFilters] = useState<ProblemSearchFilter>(() => {
    const chapter = chapters.find(({ id }) => String(id) === query.get("chapter"))?.id;
    return {
      chapter,
      lessonId: query.get("lesson") || undefined,
      tag: query.get("tag") || undefined,
      query: query.get("q") || undefined,
      onlyEli5: query.get("eli5") === "1",
      onlyHints: query.get("hints") === "1",
    };
  });
  const [difficulty, setDifficulty] = useState<PracticeDifficulty | "">(() =>
    Object.keys(practiceDifficultyLabels).find((key) => key === query.get("difficulty")) as PracticeDifficulty ?? "",
  );
  const [kind, setKind] = useState<WrittenProblem["kind"] | "数值题" | "">(() =>
    (["数值题", ...writtenProblemKinds] as const).find((value) => value === query.get("kind")) ?? "",
  );
  const list = searchProblemIndex(filters).filter(
    (entry) => (!difficulty || entry.difficulty === difficulty) && (!kind || entry.kind === kind),
  );
  const [id, setId] = useState(query.get("problem"));
  const index = Math.max(0, list.findIndex((entry) => entry.id === id));
  const selected = list[index];
  const displayedId = picker ? picker.displayedId : selected?.id;
  const { problem: current, failed, retry } = useBankProblem(displayedId);
  const currentChapter = displayedId ? problemIndexById.get(displayedId)?.ch : undefined;
  const latest = new Map(state.attempts.map(({ problemId, correct }) => [problemId, correct]));
  function openProblem(nextId: string) {
    const nextQuery = new URLSearchParams(query);
    nextQuery.set("problem", nextId);
    for (const [name, value] of Object.entries({
      chapter: filters.chapter, tag: filters.tag, q: filters.query, difficulty, kind,
      eli5: filters.onlyEli5 ? "1" : "", hints: filters.onlyHints ? "1" : "",
    })) {
      if (value) nextQuery.set(name, String(value));
      else nextQuery.delete(name);
    }
    navigate({ pathname: "/practice", search: nextQuery.toString() });
  }

  const focusedLesson = query.get("ui") !== "classic" && current?.teaching;
  const next = list[index + 1];
  const focused = current && focusedLesson ? (
    <FocusedPractice key={current.id} problem={current} lesson={focusedLesson} embedded={!compact}
      content={current.id === "p8" ? p8FocusContent : {
        contextLabel: chapters.find(({ id }) => id === currentChapter)?.title ?? "练习",
      }}
      onNext={next ? () => openProblem(next.id) : undefined} />
  ) : null;
  if (compact && !current) {
    if (!selected) return <EmptyState title="没有匹配的题目" action={<ActionLink to="/practice">返回练习中心</ActionLink>} />;
    return <BankProblemStatus failed={failed} retry={retry} />;
  }
  if (compact && focused) return focused;
  return (
    <>
      <div className="practice-toolbar">
        <span>
          {selected ? `第 ${index + 1} / ${list.length} 题 · 第${selected.ch}章` : "0 道匹配题目"}
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
            onClick={() => setPicker({ displayedId })}
          >
            <List size={20} />
          </Button>
        </div>
      </div>
      {focused ?? (current ? <Question key={current.id} problem={current} teaching={current.teaching} /> : displayedId ? <BankProblemStatus failed={failed} retry={retry} /> : (
        <EmptyState title="没有匹配的题目" description="可以在题目列表中调整筛选条件。" />
      ))}
      <PracticeProblemPicker
        open={Boolean(picker)} onClose={() => setPicker(undefined)}
        filters={filters} onFilters={setFilters}
        difficulty={difficulty} onDifficulty={setDifficulty}
        kind={kind} onKind={setKind}
        results={list} selectedId={displayedId} latest={latest}
        onSelect={(entry) => {
          setPicker(undefined);
          if (query.get("ui") !== "classic" && entry.hasEli5) openProblem(entry.id);
          else setId(entry.id);
        }}
      />
    </>
  );
}
