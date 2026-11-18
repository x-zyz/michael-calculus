import { useState } from "react";
import { Link } from "react-router-dom";
import { problems, checkAnswer } from "../../data/learning";
import { useLearning } from "../../db/learning";
import Formula from "../../components/Formula";
import { StuckButton } from "../formulas/FormulaActions";
import { Button, Card, InfoTip } from "../../components/ui";
export default function Question({
  problem: p,
}: {
  problem: (typeof problems)[number];
}) {
  const { state, save } = useLearning();
  const [answer, setAnswer] = useState("");
  const [hints, setHints] = useState(0);
  const [result, setResult] = useState<boolean | null>(null);
  const [invalid, setInvalid] = useState(false);
  const submitted = result !== null;
  return (
    <Card className="practice-question">
      <h2>{p.title}</h2>
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
          save({
            ...state,
            attempts: [
              ...state.attempts,
              {
                problemId: p.id,
                correct: ok,
                answer,
                at: new Date().toISOString(),
                hints,
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
          <Button
            type="button"
            disabled={hints === 3 || submitted}
            onClick={() => setHints(hints + 1)}
          >
            给我提示（{hints}/3）
          </Button>
        </div>
      </form>
      {invalid && (
        <p role="alert">
          请输入有效的数值或分数，分母不能为 0。暂不支持符号表达式。
        </p>
      )}
      {hints > 0 && (
        <ol className="learning-tip">
          {p.hints.slice(0, hints).map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ol>
      )}
      {submitted && (
        <div role="status" className="answer-feedback">
          <h3>{result ? "✓ 回答正确" : "这次还不对，看看原因"}</h3>
          <p>{p.explanation}</p>
          {!result && <p>复习方向：{p.errorLabel}。此题已加入待复习。</p>}
          <div className="learning-actions">
            <Button
              onClick={() => {
                setResult(null);
                setAnswer("");
                setHints(0);
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
}
