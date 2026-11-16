import { useRef, useState } from "react";
import Formula from "../../components/Formula";
import { Button, TextInput } from "../../components/ui";
import { formulaAnswerLimit } from "./formulaAnswer";

const groups = {
  常用: [
    ...["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "x", "=", "+", "-", "(", ")", "'", "/"].map(key),
    { label: "分数", insert: "\\frac{□}{□}" },
    { label: "乘方", insert: "^{□}" },
    { label: "下标", insert: "_{□}" },
    { label: "根号", insert: "\\sqrt{□}" },
    { label: "极限", insert: "\\lim_{□}" },
    { label: "趋向 →", insert: "\\to " },
  ],
  函数: ["sin", "cos", "tan", "cot", "sec", "csc", "ln", "arcsin", "arctan"]
    .map((name) => ({ label: name, insert: "\\" + name + " " })),
  字母: [
    ...Array.from("abcdefghntuvxyC").map(key),
    { label: "α", insert: "\\alpha " },
    { label: "π", insert: "\\pi " },
    { label: "ξ", insert: "\\xi " },
  ],
  符号: [
    ...[">", "<", ",", ":"].map(key),
    { label: "±", insert: "\\pm " },
    { label: "≈", insert: "\\approx " },
    { label: "∼", insert: "\\sim " },
    { label: "∞", insert: "\\infty " },
    { label: "⇒", insert: "\\Rightarrow " },
    { label: "∃", insert: "\\exists " },
    { label: "∈", insert: "\\in " },
    { label: "换行", insert: "\\\\" },
    ...["严格递增", "严格递减", "极大值", "极小值", "为严格极小值点", "为严格极大值点"]
      .map((word) => ({ label: word, insert: `\\text{${word}}` })),
  ],
};

function key(value: string) {
  return { label: value, insert: value };
}

type Group = keyof typeof groups;

export default function MathAnswer({
  onSubmit,
  onSkip,
}: {
  onSubmit: (answer: string) => void;
  onSkip: () => void;
}) {
  const [answer, setAnswer] = useState("");
  const [group, setGroup] = useState<Group>("常用");
  const editor = useRef<HTMLDivElement>(null);
  const input = () => editor.current?.querySelector("input");

  function select(from: number, to = from) {
    const field = input();
    field?.focus({ preventScroll: true });
    field?.setSelectionRange(from, to);
  }

  function replace(insert: string, erase = false) {
    const field = input();
    if (!field) return;
    const start = field.selectionStart ?? answer.length;
    const end = field.selectionEnd ?? start;
    const from = erase && start === end ? Math.max(0, start - 1) : start;
    const next = answer.slice(0, from) + insert + answer.slice(end);
    if (next.length > formulaAnswerLimit) return;
    setAnswer(next);
    const placeholder = insert.indexOf("□");
    const caret = from + (placeholder < 0 ? insert.length : placeholder);
    requestAnimationFrame(() => select(caret, caret + (placeholder < 0 ? 0 : 1)));
  }

  function moveToSlot() {
    const end = input()?.selectionEnd ?? 0;
    const next = answer.indexOf("□", end);
    const position = next < 0 ? answer.indexOf("□") : next;
    if (position >= 0) select(position, position + 1);
    else select(answer.length);
  }

  const ready = Boolean(answer.trim()) && !answer.includes("□");

  return (
    <form className="fm-math-answer" onSubmit={(event) => {
      event.preventDefault();
      if (ready) onSubmit(answer);
    }}>
      <div ref={editor}>
        <TextInput
          aria-label="公式答案"
          aria-describedby="fm-keyboard-help"
          inputMode="none"
          autoComplete="off"
          spellCheck={false}
          maxLength={formulaAnswerLimit}
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
        />
      </div>
      <p id="fm-keyboard-help">用数学键盘输入。分数等模板的 □ 填完后，点「下一空」或「移到末尾」。</p>
      {answer && <div className="fm-answer-preview" aria-label="公式预览">
        <Formula value={String.raw`\begin{gathered}${answer.replaceAll("□", "\\Box ")}\end{gathered}`} />
      </div>}
      <div className="fm-keyboard-groups" role="group" aria-label="数学键盘分类">
        {(Object.keys(groups) as Group[]).map((name) => (
          <Button key={name} type="button" variant="secondary" aria-pressed={group === name} onClick={() => setGroup(name)}>
            {name}
          </Button>
        ))}
      </div>
      <div className="fm-keyboard-keys" role="group" aria-label="数学键盘">
        {groups[group].map(({ label, insert }) => (
          <Button key={label} type="button" variant="secondary" onMouseDown={(event) => event.preventDefault()} onClick={() => replace(insert)}>
            {label}
          </Button>
        ))}
      </div>
      <div className="fm-keyboard-groups" role="group" aria-label="编辑公式">
        <Button type="button" onClick={moveToSlot}>下一空</Button>
        <Button type="button" onClick={() => select(answer.length)}>移到末尾</Button>
        <Button type="button" onClick={() => replace("", true)}>退格</Button>
        <Button type="button" onClick={() => { setAnswer(""); select(0); }}>清空</Button>
      </div>
      <div className="learning-actions">
        <Button variant="primary" type="submit" disabled={!ready}>提交答案</Button>
        <Button type="button" onClick={onSkip}>跳过并看答案</Button>
      </div>
    </form>
  );
}
