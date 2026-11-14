import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  lessons,
  problems,
  checkAnswer,
  experimentValue,
  experimentLimits,
  lessonExperiment,
  secantModels,
  secantSlope,
  type ExperimentKind,
  type SecantKind,
} from "../../data/learning";
import { useLearning } from "../../db/learning";
import Formula from "../../components/Formula";

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
    <section className="learning-card" data-testid="experiment">
      <h2>左右极限逼近实验</h2>
      <label>
        选择函数
        <select
          aria-label="选择实验函数"
          value={kind}
          onChange={(e) => setKind(e.target.value as ExperimentKind)}
        >
          <option value="hole">可去间断：(x² − 1)/(x − 1)</option>
          <option value="sine">第一个重要极限：sin x / x（弧度）</option>
          <option value="euler">第二个重要极限：(1 + x)^(1/x)</option>
          <option value="infinitesimal">等价无穷小：(1 − cos x) / x²</option>
          <option value="jump">跳跃间断：x &lt; 0 时为 0，否则为 1</option>
        </select>
      </label>
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
            stroke="#839fba"
            strokeWidth="3"
          />
        ))}
        <circle
          cx={px(a)}
          cy={py(kind === "jump" ? 0 : lim.left)}
          r="5"
          fill="var(--surface)"
          stroke="#839fba"
          strokeWidth="2"
        />
        {kind === "jump" && (
          <circle cx={px(0)} cy={py(1)} r="5" fill="#839fba" />
        )}
        <circle cx={px(a - h)} cy={py(left)} r="6" fill="#879f53" />
        <circle cx={px(a + h)} cy={py(right)} r="6" fill="#d08b57" />
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
      <p className="learning-note">
        图形和有限次采样用于观察，不代替数学证明。
      </p>
    </section>
  );
}

export function SecantExperiment() {
  const [kind, setKind] = useState<SecantKind>("square");
  const [side, setSide] = useState<"right" | "left">("right");
  const [distance, setDistance] = useState(8);
  const model = secantModels[kind];
  const absH = Number((0.9 * 10 ** (-distance / 15)).toFixed(4));
  const h = side === "right" ? absH : -absH;
  const x1 = model.x0 + h;
  const y1 = model.fn(x1);
  const slope = secantSlope(kind, h)!;
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
    <section className="learning-card" data-testid="secant-experiment">
      <h2>割线与切线逼近实验</h2>
      <label>
        选择函数与定点
        <select
          aria-label="选择导数实验函数"
          value={kind}
          onChange={(e) => setKind(e.target.value as SecantKind)}
        >
          {Object.entries(secantModels).map(([k, v]) => (
            <option key={k} value={k}>
              {v.label}
            </option>
          ))}
        </select>
      </label>
      <div className="lesson-picker" role="group" aria-label="逼近方向">
        <button
          type="button"
          aria-pressed={side === "right"}
          onClick={() => setSide("right")}
        >
          右侧逼近（h &gt; 0）
        </button>
        <button
          type="button"
          aria-pressed={side === "left"}
          onClick={() => setSide("left")}
        >
          左侧逼近（h &lt; 0）
        </button>
      </div>
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
          stroke="#839fba"
          strokeWidth="3"
        />
        <path
          d={`M${px(xmin)},${py(secantY(xmin))} L${px(xmax)},${py(secantY(xmax))}`}
          stroke="#879f53"
          strokeWidth="2.2"
        />
        <path
          d={`M${px(model.x0)},${py(model.y0)} H${px(x1)} V${py(y1)}`}
          fill="none"
          stroke="#d08b57"
          strokeDasharray="3 3"
        />
        <circle cx={px(model.x0)} cy={py(model.y0)} r="5.5" fill="#839fba" />
        <circle cx={px(x1)} cy={py(y1)} r="6" fill="#d08b57" />
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
      <p>
        当 h 从{side === "right" ? "右侧" : "左侧"}趋近 0 时，割线斜率逐渐逼近切线斜率{" "}
        {model.derivative}。在 h = 0 处差商为 0/0 型未定义。
      </p>
      <p className="learning-note">
        图形和有限次采样用于观察，不代替数学证明。
      </p>
    </section>
  );
}

export function CoursePage() {
  const { state, save } = useLearning();
  const [query, setQuery] = useSearchParams();
  const lesson =
    lessons.find((l) => l.id === query.get("lesson")) ||
    lessons.find((l) => l.id === state.lastLesson) ||
    lessons[0];
  const [tab, setTab] = useState("直觉");
  return (
    <div className="page learning-page">
      <h1>课程中心</h1>
      <p>
        第一章 · 函数、极限与连续（5 节）｜第二章 · 导数与微分（1 节） · 已学{" "}
        {state.completed.length} / {lessons.length}
      </p>
      <div className="lesson-picker">
        {lessons.map((l) => (
          <button
            key={l.id}
            aria-pressed={l.id === lesson.id}
            onClick={() => {
              setQuery({ lesson: l.id });
              setTab("直觉");
              save({ ...state, lastLesson: l.id });
            }}
          >
            {state.completed.includes(l.id) ? "✓ " : ""}
            {l.title}
          </button>
        ))}
      </div>
      <section className="learning-card">
        <span className="eyebrow">
          {lesson.chapter === 1
            ? "第一章 · 函数、极限与连续"
            : "第二章 · 导数与微分"}
        </span>
        <h2>{lesson.title}</h2>
        <div className="lesson-tabs" role="tablist" aria-label="学习环节">
          {["直觉", "实验", "定义", "例题", "练习"].map((t) => (
            <button
              role="tab"
              aria-selected={tab === t}
              key={t}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        {tab === "直觉" && <p>{lesson.intuition}</p>}
        {tab === "定义" && (
          <>
            <Formula value={lesson.definition} />
            <p>{lesson.condition}</p>
          </>
        )}
        {tab === "例题" && (
          <>
            <Formula value={lesson.example} />
            <ol>
              {lesson.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <p className="learning-tip">{lesson.takeaway}</p>
          </>
        )}
        {tab === "练习" && (
          <>
            <p>
              本节有 {problems.filter((p) => p.lessonId === lesson.id).length}{" "}
              道基础题。支持数值与分数答案，并提供三级提示及解析。
            </p>
            <Link
              className="primary-button"
              to={`/practice?lesson=${lesson.id}`}
            >
              开始本节练习 →
            </Link>
          </>
        )}
        {tab !== "实验" && (
          <div className="learning-actions">
            <button
              onClick={() =>
                setTab(
                  ["直觉", "实验", "定义", "例题", "练习"][
                    Math.min(
                      4,
                      ["直觉", "实验", "定义", "例题", "练习"].indexOf(tab) + 1,
                    )
                  ],
                )
              }
            >
              下一环节 →
            </button>
            <button
              className="primary-button"
              onClick={() =>
                save({
                  ...state,
                  lastLesson: lesson.id,
                  completed: [...new Set([...state.completed, lesson.id])],
                })
              }
            >
              {state.completed.includes(lesson.id)
                ? "✓ 已完成阅读"
                : "标记已完成阅读"}
            </button>
          </div>
        )}
      </section>
      {tab === "实验" && (
        <>
          {lesson.id === "derivative" ? (
            <SecantExperiment />
          ) : (
            <Experiment
              key={lesson.id}
              initialKind={lessonExperiment[lesson.id] ?? "hole"}
            />
          )}
          <div className="learning-actions">
            <button className="primary-button" onClick={() => setTab("定义")}>
              继续阅读定义 →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export function ExperimentsPage() {
  return (
    <div className="page learning-page">
      <h1>数学实验室</h1>
      <p>改变逼近距离或步长，同时观察函数图形、割线切线与数值变化。</p>
      <Experiment />
      <SecantExperiment />
      <Link className="primary-button" to="/practice">
        观察完了，去练习 →
      </Link>
    </div>
  );
}
export function PracticePage() {
  const [query] = useSearchParams();
  const filtered = problems.filter(
    (p) => !query.get("lesson") || p.lessonId === query.get("lesson"),
  );
  const list = filtered.length ? filtered : problems;
  const initial = Math.max(
    0,
    list.findIndex((p) => p.id === query.get("problem")),
  );
  return (
    <div className="page learning-page">
      <h1>练习中心</h1>
      <p>
        目前开放 {list.length}{" "}
        道预设基础题。只检查最终数值答案，不判断任意推导过程。
      </p>
      <PracticeSet key={query.toString()} list={list} initial={initial} />
    </div>
  );
}
function PracticeSet({
  list,
  initial,
}: {
  list: typeof problems;
  initial: number;
}) {
  const [index, setIndex] = useState(initial);
  return (
    <>
      <div className="lesson-picker">
        {list.map((p, i) => (
          <button
            key={p.id}
            aria-pressed={index === i}
            onClick={() => setIndex(i)}
          >
            第 {i + 1} 题
          </button>
        ))}
      </div>
      <Question key={list[index].id} problem={list[index]} />
    </>
  );
}
function Question({ problem: p }: { problem: (typeof problems)[number] }) {
  const { state, save } = useLearning();
  const [answer, setAnswer] = useState("");
  const [hints, setHints] = useState(0);
  const [result, setResult] = useState<boolean | null>(null);
  const [invalid, setInvalid] = useState(false);
  const submitted = result !== null;
  return (
    <section className="learning-card">
      <h2>{p.title}</h2>
      <Formula value={p.formula} />
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
        <label htmlFor="answer">{p.unit}</label>
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
          <button className="primary-button" disabled={submitted} type="submit">
            检查答案
          </button>
          <button
            type="button"
            disabled={hints === 3 || submitted}
            onClick={() => setHints(hints + 1)}
          >
            给我提示（{hints}/3）
          </button>
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
            <button
              onClick={() => {
                setResult(null);
                setAnswer("");
                setHints(0);
              }}
            >
              再做一次
            </button>
            <Link to={`/curriculum?lesson=${p.lessonId}`}>回到知识点 →</Link>
            <Link to="/review">查看错题 →</Link>
          </div>
        </div>
      )}
    </section>
  );
}
export function ReviewPage() {
  const { state } = useLearning();
  const wrong = problems.filter((p) => {
    const a = state.attempts.filter((a) => a.problemId === p.id);
    return a.length && !a[a.length - 1].correct;
  });
  const correct = state.attempts.filter((a) => a.correct).length;
  return (
    <div className="page learning-page">
      <h1>错题与复习</h1>
      <p>
        累计作答 {state.attempts.length} 次 · 答对 {correct} 次 · 待复习{" "}
        {wrong.length} 题
      </p>
      <section className="learning-card">
        <h2>待复习错题</h2>
        <p>
          按每道题最近一次作答整理；重新答对后会从待复习中移出，历史记录保留。
        </p>
        {wrong.length === 0 ? (
          <p>
            目前没有待复习错题。<Link to="/practice">去做几道题 →</Link>
          </p>
        ) : (
          wrong.map((p) => (
            <article key={p.id} className="review-row">
              <h3>{p.title}</h3>
              <p>{p.errorLabel}</p>
              <div className="learning-actions">
                <Link
                  className="primary-button"
                  to={`/practice?problem=${p.id}`}
                >
                  重新练习
                </Link>
                <Link to={`/curriculum?lesson=${p.lessonId}`}>复习知识点</Link>
              </div>
            </article>
          ))
        )}
      </section>
      <section className="learning-card">
        <h2>最近 20 次作答</h2>
        {state.attempts.length === 0 ? (
          <p>完成第一道练习后，这里会显示你的记录。</p>
        ) : (
          state.attempts
            .slice(-20)
            .reverse()
            .map((a, i) => (
              <div className="review-row" key={`${a.at}-${i}`}>
                <strong>
                  {problems.find((p) => p.id === a.problemId)?.title} ·{" "}
                  {a.correct ? "答对" : "待改进"}
                </strong>
                <p>
                  你的答案：{a.answer} · 使用提示 {a.hints} 次 ·{" "}
                  {new Date(a.at).toLocaleString("zh-CN")}
                </p>
              </div>
            ))
        )}
      </section>
    </div>
  );
}
