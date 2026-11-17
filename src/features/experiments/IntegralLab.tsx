import { useState } from "react";
import { Card, SegmentedControl, Select } from "../../components/ui";
import Formula from "../../components/Formula";
import { accumulationSlope, riemannSum, type IntegralMode, type SamplePoint } from "../../data/integrals";

const modes = [
  { value: "primitive", label: "原函数" },
  { value: "riemann", label: "黎曼和" },
  { value: "accumulation", label: "变上限" },
];
const samples = [
  { value: "left", label: "左端点" },
  { value: "mid", label: "中点" },
  { value: "right", label: "右端点" },
];
const fmt = (n: number) => Number(n.toFixed(4)).toString();

export function IntegralExperiment({ initialMode = "riemann" }: { initialMode?: IntegralMode }) {
  const [mode, setMode] = useState<IntegralMode>(initialMode);
  return (
    <Card className="lab-panel" data-testid="integral-experiment">
      <h2>积分实验</h2>
      <SegmentedControl label="积分实验模式" value={mode} items={modes} onChange={(value) => setMode(value as IntegralMode)} />
      {mode === "riemann" ? <Riemann /> : mode === "primitive" ? <Primitive /> : <Accumulation />}
      <p className="learning-note">图形和数值采样用于观察，不代替数学证明。</p>
    </Card>
  );
}

function Riemann() {
  const [n, setN] = useState(4);
  const [sample, setSample] = useState<SamplePoint>("right");
  const [signed, setSigned] = useState(false);
  const { rectangles, step, sum, exact } = riemannSum(n, sample, signed);
  const f = signed ? (x: number) => 2 * x - 1 : (x: number) => x * x;
  const px = (x: number) => 26 + 252 * x;
  const py = (y: number) => 103 - 78 * y;
  return (
    <>
      <Select aria-label="选择被积函数" value={signed ? "signed" : "square"} onChange={(event) => setSigned(event.target.value === "signed")}>
        <option value="square">x²</option><option value="signed">2x − 1</option>
      </Select>
      <svg className="experiment-plot" viewBox="0 0 304 203" role="img" aria-label="曲线与黎曼和取样矩形">
        <path d="M18 103H286 M26 17V186" stroke="currentColor" opacity=".35" />
        {rectangles.map(({ x, height }, index) => (
          <rect key={index} x={px(x)} y={Math.min(py(height), py(0))} width={252 * step}
            height={Math.abs(py(height) - py(0))} fill={height < 0 ? "var(--warning)" : "var(--info)"}
            fillOpacity=".25" stroke={height < 0 ? "var(--warning)" : "var(--info)"} />
        ))}
        <path d={curve(f, 0, 1, px, py)} stroke="var(--nav-text)" strokeWidth="2" fill="none" />
        <text x="20" y="199" fill="currentColor">0</text>
        <text x="274" y="199" fill="currentColor">1</text>
      </svg>
      <label>分割数 n = {n} <input aria-label="分割数" type="range" min="1" max="64" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
      <SegmentedControl label="取样方式" value={sample} items={samples} onChange={(value) => setSample(value as SamplePoint)} />
      <p>矩形和 {fmt(sum)} · 定积分 {signed ? "0" : "1/3"} · 绝对误差 {fmt(Math.abs(sum - exact))}</p>
      {signed && <p>横轴下方的矩形以负值计入积分。</p>}
    </>
  );
}

function Primitive() {
  const [constant, setConstant] = useState(0);
  const px = (x: number) => 153 + 96 * x;
  const py = (y: number) => 128 - 37 * y;
  return (
    <>
      <Formula value={"F(x)=x^2+C,\\quad F'(x)=2x"} />
      <svg className="experiment-plot" viewBox="0 0 304 185" role="img" aria-label="相差积分常数的两条原函数曲线">
        <path d="M15 128H287 M153 16V171" stroke="currentColor" opacity=".35" />
        <path d={curve((x) => x * x, -1.2, 1.2, px, py)} stroke="var(--muted)" strokeDasharray="4 3" fill="none" />
        <path d={curve((x) => x * x + constant, -1.2, 1.2, px, py)} stroke="var(--info)" strokeWidth="2" fill="none" />
      </svg>
      <label>积分常数 C = {constant} <input aria-label="积分常数" type="range" min="-1" max="1" step="0.1" value={constant} onChange={(event) => setConstant(Number(event.target.value))} /></label>
      <p>改变 C 只会让曲线竖直平移。两条曲线在 x = 1 的斜率始终是 2。</p>
    </>
  );
}

function Accumulation() {
  const [x, setX] = useState(0.5);
  const [h, setH] = useState(0.25);
  const px = (t: number) => 151 + 76 * t;
  const py = (y: number) => 151 - 53 * y;
  const f = (t: number) => t * t;
  const start = Math.min(0, x);
  const end = Math.max(0, x);
  const slope = accumulationSlope(x, h);
  return (
    <>
      <Formula value={"A(x)=\\int_0^x t^2\\,dt=\\frac{x^3}{3}"} />
      <svg className="experiment-plot" viewBox="0 0 304 181" role="img" aria-label="从零到积分上限的带符号面积">
        <path d="M17 151H286 M151 17V170" stroke="currentColor" opacity=".35" />
        <path d={curve(f, start, end, px, py) + ' L' + px(end) + ' 151 L' + px(start) + ' 151 Z'} fill={x < 0 ? "var(--warning)" : "var(--info)"} fillOpacity=".32" />
        <path d={curve(f, -1.5, 1.5, px, py)} stroke="var(--nav-text)" strokeWidth="2" fill="none" />
        <circle cx={px(x)} cy={py(f(x))} r="4" fill="var(--info)" />
      </svg>
      <label>上限 x = {x} <input aria-label="积分上限" type="range" min="-1" max="1" step="0.1" value={x} onChange={(event) => setX(Number(event.target.value))} /></label>
      <label>步长 h = {h} <input aria-label="累积差商步长" type="range" min="0" max="0.5" step="0.01" value={h} onChange={(event) => setH(Number(event.target.value))} /></label>
      <p>累积量 A(x) = {fmt(x ** 3 / 3)} · 高度 f(x) = {fmt(f(x))}</p>
      <p>累积差商 {slope === null ? "在 h = 0 时未定义" : fmt(slope)}。将步长缩小，观察它趋向曲线高度。</p>
    </>
  );
}

function curve(f: (x: number) => number, from: number, to: number, px: (x: number) => number, py: (y: number) => number) {
  return Array.from({ length: 49 }, (_, i) => {
    const x = from + (to - from) * i / 48;
    return (i === 0 ? "M" : "L") + px(x) + " " + py(f(x));
  }).join(" ");
}
