
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import Formula from "../../components/Formula";
import { Button, Card } from "../../components/ui";
import { checkAnswer, parseAnswer, practiceDifficultyLabels, type NumericProblem } from "../../data/learning";
import { initialTeachingProgress, p8Diagnostic, teachingEvidence, type TeachingLesson, type TeachingProgress } from "../../data/teaching";
import { useLearning } from "../../db/learning";
import TeachingSession from "./TeachingSession";

type View = "question" | "guide" | "solution" | "result";

export default function FocusedPractice({ problem, lesson, onNext }: {
  problem: NumericProblem;
  lesson: TeachingLesson;
  onNext?: () => void;
}) {
  const { state, save } = useLearning();
  const [view, setView] = useState<View>("question");
  const [answer, setAnswer] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [correct, setCorrect] = useState<boolean>();
  const [assisted, setAssisted] = useState(false);
  const [progress, setProgress] = useState<TeachingProgress>();
  const [originalOpen, setOriginalOpen] = useState(false);
  const [diagnosticOpen, setDiagnosticOpen] = useState(false);
  const [diagnosticAnswer, setDiagnosticAnswer] = useState<number>();
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    heading.current?.scrollIntoView?.({ block: "start" });
  }, [view]);

  function openGuide() {
    setAssisted(true);
    setProgress(progress ?? initialTeachingProgress);
    setOriginalOpen(false);
    setView("guide");
  }

  function openSolution() {
    setAssisted(true);
    setView("solution");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = checkAnswer(answer, problem.answer);
    if (result === null) {
      setInvalid(true);
      return;
    }
    setCorrect(result);
    save({
      ...state,
      attempts: [...state.attempts, {
        problemId: problem.id,
        correct: result,
        answer,
        at: new Date().toISOString(),
        hints: Math.max(Number(assisted), progress?.stepsSeen ?? 0),
        ...(progress ? { teaching: progress } : {}),
      }].slice(-500),
    });
    setView("result");
  }

  function retry() {
    setCorrect(undefined);
    setAnswer("");
    setInvalid(false);
    setDiagnosticOpen(false);
    setDiagnosticAnswer(undefined);
    setView("question");
  }

  const title = {
    question: problem.title,
    guide: "一步一步教我",
    solution: "完整解法",
    result: correct ? teachingEvidence(state.attempts, problem.id) : "需要复习",
  }[view];

  return (
    <div className="practice-focus">
      <header className="practice-focus-nav">
        {view === "question"
          ? <Link to="/practice"><ArrowLeft size={18} aria-hidden="true" /> 练习中心</Link>
          : <Button variant="ghost" onClick={() => setView(view === "result" || correct === undefined ? "question" : "result")}>
            <ArrowLeft size={18} aria-hidden="true" /> {view !== "result" && correct !== undefined ? "返回结果" : "返回题目"}
          </Button>}
        {view === "guide"
          ? <Button variant="ghost" aria-expanded={originalOpen} aria-controls="focused-original"
              onClick={() => setOriginalOpen(!originalOpen)}>{originalOpen ? "收起原题" : "查看原题"}</Button>
          : <span>第一章 · 重要极限</span>}
      </header>
      <Card className="practice-focus-paper">
        <header className="practice-focus-header">
          {view === "question" && <small>{practiceDifficultyLabels[problem.difficulty ?? "basic"]}</small>}
          <h1 tabIndex={-1} ref={heading}>{title}</h1>
        </header>
        {view === "question" && (
          <>
            <Formula value={problem.formula} />
            {correct === undefined ? (
              <form className="practice-focus-answer" onSubmit={submit}>
                <label htmlFor="focus-answer">{problem.unit || "请输入数值或分数"}</label>
                <input id="focus-answer" value={answer} autoComplete="off" maxLength={64}
                  aria-invalid={invalid || undefined} aria-describedby={invalid ? "focus-answer-error" : undefined}
                  placeholder="例如 0.25 或 1/4"
                  onChange={(event) => { setAnswer(event.target.value); setInvalid(false); }} />
                {invalid && <p role="alert" id="focus-answer-error">请输入有效的数值或分数。分母不能为 0。</p>}
                <Button variant="primary" type="submit">检查答案</Button>
              </form>
            ) : <Button variant="primary" onClick={() => setView("result")}>查看作答结果</Button>}
            <div className="practice-focus-help">
              <Button variant="ghost" onClick={openGuide}>
                <Compass size={18} aria-hidden="true" /> {progress ? "继续引导教学" : "一步一步教我"}
              </Button>
              <Button variant="ghost" onClick={openSolution}>
                <BookOpen size={18} aria-hidden="true" /> 查看完整解法
              </Button>
            </div>
          </>
        )}
        {progress && (
          <div hidden={view !== "guide"}>
            <div id="focused-original" hidden={!originalOpen}><Formula value={problem.formula} /></div>
            <TeachingSession lesson={lesson} active={view === "guide"} locked={false} onProgress={setProgress}
              focused onFinish={() => { if (correct === false) retry(); else setView("question"); }} />
          </div>
        )}
        {view === "solution" && (
          <section aria-label="完整解析" className="practice-focus-solution">
            <p>先在指数里配出底数中那一小项的倒数，再用第二个重要极限求括号里的值。</p>
            <Formula value={lesson.solution} />
            <div className="practice-focus-actions">
              <Button variant="primary" onClick={() => setView(correct === undefined ? "question" : "result")}>
                {correct === undefined ? "回去作答" : "回到作答结果"}
              </Button>
              <Button variant="ghost" onClick={retry}>重新练习</Button>
            </div>
          </section>
        )}
        {view === "result" && (
          <div className="practice-focus-result">
            <p role="status">{correct ? "回答正确。" : "这次答案还不对，题目已加入错题。"}</p>
            {!correct && (
              <section aria-label="错因小检查">
                <Button variant="ghost" aria-expanded={diagnosticOpen} onClick={() => {
                  if (!diagnosticOpen) setAssisted(true);
                  setDiagnosticOpen(!diagnosticOpen);
                }}>{diagnosticOpen ? "收起错因检查" : "看看我可能卡在哪"}</Button>
                {diagnosticOpen && <>
                  <p>{p8Diagnostic(parseAnswer(answer) ?? 0)}</p>
                  <p>把 2/5 的分母改成 −15，分子是哪一个？</p>
                  <div className="practice-focus-actions">
                    {[-6, 6, -3].map((choice) => (
                      <Button key={choice} aria-pressed={diagnosticAnswer === choice}
                        onClick={() => setDiagnosticAnswer(choice)}>{choice}</Button>
                    ))}
                  </div>
                  {diagnosticAnswer !== undefined && <p role="status">{diagnosticAnswer === -6
                    ? "对。分子分母都乘 −3。"
                    : "先看 5 要乘哪个数才会变成 −15，再让分子乘同一个数。"}</p>}
                </>}
              </section>
            )}
            <div className="practice-focus-actions">
              {correct && onNext && <Button variant="primary" onClick={onNext}>下一题 <ArrowRight size={18} aria-hidden="true" /></Button>}
              {!correct && <Button variant="primary" onClick={openGuide}>一步一步教我</Button>}
              <Button variant={correct && !onNext ? "primary" : "ghost"} onClick={retry}>重新练习</Button>
              {!correct && onNext && <Button variant="ghost" onClick={onNext}>下一题</Button>}
            </div>
            <div className="practice-focus-help">
              <Button variant="ghost" onClick={openSolution}>查看完整解法</Button>
              {!correct && <Link to="/practice/mistakes">查看错题</Link>}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
