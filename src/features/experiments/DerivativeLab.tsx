import { useState } from "react";
import {
  derivativeAppModels,
  derivativeAppState,
  type DerivativeAppKind,
} from "../../data/learning";
import { Card, Select } from "../../components/ui";
const fmt = (n: number, d = 6) => {
  const s = n.toFixed(d);
  return /^-0\.0+$/.test(s) ? s.slice(1) : s;
};
export function DerivativeAppExperiment({
  initialKind = "mvt",
}: {
  initialKind?: DerivativeAppKind;
}) {
  const [kind, setKind] = useState<DerivativeAppKind>(initialKind);
  const model = derivativeAppModels[kind];
  const [x, setX] = useState<number>(model.defaultX);
  const safeX = kind === "lhopital" && Math.abs(x) < 1e-6 ? 0.05 : x;
  const current = derivativeAppState(kind, safeX)!;
  const [xmin, xmax, ymin, ymax] = model.range;
  const px = (v: number) => 45 + ((v - xmin) / (xmax - xmin)) * 430,
    py = (v: number) => 225 - ((v - ymin) / (ymax - ymin)) * 200;
  const curveSegments =
    kind === "lhopital"
      ? [
          Array.from(
            { length: 60 },
            (_, i) => xmin + (-0.02 - xmin) * (i / 59),
          ),
          Array.from({ length: 60 }, (_, i) => 0.02 + (xmax - 0.02) * (i / 59)),
        ]
      : [
          Array.from(
            { length: 120 },
            (_, i) => xmin + ((xmax - xmin) * i) / 119,
          ),
        ];
  const tangentY = (t: number) =>
    current.fx + current.tangentSlope * (t - safeX);
  return (
    <Card className="lab-panel" data-testid="derivative-app-experiment">
      <h2>中值定理与导数应用实验</h2>

      <svg
        viewBox="0 0 520 260"
        role="img"
        aria-label="中值定理、未定式与极值曲线"
        className="experiment-plot"
      >
        <path
          d={`M45 ${py(Math.max(ymin, 0))}H485 M${px(0)} 15V235`}
          stroke="currentColor"
          opacity=".22"
        />
        {kind === "mvt" && (
          <path
            d={`M${px(0)},${py(0)} L${px(2)},${py(4)}`}
            stroke="currentColor"
            strokeDasharray="5 6"
            opacity=".5"
          />
        )}
        {kind === "lhopital" && (
          <path
            d={`M${px(xmin)},${py(0.5)} H${px(xmax)}`}
            stroke="currentColor"
            strokeDasharray="5 6"
            opacity=".5"
          />
        )}
        {curveSegments.map((xs, idx) => (
          <path
            key={idx}
            d={xs
              .map(
                (t, j) =>
                  `${j ? "L" : "M"}${px(t)},${py(derivativeAppState(kind, t)!.fx)}`,
              )
              .join(" ")}
            fill="none"
            stroke="var(--info)"
            strokeWidth="3"
          />
        ))}
        {kind !== "lhopital" && (
          <path
            d={`M${px(xmin)},${py(tangentY(xmin))} L${px(xmax)},${py(tangentY(xmax))}`}
            stroke="var(--success)"
            strokeWidth="2.2"
          />
        )}
        {kind === "lhopital" && (
          <circle
            cx={px(0)}
            cy={py(0.5)}
            r="5"
            fill="var(--surface)"
            stroke="var(--info)"
            strokeWidth="2"
          />
        )}
        {kind === "extrema" && (
          <>
            <circle cx={px(-1)} cy={py(2)} r="5" fill="var(--success)" />
            <circle cx={px(1)} cy={py(-2)} r="5" fill="var(--success)" />
          </>
        )}
        <circle
          cx={px(safeX)}
          cy={py(current.fx)}
          r="6"
          fill="var(--warning)"
        />
        <text
          x={px(safeX)}
          y="254"
          textAnchor="middle"
          fill="currentColor"
          fontSize="16"
        >
          x = {fmt(safeX, 2)}
        </text>
      </svg>
      <label>
        选择导数应用主题
        <Select
          aria-label="选择导数应用实验"
          value={kind}
          onChange={(e) => {
            const next = e.target.value as DerivativeAppKind;
            setKind(next);
            setX(derivativeAppModels[next].defaultX);
          }}
        >
          {Object.entries(derivativeAppModels).map(([k, v]) => (
            <option key={k} value={k}>
              {v.label}
            </option>
          ))}
        </Select>
      </label>
      <label htmlFor="derivative-app-x">
        观察点 x = {fmt(safeX, 2)}（拖动滑块观察切线、导数比或极值变化）
      </label>
      <input
        id="derivative-app-x"
        type="range"
        min={model.minX}
        max={model.maxX}
        step={model.stepX}
        value={safeX}
        onChange={(e) => setX(Number(e.target.value))}
      />
      <div className="experiment-values" aria-live="polite">
        {kind === "mvt" ? (
          <>
            <div data-testid="mvt-secant">
              区间 [0, 2] 端点连线
              <strong>平均变化率 Δy / Δx = {fmt(current.secantSlope)}</strong>
              <small>理论中值点 ξ = {current.c}</small>
            </div>
            <div data-testid="mvt-tangent">
              当前点 x = {fmt(safeX, 2)}，f(x) = {fmt(current.fx)}
              <strong>
                瞬时变化率 f&apos;(x) = {fmt(current.tangentSlope)}
              </strong>
              <small>
                与弦斜率差 |f&apos;(x) − Δy/Δx| = {fmt(current.slopeDiff)}
              </small>
            </div>
          </>
        ) : kind === "lhopital" ? (
          <>
            <div data-testid="lhopital-ratio">
              原未定式比值（x = {fmt(safeX, 2)} ≠ 0）
              <strong>(eˣ − 1 − x) / x² = {fmt(current.ratio)}</strong>
              <small>
                与极限 0.5 相差 {fmt(Math.abs(current.ratio - current.limit))}
              </small>
            </div>
            <div data-testid="lhopital-derivative">
              一次洛必达导数比
              <strong>
                f&apos;(x) / g&apos;(x) = (eˣ − 1) / (2x) ={" "}
                {fmt(current.derivativeRatio)}
              </strong>
              <small>
                x = 0 处原式与一次导数比均为 0/0 未定义，极限同为 0.5
              </small>
            </div>
          </>
        ) : (
          <>
            <div data-testid="extrema-first">
              当前点 x = {fmt(safeX, 2)}，f(x) = {fmt(current.fx)}
              <strong>一阶导数 f&apos;(x) = {fmt(current.dfx)}</strong>
              <small>单调与极值状态：{current.monotone}</small>
            </div>
            <div data-testid="extrema-second">
              凹凸性与二阶导数判别
              <strong>二阶导数 f&apos;&apos;(x) = {fmt(current.d2fx)}</strong>
              <small>
                驻点 x = −1 极大值 2（f&apos;&apos; &lt; 0），x = 1 极小值
                −2（f&apos;&apos; &gt; 0）
              </small>
            </div>
          </>
        )}
      </div>
      <p>
        {kind === "mvt"
          ? "当 x = 1 时 f'(1) = 2 恰好等于区间 [0, 2] 端点弦的斜率 2，直观展示了拉格朗日中值定理。"
          : kind === "lhopital"
            ? "当 x 趋近 0 时，原分式 (eˣ − 1 − x)/x² 与导数比 (eˣ − 1)/(2x) 同步趋近 0.5；在 x = 0 处为 0/0 未定义（空心点）。"
            : "f'(x) > 0 时函数单调递增，f'(x) < 0 时单调递减；在驻点 x = ±1 处 f'(x) = 0，由二阶导数正负判别极小与极大。"}
      </p>
    </Card>
  );
}
