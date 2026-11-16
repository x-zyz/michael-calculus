import { Link } from "react-router-dom";
import { formulas } from "../../data/formulas";
import { problems } from "../../data/learning";
import { useFormulas } from "../../db/formulas";
import { useLearning } from "../../db/learning";
import { cardById, evidence, level, errorTags } from "./engine";
import Formula from "../../components/Formula";
import { Card, Button, Accordion } from "../../components/ui";
export default function FormulaDetail({
  formula: f,
  onBack,
}: {
  formula: (typeof formulas)[number];
  onBack: () => void;
}) {
  const { store } = useFormulas();
  const { state } = useLearning();
  const records = store.reviews
    .filter((r) => cardById.get(r.cardId)?.formulaId === f.id)
    .slice(-10)
    .reverse();
  return (
    <Card>
      <Button variant="ghost" onClick={onBack}>
        ← 返回公式列表
      </Button>
      <h2>
        {f.name} · L{level(f.id, store, state.attempts)}
      </h2>
      <Formula value={f.latex} />
      <p>适用条件：{f.conditions}</p>
      <ul>
        {f.pitfalls.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <Accordion title="升级所需证据（从 L0 起逐级满足）">
        {evidence(f.id, store, state.attempts).map((e) => (
          <p key={e.name}>
            <strong>
              {e.met ? "✓" : "○"} {e.name}
            </strong>
            ：{e.detail}
          </p>
        ))}
        <p className="learning-note">
          新填空和默写由程序判分，旧复习记录仍计入等级。等级必须逐级满足。
        </p>
      </Accordion>
      <div className="learning-actions">
        {f.lessonId && <Link to={`/curriculum/${f.lessonId}`}>关联课程 →</Link>}
        {problems
          .filter((p) => p.formulaIds?.includes(f.id))
          .map((p) => (
            <Link key={p.id} to={`/practice?problem=${p.id}`}>
              {p.title} →
            </Link>
          ))}
      </div>
      <Accordion title="最近 10 次记录">
        {records.length ? (
          records.map((r, i) => (
            <p key={i}>
              {new Date(r.at).toLocaleString()} ·{" "}
              {r.result === "good"
                ? "记住/答对"
                : r.result === "fuzzy"
                  ? "模糊"
                  : "忘记/答错"}{" "}
              {r.errorTags.map((t) => errorTags[t]).join("、")}
            </p>
          ))
        ) : (
          <p>还没有复习记录。</p>
        )}
      </Accordion>
    </Card>
  );
}
