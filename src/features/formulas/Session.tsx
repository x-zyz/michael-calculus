import { useState } from "react";
import { Link } from "react-router-dom";
import { useLearning } from "../../db/learning";
import { useFormulas } from "../../db/formulas";
import { formulaById } from "../../data/formulas";
import { problems } from "../../data/learning";
import Formula from "../../components/Formula";
import { Button, Card } from "../../components/ui";
import {
  addDays,
  cardById,
  choices,
  level,
  localDay,
  recordReview,
  type ErrorTag,
  type FormulaStore,
  type QueueItem,
  type Result,
} from "./engine";
import TagPicker from "./TagPicker";
export default function Session({
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
      <Card role="status">
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
        <Button variant="primary" onClick={onExit}>
          返回公式中心 / 再来一轮
        </Button>
      </Card>
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
    <Card className="fm-session">
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
          <Button variant="primary" onClick={() => setRevealed(true)}>
            显示答案
          </Button>
        </>
      )}
      {card.kind === "recognize" &&
        choices(f.id).map((id) => (
          <Button
            className="fm-option"
            aria-label={`选择公式：${formulaById.get(id)!.name}`}
            key={id}
            disabled={selected !== null}
            onClick={() => choose(id, id === f.id)}
          >
            <span>{formulaById.get(id)!.name}</span>
            <Formula value={formulaById.get(id)!.latex} />
          </Button>
        ))}
      {card.kind === "condition" &&
        f.conditionQuiz!.options.map((text, i) => (
          <Button
            className="fm-option"
            disabled={selected !== null}
            key={text}
            onClick={() => choose(String(i), i === f.conditionQuiz!.correct)}
          >
            {text}
          </Button>
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
              <Button variant="primary" onClick={() => commit(autoResult!)}>
                记录并继续
              </Button>
            </>
          ) : pending ? (
            <>
              <TagPicker tags={tags} setTags={setTags} />
              <Button variant="primary" onClick={() => commit(pending)}>
                保存并继续（错因可跳过）
              </Button>
            </>
          ) : (
            <div className="fm-actions">
              {(
                [
                  ["forgot", "忘记了"],
                  ["fuzzy", "模糊"],
                  ["good", "记住了"],
                ] as const
              ).map(([result, label]) => (
                <Button
                  key={result}
                  variant={result === "forgot" ? "danger" : "secondary"}
                  className={`fm-rating-${result}`}
                  onClick={() =>
                    result === "good" ? commit(result) : setPending(result)
                  }
                >
                  {label}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="learning-actions">
        <Button onClick={onExit}>结束本轮（已记录的结果会保留）</Button>
      </div>
    </Card>
  );
}
