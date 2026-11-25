import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import PracticeFormulaReference from "./PracticeFormulaReference";
import { practiceDifficultyLabels, type WrittenProblem } from "../../data/learning";
import { useLearning } from "../../db/learning";
import Formula from "../../components/Formula";
import ReferenceGraph from "./ReferenceGraph";
import PracticeHints from "./PracticeHints";
import { ObstacleRemediation } from "./RemediationEntry";
import TeachingSession from "./TeachingSession";
import { initialTeachingProgress, teachingByProblem, teachingEvidence, type TeachingProgress } from "../../data/teaching";
import { Button, Card } from "../../components/ui";
import { StuckButton } from "../formulas/FormulaActions";

export default function WrittenQuestion({ problem }: { problem: WrittenProblem }) {
  const { state, save } = useLearning();
  const [hints, setHints] = useState(0);
  const hintCount = (problem.guidedHints ?? problem.hints).length;
  const [revealed, setRevealed] = useState(false);
  const [result, setResult] = useState<boolean | null>(null);
  const [wrongStreak, setWrongStreak] = useState(0);

  const lesson = teachingByProblem[problem.id];
  const [progress, setProgress] = useState<TeachingProgress>();
  const [teachingOpen, setTeachingOpen] = useState(false);
  const hintUsage = Math.max(hints, progress?.stepsSeen ?? 0, Number(Boolean(lesson && revealed)));

  function assess(correct: boolean) {
    if (result !== null) return;
    setResult(correct);
    setWrongStreak((previous) => correct ? 0 : previous + 1);
    save({
      ...state,
      attempts: [...state.attempts, {
        problemId: problem.id,
        correct,
        answer: correct ? (hintUsage > 0 ? "自评：辅助完成" : "自评：独立做对") : "自评：还需复习",
        at: new Date().toISOString(),
        hints: hintUsage,
        ...(progress ? { teaching: progress } : {}),
      }].slice(-500),
    });
  }

  const renderQuestion = (reference: ReactNode) => (
    <Card className="practice-question">
      <small className="learning-note">{practiceDifficultyLabels[problem.difficulty ?? "basic"]} · {problem.kind}{problem.source && ` · ${problem.source}`}</small>
      <h2>{problem.title}</h2>
      {reference}
      <p>{problem.prompt}</p>
      <Formula value={problem.formula} />
      {problem.questionGraph && <ReferenceGraph graph={problem.questionGraph} />}
      <StuckButton key={problem.id} problemId={problem.id} />
      <p>{problem.kind === "作图题" ? "先在纸上画草图，再对照参考图。" : "先在纸上写出思路，再对照解析自评。"}</p>
      {lesson && <p className="learning-note">练习记录 · {teachingEvidence(state.attempts, problem.id)}</p>}
      <div className="learning-actions">
        {lesson && result === null && !revealed && hintUsage === 0 && (
          <Button onClick={() => assess(true)}>我独立完成了</Button>
        )}
        {lesson && result === null && (
          <Button aria-expanded={teachingOpen} onClick={() => {
            if (!teachingOpen) setProgress(progress ?? initialTeachingProgress);
            setTeachingOpen(!teachingOpen);
            setRevealed(false);
          }}>{teachingOpen ? "收起 ELI5 教学" : "ELI5 教学"}</Button>
        )}
        {!revealed && <Button variant="primary" onClick={() => { setRevealed(true); setTeachingOpen(false); }}>查看分步解析</Button>}
        {!revealed && !teachingOpen && result === null && <Button disabled={hints === hintCount} onClick={() => setHints(hints + 1)}>
          {problem.guidedHints ? "看下一步" : "给我提示"}（{hints}/{hintCount}）
        </Button>}
      </div>
      {lesson && progress && (
        <div hidden={!teachingOpen}>
          <TeachingSession lesson={lesson} onProgress={setProgress} locked={result !== null}
            remediationForStep={ObstacleRemediation}
            active={teachingOpen} finishMessage="教学步骤已结束。试着在纸上从头写一遍，再核对参考解析。" />
        </div>
      )}
      {hints > 0 && !revealed && !teachingOpen && (
        <PracticeHints problem={problem} count={hints} />
      )}
      {revealed && (
        <div className="answer-feedback">
          <h3>参考解析</h3>
          <p>{problem.explanation}</p>
          <ol>{problem.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          <Formula value={problem.solution} />
          {problem.commonMistake && <p><strong>易错点</strong>{' '}{problem.commonMistake}</p>}
          {problem.graph && <ReferenceGraph graph={problem.graph} />}
          {result === null && (
            <div className="learning-actions">
              <Button onClick={() => assess(true)}>{lesson ? "核对后确认完成" : "我独立做对了"}</Button>
              <Button onClick={() => assess(false)}>加入错题</Button>
            </div>
          )}
        </div>
      )}
      {result !== null && (
        <>
          <p role="status">{result ? "已记录自评通过。" : "已加入错题，稍后可以重练。"}</p>
          <div className="learning-actions">
            {!result && wrongStreak >= 2 && <ObstacleRemediation errorTag={problem.errorTag} />}
            <Button onClick={() => {
              setHints(0);
              setRevealed(false);
              setResult(null);
              setProgress(undefined);
              setTeachingOpen(false);
            }}>再做一次</Button>
            <Link to="/practice/mistakes">查看错题 →</Link>
          </div>
        </>
      )}
    </Card>
  );

  return <PracticeFormulaReference key={problem.id} problem={problem}>{renderQuestion}</PracticeFormulaReference>;
}
