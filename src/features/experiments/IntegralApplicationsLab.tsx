import { useState } from "react";
import { Card, SegmentedControl } from "../../components/ui";
import type { ApplicationMode } from "../../data/integralApplications";

const modes = [
  { value: "area", label: "面积" },
  { value: "volume", label: "体积" },
  { value: "arc", label: "弧长" },
];
const fmt = (value: number) => value.toFixed(4);
const px = (x: number) => 25 + 250 * x;
const py = (y: number) => 155 - 127 * y;
const upper = (x: number) => x;
const square = (x: number) => x * x;

export function IntegralApplicationsLab({ initialMode = "area" }: { initialMode?: ApplicationMode }) {
  const [mode, setMode] = useState(initialMode);
  return (
    <Card className="lab-panel" data-testid="integral-applications-experiment">
      <h2>定积分应用实验</h2>
      <SegmentedControl label="定积分应用模式" value={mode} items={modes} onChange={(value) => setMode(value as ApplicationMode)} />
      {mode === "area" ? <Area /> : mode === "volume" ? <Volume /> : <Arc />}
      <p className="learning-note">图形和数值采样用于观察，不代替数学证明。</p>
    </Card>
  );
}

function Area() {
  const [end, setEnd] = useState(0.75);
  const top = points(upper, 0, end, 1);
  const bottom = points(square, end, 0, 36);
  return (
    <>
      <p>上边界 y = x，下边界 y = x²。拖动右端点，观察两条曲线之间的累积面积。</p>
      <svg className="experiment-plot" viewBox="0 0 300 178" role="img" aria-label="直线和抛物线之间的阴影面积">
        <Axes />
        <polygon points={plot([...top, ...bottom])} fill="var(--info)" fillOpacity=".24" />
        <polyline points={plot(points(upper, 0, 1, 1))} fill="none" stroke="var(--info)" strokeWidth="2" />
        <polyline points={plot(points(square, 0, 1, 36))} fill="none" stroke="var(--nav-text)" strokeWidth="2" />
        <line x1={px(end)} x2={px(end)} y1={py(end)} y2={py(square(end))} stroke="var(--info)" strokeWidth="3" />
      </svg>
      <label>右端点 b = {end}<input aria-label="面积右端点" type="range" min="0" max="1" step=".05" value={end} onChange={(event) => setEnd(Number(event.target.value))} /></label>
      <p>窄条高度 b − b² = {fmt(end - square(end))} · 累积面积 {fmt(square(end) / 2 - end ** 3 / 3)}</p>
    </>
  );
}

function Volume() {
  const [end, setEnd] = useState(0.75);
  const [ratio, setRatio] = useState(0.5);
  const inner = end * ratio;
  return (
    <>
      <p>把外边界 y = x 和内边界 y = kx 绕横轴旋转。图中显示右端的垫片。</p>
      <svg className="experiment-plot" viewBox="0 0 300 178" role="img" aria-label="外半径与内半径构成的环形截面">
        <circle cx="150" cy="88" r={72 * end} fill="var(--info)" fillOpacity=".32" stroke="var(--info)" strokeWidth="2" />
        <circle cx="150" cy="88" r={72 * inner} fill="var(--surface)" stroke="var(--nav-text)" strokeWidth={inner > 0 ? 2 : 0} />
        <line x1="150" y1="88" x2={150 + 72 * end} y2="88" stroke="var(--info)" strokeWidth="2" />
        <line x1="150" y1="88" x2={150 - 72 * inner} y2="88" stroke="var(--nav-text)" strokeWidth="2" />
      </svg>
      <label>右端点 b = {end}<input aria-label="体积右端点" type="range" min="0" max="1" step=".05" value={end} onChange={(event) => setEnd(Number(event.target.value))} /></label>
      <label>内外半径比 k = {ratio}<input aria-label="内外半径比" type="range" min="0" max="1" step=".05" value={ratio} onChange={(event) => setRatio(Number(event.target.value))} /></label>
      <p>右端截面积 {fmt(Math.PI * (square(end) - square(inner)))} · 累积体积 {fmt(Math.PI * (1 - square(ratio)) * end ** 3 / 3)}</p>
    </>
  );
}

function Arc() {
  const [segments, setSegments] = useState(3);
  const polygon = points(square, 0, 1, segments);
  const length = polygon.slice(1).reduce((sum, [x, y], index) => {
    const [previousX, previousY] = polygon[index];
    return sum + Math.hypot(x - previousX, y - previousY);
  }, 0);
  const exact = Math.sqrt(5) / 2 + Math.asinh(2) / 4;
  return (
    <>
      <p>用等宽分割连接抛物线 y = x² 上的点，比较折线长度与曲线弧长。</p>
      <svg className="experiment-plot" viewBox="0 0 300 178" role="img" aria-label="抛物线与用于估算弧长的折线">
        <Axes />
        <polyline points={plot(points(square, 0, 1, 48))} fill="none" stroke="var(--nav-text)" strokeWidth="2" />
        <polyline points={plot(polygon)} fill="none" stroke="var(--info)" strokeWidth="2" strokeDasharray="5 3" />
        {polygon.map(([x, y]) => <circle key={x} cx={px(x)} cy={py(y)} r="3" fill="var(--info)" />)}
      </svg>
      <label>折线段数 n = {segments}<input aria-label="弧长分割数" type="range" min="1" max="32" value={segments} onChange={(event) => setSegments(Number(event.target.value))} /></label>
      <p>折线长度 {fmt(length)} · 弧长 {fmt(exact)} · 差值 {fmt(exact - length)}</p>
    </>
  );
}

function Axes() {
  return <path d="M16 155H282 M25 18V165" fill="none" stroke="currentColor" opacity=".35" />;
}

function points(f: (x: number) => number, from: number, to: number, segments: number): [number, number][] {
  return Array.from({ length: segments + 1 }, (_, index) => {
    const x = from + (to - from) * index / segments;
    return [x, f(x)];
  });
}

function plot(points: [number, number][]) {
  return points.map(([x, y]) => px(x) + "," + py(y)).join(" ");
}
