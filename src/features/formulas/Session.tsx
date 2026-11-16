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
import MathAnswer from "./MathAnswer";
import { matchesFormula } from "./formulaAnswer";
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
  const [tags, setTags] = useState<ErrorTag[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [repeated, setRepeated] = useState<string[]>([]);
  const [grade, setGrade] = useState<Result | null>(null);
  function next() {
    setIndex(index + 1);
    setTags([]);
    setGrade(null);
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
            已完成 {results.length} 次复习 · 答对率{" "}
            {Math.round(
              (results.filter((r) => r === "good").length / results.length) *
                100,
            )}
            %
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
        <p>请写出“{f.name}”的完整公式。适用条件在讲解中查看。</p>
      )}
      {card.kind === "recognize" && (
        <>
          <p>这道题首选哪个公式？</p>
          <Formula value={problem!.formula} />
        </>
      )}
      {card.kind === "condition" && <p>{f.conditionQuiz!.question}</p>}
      {!automatic && grade === null && (
        <MathAnswer
          onSubmit={(answer) => {
            const expected = card.kind === "cloze" ? f.cloze[card.index!].answer : f.latex;
            setGrade(matchesFormula(answer, expected, card.kind === "cloze") ? "good" : "forgot");
          }}
          onSkip={() => setGrade("forgot")}
        />
      )}
      {card.kind === "recognize" &&
        choices(f.id).map((id) => (
          <Button
            className="fm-option"
            aria-label={`选择公式：${formulaById.get(id)!.name}`}
            key={id}
            disabled={grade !== null}
            onClick={() => setGrade(id === f.id ? "good" : "forgot")}
          >
            <span>{formulaById.get(id)!.name}</span>
            <Formula value={formulaById.get(id)!.latex} />
          </Button>
        ))}
      {card.kind === "condition" &&
        f.conditionQuiz!.options.map((text, i) => (
          <Button
            className="fm-option"
            disabled={grade !== null}
            key={text}
            onClick={() => setGrade(i === f.conditionQuiz!.correct ? "good" : "forgot")}
          >
            {text}
          </Button>
        ))}
      {grade !== null && (
        <div className="answer-feedback">
          <h3>
            {automatic
              ? grade === "good"
                ? "选择正确"
                : "这次选错了"
              : grade === "good" ? "公式正确" : "答案未匹配"}
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
          {grade === "forgot" && <TagPicker tags={tags} setTags={setTags} />}
          <Button variant="primary" onClick={() => commit(grade)}>
            记录并继续
          </Button>
        </div>
      )}
      <div className="learning-actions">
        <Button onClick={onExit}>结束本轮（已记录的结果会保留）</Button>
      </div>
    </Card>
  );
}
