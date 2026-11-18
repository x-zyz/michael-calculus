import { useEffect, useRef, useState } from "react";
import type { MathfieldElement } from "mathlive";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Delete } from "lucide-react";
import { Button } from "../../components/ui";
import { formulaAnswerLimit } from "./formulaAnswer";
import "mathlive/fonts.css";

type Key = { label: string; latex: string; name?: string; template?: boolean };

const literal = (latex: string): Key => ({ label: latex, latex });
const command = (label: string, latex: string, name?: string): Key => ({ label, latex, name });
const template = (label: string, latex: string, name: string): Key => ({ label, latex, name, template: true });
const R = String.raw;

const layouts: Record<string, Key[]> = {
  "123": [
    template("□/□", R`\frac{#?}{#?}`, "分数"),
    template("xⁿ", "^{#?}", "乘方"),
    template("√", R`\sqrt{#?}`, "根号"),
    template("lim", R`\lim_{#?}`, "极限"),
    command("→", R`\to`, "趋向"),
    command("′", "'", "导数符号"),
    ...["7", "8", "9", "(", ")", "x", "4", "5", "6", "+", "-", "f", "1", "2", "3", "=", "h", "e", "0"].map(literal),
    command("sin", R`\sin`),
    command("cos", R`\cos`),
    command("ln", R`\ln`),
    template("xₙ", "_{#?}", "下标"),
    command("∞", R`\infty`, "无穷"),
  ],
  "f(x)": [
    command("∫", "\\int", "不定积分"),
    template("∫ₐᵇ", "\\int_{#?}^{#?}", "带上下限的积分"),
    ...["sin", "cos", "tan", "cot", "sec", "csc", "ln", "arcsin", "arctan"].map((name) => command(name, "\\" + name)),
    template("lim", R`\lim_{#?}`, "极限"),
    template("□/□", R`\frac{#?}{#?}`, "分数"),
    template("√", R`\sqrt{#?}`, "根号"),
  ],
  "abc": Array.from("abcdefghijklmnopqrstuvwxyzACFLRSV").map(literal),
  "αβ": [
    ...[">", "<", ",", ":", "/", "=", "+", "-"].map(literal),
    command("α", R`\alpha`), command("π", R`\pi`), command("ξ", R`\xi`),
    command("±", R`\pm`), command("≈", R`\approx`), command("∼", R`\sim`),
    command("∞", R`\infty`), command("⇒", R`\Rightarrow`),
    command("∃", R`\exists`), command("∈", R`\in`), command("→", R`\to`),
  ],
};

const phrases = ["严格递增", "严格递减", "极大值", "极小值", "为严格极小值点", "为严格极大值点"];

export default function MathAnswer({ onSubmit, onSkip }: {
  onSubmit: (answer: string) => void;
  onSkip: () => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const field = useRef<MathfieldElement | null>(null);
  const [layout, setLayout] = useState("123");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let disposed = false;
    let element: MathfieldElement | undefined;
    import("mathlive").then(({ MathfieldElement }) => {
      if (disposed || !host.current) return;
      MathfieldElement.fontsDirectory = null;
      MathfieldElement.soundsDirectory = null;
      element = new MathfieldElement();
      element.mathVirtualKeyboardPolicy = "manual";
      element.smartFence = false;
      element.smartSuperscript = false;
      element.className = "fm-mathfield";
      element.setAttribute("aria-label", "公式答案");
      element.setAttribute("aria-describedby", "fm-editor-help");
      element.addEventListener("input", () => setAnswer(element!.value));
      host.current.append(element);
      field.current = element;
      setStatus("ready");
    }).catch(() => {
      if (!disposed) setStatus("error");
    });
    return () => {
      disposed = true;
      field.current = null;
      element?.remove();
    };
  }, []);

  function edit(action: (element: MathfieldElement) => void) {
    const element = field.current;
    if (!element) return;
    element.focus();
    action(element);
    setAnswer(element.value);
  }

  function insert(key: Key) {
    edit((element) => element.insert(key.latex, {
      format: "latex",
      selectionMode: key.template ? "placeholder" : "after",
    }));
  }

  const ready = answer.trim().length > 0 && answer.length <= formulaAnswerLimit &&
    !answer.includes(R`\placeholder`);

  return (
    <form className="fm-math-answer" onSubmit={(event) => {
      event.preventDefault();
      if (ready) onSubmit(answer);
    }}>
      <div ref={host} />
      <p id="fm-editor-help">
        {status === "error" ? "公式输入加载失败，请退出本轮后重试。" :
          status === "loading" ? "正在加载数学键盘…" : "点公式内的位置可直接修改，也可以用方向键移动。"}
      </p>
      <div className="fm-keyboard-toolbar">
        <div className="fm-keyboard-groups" role="group" aria-label="数学键盘分类">
          {Object.keys(layouts).map((name) => (
            <Button key={name} aria-pressed={layout === name} onClick={() => setLayout(name)}>{name}</Button>
          ))}
        </div>
        <Button aria-label="退格" disabled={status !== "ready"} onClick={() => edit((element) => element.executeCommand("deleteBackward"))}>
          <Delete size={18} aria-hidden="true" />
        </Button>
      </div>
      <div className="fm-keyboard-keys" role="group" aria-label="数学键盘">
        {layouts[layout].map((key) => (
          <Button key={key.label} aria-label={key.name} disabled={status !== "ready"} onClick={() => insert(key)}>
            {key.label}
          </Button>
        ))}
      </div>
      {layout === "αβ" && (
        <div className="fm-keyboard-groups" role="group" aria-label="定理用语">
          {phrases.map((word) => (
            <Button key={word} onClick={() => insert(command(word, R`\text{${word}}`))}>{word}</Button>
          ))}
        </div>
      )}
      <div className="fm-keyboard-toolbar" role="group" aria-label="移动光标">
        <div className="fm-keyboard-groups">
          {([
            ["向左", ArrowLeft, "moveToPreviousChar"],
            ["向上", ArrowUp, "moveUp"],
            ["向下", ArrowDown, "moveDown"],
            ["向右", ArrowRight, "moveToNextChar"],
          ] as const).map(([name, Icon, action]) => (
            <Button key={name} aria-label={name} disabled={status !== "ready"} onClick={() => edit((element) => element.executeCommand(action))}>
              <Icon size={18} aria-hidden="true" />
            </Button>
          ))}
        </div>
        <Button variant="ghost" disabled={!answer} onClick={() => edit((element) => { element.value = ""; })}>清空</Button>
      </div>
      {answer.length > formulaAnswerLimit && <p role="alert">公式过长，请删去多余内容。</p>}
      <div className="learning-actions">
        <Button variant="primary" type="submit" disabled={!ready}>提交答案</Button>
        <Button onClick={onSkip}>跳过并看答案</Button>
      </div>
    </form>
  );
}
