import { useEffect, useRef, useState } from "react";
import Formula from "../../components/Formula";
import { parseAnswer } from "../../data/learning";
import { Button } from "../../components/ui";
import { initialTeachingProgress, type TeachingLesson, type TeachingStep, type TeachingProgress, type TeachingTransfer } from "../../data/teaching";

export default function TeachingSession({ lesson, onProgress, locked, active, focused = false, onFinish, finishMessage = "教学步骤已结束。现在试着在答案框填入结果。" }: {
  lesson: TeachingLesson;
  onProgress: (progress: TeachingProgress) => void;
  locked: boolean;
  active: boolean;
  finishMessage?: string;
  focused?: boolean;
  onFinish?: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(initialTeachingProgress);
  const [finished, setFinished] = useState(false);
  const [prerequisitesOpen, setPrerequisitesOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyStep, setHistoryStep] = useState<number | null>(null);
  const step = lesson.steps[index];
  const stepStart = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!active) return;
    stepStart.current?.focus({ preventScroll: true });
    stepStart.current?.scrollIntoView?.({ block: focused ? "nearest" : "center" });
  }, [active, index, finished, focused]);

  function record(next: TeachingProgress) {
    setProgress(next);
    onProgress(next);
  }

  function advance() {
    const next = index + 1;
    record({
      ...progress,
      stepsSeen: Math.min(next + 1, lesson.steps.length),
    });
    setHistoryOpen(false);
    setHistoryStep(null);
    if (next === lesson.steps.length) {
      setFinished(true);
      onFinish?.();
    } else setIndex(next);
  }

  return (
    <section className={focused ? "practice-focus-guide" : "learning-tip"} aria-label="ELI5 教学步骤">
      {index === 0 && !finished && lesson.target && <p>{lesson.target}</p>}
      {index === 0 && !finished && lesson.prerequisites && (
        <>
          <Button type="button" aria-expanded={prerequisitesOpen}
            onClick={() => setPrerequisitesOpen(!prerequisitesOpen)}>
            {prerequisitesOpen ? "收起前置知识" : "查看前置知识"}
          </Button>
          {prerequisitesOpen && <ul>{lesson.prerequisites.map((item) => <li key={item}>{item}</li>)}</ul>}
        </>
      )}
      {!finished ? (
        <>
          <p ref={stepStart} tabIndex={-1} className="learning-note" role="status">第 {index + 1} 步，共 {lesson.steps.length} 步</p>
          {focused && <progress aria-label="教学进度" value={index + 1} max={lesson.steps.length} />}
          <Step key={step.id} step={step} locked={locked} last={index === lesson.steps.length - 1} focused={focused}
            onAttempt={(correct) => record({
              ...progress,
              checksPassed: progress.checksPassed + Number(correct),
              wrongChecks: progress.wrongChecks + Number(!correct),
            })}
            onSkip={() => record({ ...progress, checksSkipped: progress.checksSkipped + 1 })}
            onTransfer={(firstResult, resolved) => record({
              ...progress,
              transfer: { firstResult: progress.transfer?.firstResult ?? firstResult, resolved },
            })}
            onAdvance={advance} />
        </>
      ) : <p ref={stepStart} tabIndex={-1} role="status">{finishMessage}</p>}
      {(index > 0 || finished) && (
        <Button type="button" aria-expanded={historyOpen} onClick={() => setHistoryOpen(!historyOpen)}>
          {historyOpen ? "收起历史步骤" : "查看历史步骤"}
        </Button>
      )}
      {historyOpen && (
        <ol aria-label="历史步骤">
          {lesson.steps.slice(0, finished ? index + 1 : index).map((item, i) => (
            <li key={item.id}>
              <Button type="button" aria-expanded={historyStep === i}
                onClick={() => setHistoryStep(historyStep === i ? null : i)}>
                第 {i + 1} 步 · {item.goal}
              </Button>
              {historyStep === i && <><Formula value={item.formula} /><p>{item.plain}</p></>}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

function Step({ step, onAttempt, onSkip, onTransfer, onAdvance, locked, last, focused }: {
  step: TeachingStep;
  onAttempt: (correct: boolean) => void;
  onSkip: () => void;
  onTransfer: (result: "correct" | "incorrect" | "skipped", resolved: boolean) => void;
  onAdvance: () => void;
  locked: boolean;
  last: boolean;
  focused: boolean;
}) {
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const [transferFinished, setTransferFinished] = useState(false);
  const check = step.check;
  const passed = check != null && selected === check.correct;
  const checkFinished = !check || passed || skipped;
  const revealed = checkFinished && (!step.transfer || transferFinished);
  const workedFormula = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (focused && revealed) workedFormula.current?.focus();
  }, [focused, revealed]);

  return (
    <>
      <h3>{step.goal}</h3>
      <p>{step.plain}</p>
      {check && (
        <div role="group" aria-label="理解检查">
          {(!focused || !checkFinished) && <>
            <p>{check.prompt}</p>
            <div className="learning-actions">
              {check.choices.map((choice, i) => (
                <Button key={choice} type="button" disabled={locked || checkFinished} aria-pressed={selected === i}
                  onClick={() => {
                    setSelected(i);
                    if (i !== check.correct) setMistakes(mistakes + 1);
                    onAttempt(i === check.correct);
                  }}>
                  {choice}
                </Button>
              ))}
            </div>
          </>}
          {selected !== null && (!focused || !skipped) && <p role="status">{check.feedback[selected]}</p>}
          {!checkFinished && mistakes >= 2 && <p>{check.prerequisite}</p>}
          {skipped && <p role="status">已跳过本步检查。</p>}
          {!locked && !checkFinished && <Button type="button" variant={focused ? "ghost" : undefined} onClick={() => {
            setSkipped(true);
            onSkip();
          }}>跳过检查</Button>}
        </div>
      )}
      {checkFinished && step.transfer && (
        <TransferCheck transfer={step.transfer} locked={locked} finished={transferFinished} focused={focused}
          onResult={(result) => {
            onTransfer(result, result === "correct");
            if (result !== "incorrect") setTransferFinished(true);
          }} />
      )}
      {revealed && (
        <div ref={workedFormula} tabIndex={focused ? -1 : undefined} aria-label="本步完整算式">
          <Formula value={step.formula} />
          <Button type="button" aria-expanded={detailOpen} onClick={() => setDetailOpen(!detailOpen)}>
            {detailOpen ? "收起详细原理" : "查看详细原理"}
          </Button>
          {detailOpen && <p>{step.detail}</p>}
          {!locked && <div className="learning-actions">
            <Button type="button" variant={focused ? "primary" : undefined} onClick={onAdvance}>{last ? "结束教学" : "下一步"}</Button>
          </div>}
        </div>
      )}
    </>
  );
}

function TransferCheck({ transfer, locked, finished, focused, onResult }: {
  transfer: TeachingTransfer;
  locked: boolean;
  finished: boolean;
  focused: boolean;
  onResult: (result: "correct" | "incorrect" | "skipped") => void;
}) {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [solved, setSolved] = useState(false);
  return (
    <form aria-label="迁移小题" onSubmit={(event) => {
      event.preventDefault();
      if (locked || finished) return;
      const value = parseAnswer(answer);
      if (value === null) {
        setFeedback("请输入一个数值或分数。");
        return;
      }
      const correct = Math.abs(value - transfer.answer) <= 1e-6;
      setSolved(correct);
      setFeedback(correct ? "答对了。你把同样的方法用到了这组新数字上。"
        : value === -transfer.answer ? transfer.signFeedback : transfer.remediation);
      onResult(correct ? "correct" : "incorrect");
    }}>
      <h4>迁移小题</h4>
      {(!focused || !finished) && <>
        <label htmlFor="eli5-transfer-answer">{transfer.prompt}</label>
        {transfer.promptFormula && <div id="eli5-transfer-formula" aria-label="迁移题题面">
          <Formula value={transfer.promptFormula} />
        </div>}
        <input id="eli5-transfer-answer" aria-describedby={transfer.promptFormula ? "eli5-transfer-formula" : undefined}
          value={answer} autoComplete="off" maxLength={64}
          disabled={locked || finished} onChange={(event) => setAnswer(event.target.value)} />
        <div className="learning-actions">
          <Button type="submit" variant={focused && !finished ? "primary" : undefined} disabled={locked || finished}>检查迁移题</Button>
          {!locked && !finished && <Button type="button" variant={focused ? "ghost" : undefined} onClick={() => {
            setFeedback("已跳过迁移小题。");
            onResult("skipped");
          }}>跳过迁移题</Button>}
        </div>
      </>}
      {feedback && <p role="status">{feedback}</p>}
      {solved && transfer.solution && <div aria-label="迁移题解式"><Formula value={transfer.solution} /></div>}
    </form>
  );
}
