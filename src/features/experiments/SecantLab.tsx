import { useState } from "react";
import {
  secantModels,
  secantSlope,
  linearApprox,
  type SecantKind,
} from "../../data/learning";
import { Card, Select, Chip, ChipRow, Accordion } from "../../components/ui";
const fmt = (n: number, d = 6) => {
  const s = n.toFixed(d);
  return /^-0\.0+$/.test(s) ? s.slice(1) : s;
};
export function SecantExperiment({
  initialKind = "square",
}: {
  initialKind?: SecantKind;
}) {
  const [kind, setKind] = useState<SecantKind>(initialKind);
  const [side, setSide] = useState<"right" | "left">("right");
  const [distance, setDistance] = useState(8);
  const model = secantModels[kind];
  const absH = Number((0.9 * 10 ** (-distance / 15)).toFixed(4));
  const h = side === "right" ? absH : -absH;
  const x1 = model.x0 + h;
  const y1 = model.fn(x1);
  const slope = secantSlope(kind, h)!;
  const approx = linearApprox(kind, h)!;
  const [xmin, xmax, ymin, ymax] = model.range;
  const px = (x: number) => 45 + ((x - xmin) / (xmax - xmin)) * 430,
    py = (y: number) => 225 - ((y - ymin) / (ymax - ymin)) * 200;
  const samples = Array.from(
    { length: 140 },
    (_, i) => xmin + ((xmax - xmin) * i) / 139,
  );
  const tangentY = (x: number) => model.y0 + model.derivative * (x - model.x0);
  const secantY = (x: number) => model.y0 + slope * (x - model.x0);
  return (
    <Card className="lab-panel" data-testid="secant-experiment">
      <h2>割线与切线逼近实验</h2>


      <svg
        viewBox="0 0 520 260"
        role="img"
        aria-label="函数曲线、割线与切线"
        className="experiment-plot"
      >
        <path
          d={`M45 ${py(0)}H485 M${px(model.x0)} 15V235`}
          stroke="currentColor"
          opacity=".22"
        />
        <path
          d={`M${px(xmin)},${py(tangentY(xmin))} L${px(xmax)},${py(tangentY(xmax))}`}
          stroke="currentColor"
          strokeDasharray="5 6"
          opacity=".5"
        />
        <path
          d={samples
            .map((x, j) => `${j ? "L" : "M"}${px(x)},${py(model.fn(x))}`)
            .join(" ")}
          fill="none"
          stroke="var(--info)"
          strokeWidth="3"
        />
        <path
          d={`M${px(xmin)},${py(secantY(xmin))} L${px(xmax)},${py(secantY(xmax))}`}
          stroke="var(--success)"
          strokeWidth="2.2"
        />
        <path
          d={`M${px(model.x0)},${py(model.y0)} H${px(x1)} V${py(y1)}`}
          fill="none"
          stroke="var(--warning)"
          strokeDasharray="3 3"
        />
        <circle
          cx={px(model.x0)}
          cy={py(model.y0)}
          r="5.5"
          fill="var(--info)"
        />
        <circle
          cx={px(x1)}
          cy={py(tangentY(x1))}
          r="5"
          fill="var(--surface)"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx={px(x1)} cy={py(y1)} r="6" fill="var(--warning)" />
        <text
          x={px(model.x0)}
          y="254"
          textAnchor="middle"
          fill="currentColor"
          fontSize="16"
        >
          x₀ = {model.x0}
        </text>
      </svg>
      <ChipRow label="逼近方向">
        <Chip
          type="button"
          selected={side === "right"}
          onClick={() => setSide("right")}
        >
          右侧逼近（h &gt; 0）
        </Chip>
        <Chip
          type="button"
          selected={side === "left"}
          onClick={() => setSide("left")}
        >
          左侧逼近（h &lt; 0）
        </Chip>
      </ChipRow>
      <label>
        选择函数与定点
        <Select
          aria-label="选择导数实验函数"
          value={kind}
          onChange={(e) => setKind(e.target.value as SecantKind)}
        >
          {Object.entries(secantModels).map(([k, v]) => (
            <option key={k} value={k}>
              {v.label}
            </option>
          ))}
        </Select>
      </label>
      <p className="experiment-legend">
        <span>
          <i className="dot left" />
          割线（斜率 Δy/h）
        </span>
        <span>
          <i className="dot right" />
          邻近点 x₀ + h
        </span>
        <span>
          <i className="dash" />
          切线（斜率 f&apos;(x₀) = {model.derivative}）
        </span>
      </p>
      <label htmlFor="secant-step">
        步长 h = {fmt(h, 4)}（向右拖动缩小 |h|，让割线贴向切线）
      </label>
      <input
        id="secant-step"
        type="range"
        min="1"
        max="40"
        value={distance}
        onChange={(e) => setDistance(Number(e.target.value))}
      />
      <div className="experiment-values" aria-live="polite">
        <div data-testid="secant-slope">
          邻近点 x₀ + h = {fmt(x1, 4)}
          <strong>割线斜率 Δy / h = {fmt(slope)}</strong>
          <small>函数增量 Δy = {fmt(y1 - model.y0)}</small>
        </div>
        <div data-testid="tangent-slope">
          定点 x₀ = {model.x0}，f(x₀) = {model.y0}
          <strong>切线斜率 f&apos;(x₀) = {fmt(model.derivative)}</strong>
          <small>
            斜率差 |Δy/h − f&apos;(x₀)| ={" "}
            {fmt(Math.abs(slope - model.derivative))}
          </small>
        </div>
      </div>
      <Accordion title="详细数值">
        {" "}
        <div data-testid="linear-approx">
          微分线性近似 dy = f&apos;(x₀)h = {fmt(approx.dy)}
          <strong>
            真实增量 Δy = {fmt(approx.deltaY)}（误差 |Δy − dy| ={" "}
            {fmt(approx.error)}）
          </strong>
          <small>
            高阶误差比 |Δy − dy| / |h| = {fmt(approx.errorRatio!)}（随 |h| → 0
            趋近 0）
          </small>
        </div>
      </Accordion>
      <p>
        当 h 从{side === "right" ? "右侧" : "左侧"}趋近 0
        时，割线斜率逐渐逼近切线斜率 {model.derivative}，同时切线线性近似 dy
        与真实增量 Δy 的误差比 |h| 更快地趋近 0。在 h = 0 处差商为 0/0
        型未定义。
      </p>
    </Card>
  );
}
