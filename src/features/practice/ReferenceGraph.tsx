import type { PracticeGraph } from "../../data/learning";

export default function ReferenceGraph({ graph }: { graph: PracticeGraph }) {
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
          <text x={px(x)} y={py(0) + 15} textAnchor="middle" fill="currentColor">{graph.ticks?.xLabels?.[x] ?? x}</text>
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
