import { useState } from "react";
import {
  experimentValue,
  experimentLimits,
  type ExperimentKind,
} from "../../data/learning";
import { Card, Select } from "../../components/ui";
const fmt = (n: number, d = 6) => {
  const s = n.toFixed(d);
  return /^-0\.0+$/.test(s) ? s.slice(1) : s;
};
export function Experiment({
  initialKind = "hole",
}: {
  initialKind?: ExperimentKind;
}) {
  const [kind, setKind] = useState<ExperimentKind>(initialKind);
  const [distance, setDistance] = useState(15);
  const lim = experimentLimits[kind];
  const a = lim.a,
    h = 10 ** (-distance / 10),
    left = experimentValue(kind, a - h)!,
    right = experimentValue(kind, a + h)!;
  const range: [number, number, number, number] =
    kind === "hole"
      ? [0, 2, 0, 4]
      : kind === "sine"
        ? [-3, 3, 0, 1.5]
        : kind === "euler"
          ? [-0.6, 1.4, 0, 4]
          : kind === "infinitesimal"
            ? [-2.5, 2.5, 0, 0.8]
            : [-2, 2, -0.5, 1.5];
  const [xmin, xmax, ymin, ymax] = range;
  const px = (x: number) => 45 + ((x - xmin) / (xmax - xmin)) * 430,
    py = (y: number) => 225 - ((y - ymin) / (ymax - ymin)) * 200;
  const segments = [
    Array.from({ length: 120 }, (_, i) => xmin + (a - xmin) * (i / 120)),
    Array.from({ length: 120 }, (_, i) => a + (xmax - a) * ((i + 1) / 120)),
  ];
  const twoSided = lim.left === lim.right;
  const refLines = twoSided
    ? [{ y: lim.left, from: xmin, to: xmax }]
    : [
        { y: lim.left, from: xmin, to: a },
        { y: lim.right, from: a, to: xmax },
      ];
  const limitLabel = lim.label ?? String(lim.left);
  return (
    <Card className="lab-panel" data-testid="experiment">
      <h2>左右极限逼近实验</h2>

      <svg
        viewBox="0 0 520 260"
        role="img"
        aria-label="函数曲线及左右逼近点"
        className="experiment-plot"
      >
        <path
          d={`M45 ${py(Math.max(ymin, 0))}H485 M${px(a)} 15V235`}
          stroke="currentColor"
          opacity=".25"
        />
        {refLines.map((l) => (
          <path
            key={`${l.y}-${l.from}`}
            d={`M${px(l.from)} ${py(l.y)}H${px(l.to)}`}
            stroke="currentColor"
            strokeDasharray="5 6"
            opacity=".45"
          />
        ))}
        {segments.map((xs, i) => (
          <path
            key={i}
            d={xs
              .map(
                (x, j) =>
                  `${j ? "L" : "M"}${px(x)},${py(experimentValue(kind, x)!)}`,
              )
              .join(" ")}
            fill="none"
            stroke="var(--info)"
            strokeWidth="3"
          />
        ))}
        <circle
          cx={px(a)}
          cy={py(kind === "jump" ? 0 : lim.left)}
          r="5"
          fill="var(--surface)"
          stroke="var(--info)"
          strokeWidth="2"
        />
        {kind === "jump" && (
          <circle cx={px(0)} cy={py(1)} r="5" fill="var(--info)" />
        )}
        <circle cx={px(a - h)} cy={py(left)} r="6" fill="var(--success)" />
        <circle cx={px(a + h)} cy={py(right)} r="6" fill="var(--warning)" />
        <text
          x={px(a)}
          y="254"
          textAnchor="middle"
          fill="currentColor"
          fontSize="16"
        >
          x = {a}
        </text>
        {twoSided ? (
          <text
            x="38"
            y={py(lim.left) + 5}
            textAnchor="end"
            fill="currentColor"
            fontSize="15"
          >
            {limitLabel}
          </text>
        ) : (
          [lim.left, lim.right].map((y) => (
            <text
              key={y}
              x="38"
              y={py(y) + 5}
              textAnchor="end"
              fill="currentColor"
              fontSize="15"
            >
              {y}
            </text>
          ))
        )}
      </svg>
      <label>
        选择函数
        <Select
          aria-label="选择实验函数"
          value={kind}
          onChange={(e) => setKind(e.target.value as ExperimentKind)}
        >
          <option value="hole">可去间断：(x² − 1)/(x − 1)</option>
          <option value="sine">第一个重要极限：sin x / x（弧度）</option>
          <option value="euler">第二个重要极限：(1 + x)^(1/x)</option>
          <option value="infinitesimal">等价无穷小：(1 − cos x) / x²</option>
          <option value="jump">跳跃间断：x &lt; 0 时为 0，否则为 1</option>
        </Select>
      </label>
      <p className="experiment-legend">
        <span>
          <i className="dot left" />
          左侧逼近点
        </span>
        <span>
          <i className="dot right" />
          右侧逼近点
        </span>
        <span>
          <i className="dash" />
          极限参考线
        </span>
      </p>
      <label htmlFor="approach">
        逼近距离 h = {h.toFixed(4)}（向右拖动，更接近目标点）
      </label>
      <input
        id="approach"
        type="range"
        min="1"
        max="40"
        value={distance}
        onChange={(e) => setDistance(Number(e.target.value))}
      />
      <div className="experiment-values" aria-live="polite">
        <div data-testid="left-value">
          x = {fmt(a - h, 4)}
          <strong>左侧 f(x) = {fmt(left)}</strong>
          <small>
            与左极限 {twoSided ? limitLabel : lim.left} 相差{" "}
            {fmt(Math.abs(left - lim.left))}
          </small>
        </div>
        <div data-testid="right-value">
          x = {fmt(a + h, 4)}
          <strong>右侧 f(x) = {fmt(right)}</strong>
          <small>
            与右极限 {twoSided ? limitLabel : lim.right} 相差{" "}
            {fmt(Math.abs(right - lim.right))}
          </small>
        </div>
      </div>
      <p>
        {kind === "hole"
          ? "左右函数值都趋近 2，但原函数在 x = 1 未定义（空心点）。"
          : kind === "sine"
            ? "左右比值都趋近 1。x = 0 处原表达式未定义（空心点）。"
            : kind === "euler"
              ? "左右两侧的 (1 + x)^(1/x) 都趋近无理数 e ≈ 2.718282，x = 0 处原表达式未定义。"
              : kind === "infinitesimal"
                ? "1 − cos x 与 x²/2 是等价无穷小，比值在 x → 0 时从两侧趋近 0.5。"
                : "左极限为 0，右极限为 1，不相等，因此双侧极限不存在。实心点表示 f(0) = 1。"}
      </p>
    </Card>
  );
}
