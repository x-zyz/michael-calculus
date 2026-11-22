import { useEffect, useRef, useState } from "react";
import Formula from "../../components/Formula";
import { Button } from "../../components/ui";
import { initialTeachingProgress, type TeachingLesson, type TeachingStep, type TeachingProgress } from "../../data/teaching";

export default function TeachingSession({ lesson, onProgress, locked, active }: {
  lesson: TeachingLesson;
  onProgress: (progress: TeachingProgress) => void;
  locked: boolean;
  active: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(initialTeachingProgress);
  const [finished, setFinished] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyStep, setHistoryStep] = useState<number | null>(null);
  const step = lesson.steps[index];
  const stepStart = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!active) return;
    stepStart.current?.focus({ preventScroll: true });
    stepStart.current?.scrollIntoView?.({ block: "center" });
  }, [active, index, finished]);

  function record(next: TeachingProgress) {
    setProgress(next);
    onProgress(next);
  }

  function advance(skipped: boolean) {
    const next = index + 1;
    record({
      ...progress,
      stepsSeen: Math.min(next + 1, lesson.steps.length),
      checksSkipped: progress.checksSkipped + Number(skipped),
    });
    if (next === lesson.steps.length) setFinished(true);
    else setIndex(next);
  }

  return (
    <section className="learning-tip" aria-label="ELI5 教学步骤">
      {!finished ? (
        <>
          <p ref={stepStart} tabIndex={-1} className="learning-note" role="status">第 {index + 1} 步，共 {lesson.steps.length} 步</p>
          <Step key={step.id} step={step} locked={locked} last={index === lesson.steps.length - 1}
            onAttempt={(correct) => record({
              ...progress,
              checksPassed: progress.checksPassed + Number(correct),
              wrongChecks: progress.wrongChecks + Number(!correct),
            })}
            onAdvance={advance} />
        </>
      ) : <p ref={stepStart} tabIndex={-1} role="status">教学步骤已结束。现在试着在答案框填入结果。</p>}
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

function Step({ step, onAttempt, onAdvance, locked, last }: {
  step: TeachingStep;
  onAttempt: (correct: boolean) => void;
  onAdvance: (skipped: boolean) => void;
  locked: boolean;
  last: boolean;
}) {
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const check = step.check;
  const passed = check != null && selected === check.correct;
  return (
    <>
      <h3>{step.goal}</h3>
      <Formula value={step.formula} />
      <p>{step.plain}</p>
      <Button type="button" aria-expanded={detailOpen} onClick={() => setDetailOpen(!detailOpen)}>
        {detailOpen ? "收起详细原理" : "查看详细原理"}
      </Button>
      {detailOpen && <p>{step.detail}</p>}
      {check && (
        <div role="group" aria-label="理解检查">
          <p>{check.prompt}</p>
          <div className="learning-actions">
            {check.choices.map((choice, i) => (
              <Button key={choice} type="button" disabled={locked || passed} aria-pressed={selected === i}
                onClick={() => {
                  setSelected(i);
                  if (i !== check.correct) setMistakes(mistakes + 1);
                  onAttempt(i === check.correct);
                }}>
                {choice}
              </Button>
            ))}
          </div>
          {selected !== null && <p role="status">{check.feedback[selected]}</p>}
          {!passed && mistakes >= 2 && <p>{check.prerequisite}</p>}
        </div>
      )}
      {!locked && (
        <div className="learning-actions">
          {(!check || passed) && <Button type="button" onClick={() => onAdvance(false)}>
            {last ? "结束教学" : "下一步"}
          </Button>}
          {check && !passed && <Button type="button" onClick={() => onAdvance(true)}>跳过检查</Button>}
        </div>
      )}
    </>
  );
}
