import { useState } from "react";
import { Link } from "react-router-dom";
import { practiceDifficultyLabels, type WrittenProblem, type PracticeGraph } from "../../data/learning";
import { useLearning } from "../../db/learning";
import Formula from "../../components/Formula";
import { Button, Card } from "../../components/ui";
import { StuckButton } from "../formulas/FormulaActions";

export default function WrittenQuestion({ problem }: { problem: WrittenProblem }) {
  const { state, save } = useLearning();
  const [hints, setHints] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [result, setResult] = useState<boolean | null>(null);

  function assess(correct: boolean) {
    if (result !== null) return;
    setResult(correct);
    save({
      ...state,
      attempts: [...state.attempts, {
        problemId: problem.id,
        correct,
        answer: correct ? "自评：独立做对" : "自评：还需复习",
        at: new Date().toISOString(),
        hints,
      }].slice(-500),
    });
  }

  return (
    <Card className="practice-question">
      <small className="learning-note">{practiceDifficultyLabels[problem.difficulty ?? "basic"]} · {problem.kind}{problem.source && ` · ${problem.source}`}</small>
      <h2>{problem.title}</h2>
      <p>{problem.prompt}</p>
      <Formula value={problem.formula} />
      {problem.questionGraph && <ReferenceGraph graph={problem.questionGraph} />}
      <StuckButton key={problem.id} problemId={problem.id} />
      <p>{problem.kind === "作图题" ? "先在纸上画草图，再对照参考图。" : "先在纸上写出思路，再对照解析自评。"}</p>
      <div className="learning-actions">
        {!revealed && <Button variant="primary" onClick={() => setRevealed(true)}>查看分步解析</Button>}
        {!revealed && <Button disabled={hints === problem.hints.length} onClick={() => setHints(hints + 1)}>
          给我提示（{hints}/{problem.hints.length}）
        </Button>}
      </div>
      {hints > 0 && !revealed && (
        <ol className="learning-tip">{problem.hints.slice(0, hints).map((hint) => <li key={hint}>{hint}</li>)}</ol>
      )}
      {revealed && (
        <div className="answer-feedback">
          <h3>参考解析</h3>
          <p>{problem.explanation}</p>
          <ol>{problem.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          <Formula value={problem.solution} />
          {problem.commonMistake && <p><strong>易错点</strong>{' '}{problem.commonMistake}</p>}
          {problem.graph && <ReferenceGraph graph={problem.graph} />}
          {result === null ? (
            <div className="learning-actions">
              <Button onClick={() => assess(true)}>我独立做对了</Button>
              <Button onClick={() => assess(false)}>加入错题</Button>
            </div>
          ) : (
            <>
              <p role="status">{result ? "已记录自评通过。" : "已加入错题，稍后可以重练。"}</p>
              <div className="learning-actions">
                <Button onClick={() => { setHints(0); setRevealed(false); setResult(null); }}>再做一次</Button>
                <Link to="/practice/mistakes">查看错题 →</Link>
              </div>
            </>
          )}
        </div>
      )}
    </Card>
  );
}

function ReferenceGraph({ graph }: { graph: PracticeGraph }) {
  const [left, right, bottom, top] = graph.bounds;
  const px = (x: number) => 18 + 264 * (x - left) / (right - left);
  const py = (y: number) => 12 + 148 * (top - y) / (top - bottom);
  return (
    <svg className="experiment-plot" viewBox="0 0 300 174" role="img" aria-label={graph.description}>
      <svg x="18" y="12" width="264" height="148" viewBox="18 12 264 148" overflow="hidden">
        <path d={`M18 ${py(0)}H282 M${px(0)} 12V160`} stroke="currentColor" opacity=".4" />
        {graph.branches.map(([start, end, fn]) => {
          const path = Array.from({ length: 121 }, (_, i) => {
            const x = start + (end - start) * i / 120;
            return `${i === 0 ? "M" : "L"}${px(x).toFixed(2)},${py(fn(x)).toFixed(2)}`;
          }).join(" ");
          return <path key={start} d={path} fill="none" stroke="var(--nav-text)" strokeWidth="2" />;
        })}
        {graph.points?.map(([x, y, included]) => (
          <circle
            key={`${x},${y}`}
            cx={px(x)}
            cy={py(y)}
            r="3"
            fill={included ? "var(--nav-text)" : "var(--surface-2)"}
            stroke="var(--nav-text)"
            strokeWidth="1.5"
          />
        ))}
      </svg>
      {graph.ticks?.x.map((x) => (
        <g key={x} className="practice-plot-tick">
          <path d={`M${px(x)} ${py(0) - 3}v6`} stroke="currentColor" />
          <text x={px(x)} y={py(0) + 15} textAnchor="middle" fill="currentColor">{x}</text>
        </g>
      ))}
      {graph.ticks?.y.map((y) => (
        <g key={y} className="practice-plot-tick">
          <path d={`M${px(0) - 3} ${py(y)}h6`} stroke="currentColor" />
          <text x={px(0) - 7} y={py(y) + 4} textAnchor="end" fill="currentColor">{y}</text>
        </g>
      ))}
      <text x="285" y={py(0)} fill="currentColor">x</text>
      <text x={px(0) + 4} y="13" fill="currentColor">y</text>
      <text x={px(0) + 4} y={py(0) + 14} fill="currentColor">0</text>
    </svg>
  );
}
