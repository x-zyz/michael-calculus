import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Formula from "../../components/Formula";
import { formulas, formulaById } from "../../data/formulas";
import { problems } from "../../data/learning";
import { useLearning } from "../../db/learning";
import { useFormulas } from "../../db/formulas";
import {
  addDays,
  cardById,
  choices,
  counters,
  errorTags,
  evidence,
  level,
  localDay,
  markStuck,
  queue,
  recordReview,
  type ErrorTag,
  type FormulaStore,
  type QueueItem,
  type QueueMode,
  type Result,
} from "./engine";

export function ReviewNavigation() {
  return (
    <nav className="lesson-picker" aria-label="复习分类">
      <Link to="/review">错题</Link>
      <Link to="/review/formulas">公式</Link>
    </nav>
  );
}
export function TodayFormulas() {
  const { store } = useFormulas();
  const counts = counters(store);
  return (
    <section className="learning-card fm-today">
      <h2>今日公式</h2>
      <p>
        今日到期 {counts.due} 张 · 今日新学 {counts.newToday} 个 · 薄弱{" "}
        {counts.weak} 个
      </p>
      <Link className="primary-button" to="/review/formulas">
        开始公式复习 →
      </Link>
    </section>
  );
}
export function StuckButton({ problemId }: { problemId: string }) {
  const { store, save } = useFormulas();
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const p = problems.find((p) => p.id === problemId)!;
  return p.formulaIds?.length ? (
    <div className="fm-stuck">
      <button
        type="button"
        onClick={() => {
          setOpen(!open);
          setDone(false);
        }}
      >
        卡在公式上了
      </button>
      {open && (
        <fieldset>
          <legend>确认是哪一个公式？</legend>
          {p.formulaIds.map((id) => (
            <button
              type="button"
              key={id}
              onClick={() => {
                save(markStuck(store, id, problemId));
                setOpen(false);
                setDone(true);
              }}
            >
              {formulaById.get(id)?.name}
            </button>
          ))}
        </fieldset>
      )}
      {done && (
        <p role="status">
          已加入今日公式复习。<Link to="/review/formulas">去复习 →</Link>
        </p>
      )}
    </div>
  ) : null;
}
export default function FormulaPages() {
  const { store, save, storageError } = useFormulas();
  const { state } = useLearning();
  const [query, setQuery] = useSearchParams();
  const selected = formulaById.get(query.get("formula") || "");
  const [mode, setMode] = useState<QueueMode>("due");
  const [session, setSession] = useState<{
    items: QueueItem[];
    baseline: FormulaStore;
  } | null>(null);
  const counts = counters(store);
  const lesson = query.get("lesson");
  const available = formulas.filter((f) => !lesson || f.lessonId === lesson);
  function start() {
    const items = queue(store, mode, state.attempts);
    setSession({
      items: lesson
        ? items.filter(
            (i) =>
              formulaById.get(cardById.get(i.cardId)!.formulaId)?.lessonId ===
              lesson,
          )
        : items,
      baseline: store,
    });
  }
  return (
    <div className="page learning-page fm">
      <h1>公式记忆中心</h1>
      <ReviewNavigation />
      {storageError && (
        <p role="alert" className="storage-alert">
          公式记录无法保存，退出后可能丢失。请检查设备存储空间。
        </p>
      )}
      {session ? (
        <Session
          key={session.baseline.reviews.length + "-" + mode}
          initial={session.items}
          baseline={session.baseline}
          onExit={() => setSession(null)}
        />
      ) : selected ? (
        <section className="learning-card">
          <button onClick={() => setQuery(lesson ? { lesson } : {})}>
            ← 返回公式列表
          </button>
          <h2>
            {selected.name} · L{level(selected.id, store, state.attempts)}
          </h2>
          <Formula value={selected.latex} />
          <p>适用条件：{selected.conditions}</p>
          <ul>
            {selected.pitfalls.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <h3>升级所需证据（从 L0 起逐级满足）</h3>
          {evidence(selected.id, store, state.attempts).map((e) => (
            <p key={e.name}>
              <strong>
                {e.met ? "✓" : "○"} {e.name}
              </strong>
              ：{e.detail}
            </p>
          ))}
          <ol>
            <li>L1：任一卡片完成一次复习。</li>
            <li>L2：全部填空卡最近一次为“记住了”。</li>
            <li>L3：两个不同日期完整默写记住；最近一次不能为“忘记了”。</li>
            <li>L4：条件判断最近一次答对；没有条件卡则沿用 L3。</li>
            <li>
              L5：两个不同日期识别答对，最近识别正确；14
              天内没有卡住记录；有关联练习时最近一次作答正确。
            </li>
          </ol>
          <p>
            当前 L{level(selected.id, store, state.attempts)}
            ；尚未满足的下一等级，请完成上面的对应证据。自评不是机器验证的默写结果。
          </p>
          <div className="learning-actions">
            {selected.lessonId && (
              <Link to={`/curriculum?lesson=${selected.lessonId}`}>
                关联课程 →
              </Link>
            )}
            {problems
              .filter((p) => p.formulaIds?.includes(selected.id))
              .map((p) => (
                <Link key={p.id} to={`/practice?problem=${p.id}`}>
                  {p.title} →
                </Link>
              ))}
          </div>
          <h3>最近 10 次记录</h3>
          {store.reviews
            .filter((r) => cardById.get(r.cardId)?.formulaId === selected.id)
            .slice(-10)
            .reverse()
            .map((r, i) => (
              <p key={i}>
                {new Date(r.at).toLocaleString()} ·{" "}
                {cardById.get(r.cardId)?.kind} ·{" "}
                {r.result === "good"
                  ? "记住/答对"
                  : r.result === "fuzzy"
                    ? "模糊"
                    : "忘记/答错"}{" "}
                {r.errorTags.map((t) => errorTags[t]).join("、")}
              </p>
            ))}
          {!store.reviews.some(
            (r) => cardById.get(r.cardId)?.formulaId === selected.id,
          ) && <p>还没有复习记录。</p>}
        </section>
      ) : (
        <>
          <section className="learning-card">
            <div className="experiment-values">
              <div>
                今日到期<strong>{counts.due} 张</strong>
              </div>
              <div>
                今日新学<strong>{counts.newToday} 个公式</strong>
              </div>
              <div>
                薄弱<strong>{counts.weak} 个公式</strong>
              </div>
            </div>
            {counts.due > 40 && (
              <p role="status">先清 20 张最久没复习的，暂时暂停加入新公式。</p>
            )}
            <label htmlFor="formula-mode">复习模式</label>
            <select
              id="formula-mode"
              value={mode}
              onChange={(e) => setMode(e.target.value as QueueMode)}
            >
              <option value="due">今日复习</option>
              <option value="cloze">填空</option>
              <option value="recall">完整默写</option>
              <option value="spot">随机抽查（L3 及以上）</option>
              <option value="recognize">反向识别</option>
            </select>
            <label htmlFor="new-per-day">每天最多加入的新公式（0–20）</label>
            <input
              id="new-per-day"
              type="number"
              min="0"
              max="20"
              value={store.settings.newPerDay}
              onChange={(e) => {
                const n = Number(e.target.value);
                if (Number.isInteger(n) && n >= 0 && n <= 20)
                  save({ ...store, settings: { newPerDay: n } });
              }}
            />
            <button className="primary-button" onClick={start}>
              开始今日复习
            </button>
            <p className="learning-note">
              每轮最多 20
              张不同卡片；忘记的卡片在本轮末尾再出现一次。可做完再来一轮。默写在纸上或心里进行，翻开后自评。
            </p>
          </section>
          {lesson && (
            <p>
              当前仅查看本节公式。<Link to="/review/formulas">查看全部</Link>
            </p>
          )}
          {[1, 2, 3].map((chapter) => {
            const list = available.filter((f) => f.chapter === chapter);
            if (!list.length) return null;
            const distribution = Array.from(
              { length: 6 },
              (_, i) =>
                list.filter((f) => level(f.id, store, state.attempts) === i)
                  .length,
            );
            return (
              <details
                key={chapter}
                open={Boolean(lesson)}
                className="learning-card"
              >
                <summary>
                  第{chapter}章 · {list.length} 个公式
                </summary>
                <div
                  className="fm-distribution"
                  aria-label={`第${chapter}章等级分布`}
                >
                  {distribution.map((n, i) => (
                    <span key={i}>
                      L{i}: {n}
                    </span>
                  ))}
                </div>
                {list.map((f) => (
                  <article className="review-row" key={f.id}>
                    <button
                      className="fm-title"
                      onClick={() =>
                        setQuery({
                          ...(lesson ? { lesson } : {}),
                          formula: f.id,
                        })
                      }
                    >
                      {f.name} · L{level(f.id, store, state.attempts)}
                    </button>
                    <Formula value={f.latex} />
                  </article>
                ))}
              </details>
            );
          })}
        </>
      )}
    </div>
  );
}
function Session({
  initial,
  baseline,
  onExit,
}: {
  initial: QueueItem[];
  baseline: FormulaStore;
  onExit: () => void;
}) {
  const { store, save } = useFormulas();
  const { state } = useLearning();
  const [items, setItems] = useState(initial);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [pending, setPending] = useState<Result | null>(null);
  const [tags, setTags] = useState<ErrorTag[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [repeated, setRepeated] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [autoResult, setAutoResult] = useState<Result | null>(null);
  function next() {
    setIndex(index + 1);
    setRevealed(false);
    setPending(null);
    setTags([]);
    setSelected(null);
    setAutoResult(null);
  }
  function commit(result: Result) {
    const item = items[index];
    save(recordReview(store, item.cardId, result, item.mode, tags));
    setResults([...results, result]);
    if (result === "forgot" && !repeated.includes(item.cardId)) {
      setItems([...items, item]);
      setRepeated([...repeated, item.cardId]);
    }
    next();
  }
  if (index >= items.length) {
    const touched = [
      ...new Set(items.map((i) => cardById.get(i.cardId)!.formulaId)),
    ];
    const changes = touched
      .map((id) => ({
        id,
        before: level(id, baseline, state.attempts),
        after: level(id, store, state.attempts),
      }))
      .filter((x) => x.before !== x.after);
    return (
      <section className="learning-card" role="status">
        <h2>本轮小结</h2>
        {results.length ? (
          <p>
            已完成 {results.length} 次复习 · 记住/答对率{" "}
            {Math.round(
              (results.filter((r) => r === "good").length / results.length) *
                100,
            )}
            %（含自评）
          </p>
        ) : (
          <p>
            当前模式没有可复习的卡片。随机抽查需要
            L3；可以切换模式或返回明天再复习。
          </p>
        )}
        <p>
          明天到期{" "}
          {
            Object.values(store.cards).filter(
              (c) => c.due === addDays(localDay(), 1),
            ).length
          }{" "}
          张
        </p>
        {changes.length ? (
          changes.map((c) => (
            <p key={c.id}>
              {formulaById.get(c.id)?.name}：L{c.before} → L{c.after}
            </p>
          ))
        ) : (
          <p>本轮没有公式等级变化，等级需要逐级及跨日证据。</p>
        )}
        <button className="primary-button" onClick={onExit}>
          返回公式中心 / 再来一轮
        </button>
      </section>
    );
  }
  const item = items[index],
    card = cardById.get(item.cardId)!,
    f = formulaById.get(card.formulaId)!;
  const automatic = card.kind === "condition" || card.kind === "recognize";
  const problem = problems.find((p) => p.id === card.problemId);
  function choose(id: string, correct: boolean) {
    if (selected !== null) return;
    setSelected(id);
    setAutoResult(correct ? "good" : "forgot");
    setRevealed(true);
  }
  return (
    <section className="learning-card fm-session">
      <p>
        第 {index + 1} / {items.length} 张 · 第{f.chapter}章 · {f.group}
      </p>
      <h2>
        {f.name} ·{" "}
        {card.kind === "cloze"
          ? "填空"
          : card.kind === "recall"
            ? "完整默写"
            : card.kind === "condition"
              ? "条件判断"
              : "反向识别"}
      </h2>
      {card.kind === "cloze" && <Formula value={f.cloze[card.index!].latex} />}
      {card.kind === "recall" && (
        <p>请写出“{f.name}”的完整标准式，并注明条件。</p>
      )}
      {card.kind === "recognize" && (
        <>
          <p>这道题首选哪个公式？</p>
          <Formula value={problem!.formula} />
        </>
      )}
      {card.kind === "condition" && <p>{f.conditionQuiz!.question}</p>}
      {!automatic && !revealed && (
        <>
          <p>先在纸上写完整，再看答案。</p>
          <button className="primary-button" onClick={() => setRevealed(true)}>
            显示答案
          </button>
        </>
      )}
      {card.kind === "recognize" &&
        choices(f.id).map((id) => (
          <button
            className="fm-option"
            aria-label={`选择公式：${formulaById.get(id)!.name}`}
            key={id}
            disabled={selected !== null}
            onClick={() => choose(id, id === f.id)}
          >
            <span>{formulaById.get(id)!.name}</span>
            <Formula value={formulaById.get(id)!.latex} />
          </button>
        ))}
      {card.kind === "condition" &&
        f.conditionQuiz!.options.map((text, i) => (
          <button
            className="fm-option"
            disabled={selected !== null}
            key={text}
            onClick={() => choose(String(i), i === f.conditionQuiz!.correct)}
          >
            {text}
          </button>
        ))}
      {revealed && (
        <div className="answer-feedback">
          <h3>
            {automatic
              ? autoResult === "good"
                ? "选择正确"
                : "这次选错了"
              : "标准答案"}
          </h3>
          <Formula value={f.latex} />
          {card.kind === "cloze" && (
            <Formula value={f.cloze[card.index!].answer} />
          )}
          <p>适用条件：{f.conditions}</p>
          <ul>
            {f.pitfalls.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          {card.kind === "recognize" && (
            <>
              <p>
                题目首选“{f.name}
                ”。请先核对上述条件，再完成相关运算；不代表只能使用这一种解法。
              </p>
              <Link to={`/practice?problem=${problem!.id}`}>
                去做关联练习 →
              </Link>
            </>
          )}
          {automatic ? (
            <>
              <p>选项由程序判分，不能手动把答错改为记住。</p>
              {autoResult === "forgot" && (
                <TagPicker tags={tags} setTags={setTags} />
              )}
              <button
                className="primary-button"
                onClick={() => commit(autoResult!)}
              >
                记录并继续
              </button>
            </>
          ) : pending ? (
            <>
              <TagPicker tags={tags} setTags={setTags} />
              <button
                className="primary-button"
                onClick={() => commit(pending)}
              >
                保存并继续（错因可跳过）
              </button>
            </>
          ) : (
            <div className="learning-actions">
              {(
                [
                  ["forgot", "忘记了"],
                  ["fuzzy", "模糊"],
                  ["good", "记住了"],
                ] as const
              ).map(([result, label]) => (
                <button
                  key={result}
                  onClick={() =>
                    result === "good" ? commit(result) : setPending(result)
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="learning-actions">
        <button onClick={onExit}>结束本轮（已记录的结果会保留）</button>
      </div>
    </section>
  );
}
function TagPicker({
  tags,
  setTags,
}: {
  tags: ErrorTag[];
  setTags: (t: ErrorTag[]) => void;
}) {
  return (
    <fieldset>
      <legend>错因（可多选，也可跳过）</legend>
      {Object.entries(errorTags).map(([key, label]) => (
        <label className="fm-tag" key={key}>
          <input
            type="checkbox"
            checked={tags.includes(key as ErrorTag)}
            onChange={() =>
              setTags(
                tags.includes(key as ErrorTag)
                  ? tags.filter((t) => t !== key)
                  : [...tags, key as ErrorTag],
              )
            }
          />
          {label}
        </label>
      ))}
    </fieldset>
  );
}
