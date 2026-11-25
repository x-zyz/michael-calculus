import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import PracticeFormulaReference from "./PracticeFormulaReference";
import { checkAnswer, parseAnswer, practiceDifficultyLabels, type Problem, type NumericProblem } from "../../data/learning";
import { useLearning } from "../../db/learning";
import Formula from "../../components/Formula";
import { initialTeachingProgress, p8Diagnostic, teachingEvidence, type TeachingProgress, type TeachingLesson } from "../../data/teaching";
import TeachingSession from "./TeachingSession";
import PracticeHints from "./PracticeHints";
import { ObstacleRemediation } from "./RemediationEntry";
import { StuckButton } from "../formulas/FormulaActions";
import { Button, Card, InfoTip } from "../../components/ui";
import WrittenQuestion from "./WrittenQuestion";

export default function Question({ problem, teaching }: { problem: Problem; teaching?: TeachingLesson }) {
  return "answer" in problem
    ? <NumericQuestion problem={problem} teaching={teaching} />
    : <WrittenQuestion problem={problem} teaching={teaching} />;
}

type ExplanationMode = "standard" | "eli5";
const explanationModeKey = "mc-explanation-mode-v1";

function readExplanationMode(): ExplanationMode {
  try {
    return localStorage.getItem(explanationModeKey) === "eli5" ? "eli5" : "standard";
  } catch {
    return "standard";
  }
}

function NumericQuestion({ problem: p, teaching }: { problem: NumericProblem; teaching?: TeachingLesson }) {
  const { state, save } = useLearning();
  const [answer, setAnswer] = useState("");
  const [hints, setHints] = useState(0);
  const hintCount = (p.guidedHints ?? p.hints).length;
  const [result, setResult] = useState<boolean | null>(null);
  const [wrongStreak, setWrongStreak] = useState(0);
  const [invalid, setInvalid] = useState(false);
  const submitted = result !== null;
  const [defaultMode, setDefaultMode] = useState(readExplanationMode);
  const [mode, setMode] = useState<ExplanationMode>(() => teaching ? defaultMode : "standard");
  const [modeSaveError, setModeSaveError] = useState(false);
  const [progress, setProgress] = useState<TeachingProgress>();
  const [showSolution, setShowSolution] = useState(false);
  const [solutionSeen, setSolutionSeen] = useState(false);
  const [diagnosticAnswer, setDiagnosticAnswer] = useState<number>();
  const hintUsage = Math.max(hints, progress?.stepsSeen ?? 0, Number(solutionSeen));
  function startTeaching() {
    setMode("eli5");
    setProgress(progress ?? initialTeachingProgress);
  }

  function saveDefaultMode() {
    try {
      localStorage.setItem(explanationModeKey, mode);
      setDefaultMode(mode);
      setModeSaveError(false);
    } catch {
      setModeSaveError(true);
    }
  }

  const renderQuestion = (reference: ReactNode) => (
    <Card className="practice-question" data-problem-id={p.id}>
      <small className="learning-note">{practiceDifficultyLabels[p.difficulty ?? "basic"]}</small>
      <h2>{p.title}</h2>
      {reference}
      {teaching && <p className="learning-note">练习记录 · {teachingEvidence(state.attempts, p.id)}</p>}
      <Formula value={p.formula} />
      <StuckButton key={p.id} problemId={p.id} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (submitted) return;
          const ok = checkAnswer(answer, p.answer);
          if (ok === null) {
            setInvalid(true);
            return;
          }
          setInvalid(false);
          setResult(ok);
          setWrongStreak((previous) => ok ? 0 : previous + 1);
          if (teaching && !ok) setSolutionSeen(true);
          save({
            ...state,
            attempts: [
              ...state.attempts,
              {
                problemId: p.id,
                correct: ok,
                answer,
                at: new Date().toISOString(),
                hints: hintUsage,
                ...(progress ? { teaching: progress } : {}),
              },
            ].slice(-500),
          });
        }}
      >
        <div className="section-header">
          <label htmlFor="answer">{p.unit || "请输入数值或分数"}</label>
          <InfoTip label="判分说明">
            目前只检查预设数值或分数答案，不判断任意推导过程。
          </InfoTip>
        </div>
        <input
          id="answer"
          value={answer}
          autoComplete="off"
          maxLength={64}
          placeholder="例如：0.25 或 1/4"
          disabled={submitted}
          onChange={(e) => {
            setAnswer(e.target.value);
            setInvalid(false);
          }}
        />
        <div className="learning-actions">
          <Button variant="primary" disabled={submitted} type="submit">
            检查答案
          </Button>
          {mode === "standard" && <Button
            type="button"
            disabled={hints === hintCount || submitted}
            onClick={() => setHints(hints + 1)}
          >
            {p.guidedHints ? "看下一步" : "给我提示"}（{hints}/{hintCount}）
          </Button>}
        </div>
      </form>
      {invalid && (
        <p role="alert">
          请输入有效的数值或分数，分母不能为 0。暂不支持符号表达式。
        </p>
      )}
      {teaching && (
        <div className="learning-actions" role="group" aria-label="解析模式">
          <Button type="button" aria-pressed={mode === "standard"} onClick={() => setMode("standard")}>标准解析</Button>
          <Button type="button" aria-pressed={mode === "eli5"} onClick={startTeaching}>ELI5 教学</Button>
          <Button type="button" disabled={defaultMode === mode} onClick={saveDefaultMode}>
            {defaultMode === mode ? "当前模式已是默认" : "设为默认解析模式"}
          </Button>
          {modeSaveError && <p role="alert">无法保存默认解析模式。</p>}
        </div>
      )}
      {teaching && mode === "eli5" && !progress && (
        <Button type="button" onClick={startTeaching}>开始 ELI5 教学</Button>
      )}
      {teaching && progress && (
        <div hidden={mode !== "eli5"}>
          <TeachingSession lesson={teaching} onProgress={setProgress} locked={submitted} active={mode === "eli5"}
            remediationForStep={ObstacleRemediation} />
        </div>
      )}
      {mode === "standard" && hints > 0 && <PracticeHints problem={p} count={hints} />}
      {teaching && mode === "standard" && (
        <>
          <Button type="button" aria-expanded={showSolution} onClick={() => {
            setShowSolution(!showSolution);
            if (!showSolution) setSolutionSeen(true);
          }}>{showSolution ? "收起完整解析" : "查看完整解析"}</Button>
          {showSolution && <div className="learning-tip" aria-label="完整解析"><Formula value={teaching.solution} /><p>{p.explanation}</p></div>}
        </>
      )}
      {submitted && (
        <div role="status" className="answer-feedback">
          <h3>{result ? "✓ 回答正确" : "这次还不对，看看原因"}</h3>
          {!result && p.id === "p8" && (
            <section aria-label="错因小检查">
              <p>{p8Diagnostic(parseAnswer(answer) ?? 0)}</p>
              <p>把 2/5 的分母改成 −15，分子是哪一个？</p>
              <div className="learning-actions">
                {[-6, 6, -3].map((choice) => (
                  <Button key={choice} type="button" aria-pressed={diagnosticAnswer === choice}
                    onClick={() => setDiagnosticAnswer(choice)}>{choice}</Button>
                ))}
              </div>
              {diagnosticAnswer !== undefined && <p role="status">
                {diagnosticAnswer === -6
                  ? "对。上下都乘 −3。把同一条规则用回原题的 2/x。"
                  : "先看 5 到 −15 是乘哪个数，再让分子 2 乘同一个数。"}
              </p>}
            </section>
          )}
          {(result || p.id !== "p8") && <p>{p.explanation}</p>}
          {!result && <p>复习方向：{p.errorLabel}。此题已加入待复习。</p>}
          <div className="learning-actions">
            {!result && wrongStreak >= 2 && <ObstacleRemediation errorTag={p.errorTag} />}
            <Button
              onClick={() => {
                setResult(null);
                setAnswer("");
                if (teaching && hintUsage > 0) setSolutionSeen(true);
                setHints(0);
                setDiagnosticAnswer(undefined);
              }}
            >
              再做一次
            </Button>
            <Link to={`/curriculum?lesson=${p.lessonId}`}>回到知识点 →</Link>
            <Link to="/practice/mistakes">查看错题 →</Link>
          </div>
        </div>
      )}
    </Card>
  );

  return <PracticeFormulaReference key={p.id} problem={p}>{renderQuestion}</PracticeFormulaReference>;
}
