import Formula from "../../components/Formula";
import type { Problem } from "../../data/learning";

export default function PracticeHints({
  problem,
  count,
}: {
  problem: Pick<Problem, "guidedHints" | "hints">;
  count: number;
}) {
  return (
    <ol className="learning-tip" aria-label="已展开的提示" aria-live="polite">
      {problem.guidedHints
        ? problem.guidedHints.slice(0, count).map(({ change, text, formula }, index) => (
          <li key={`${index}-${change}`}>
            <Formula value={formula} />
            <div><strong>这一步的变化</strong> {change}</div>
            <div><strong>怎么算的</strong> {text}</div>
          </li>
        ))
        : problem.hints.slice(0, count).map((text) => <li key={text}>{text}</li>)}
    </ol>
  );
}
