import katex from "katex";
import "katex/dist/katex.min.css";

const SUP_MAP: Record<string, string> = {
  "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4",
  "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9",
  "ⁿ": "n", "ˣ": "x", "ʸ": "y", "ᵘ": "u", "⁻": "-", "⁺": "+",
};
const SUB_MAP: Record<string, string> = {
  "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4",
  "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9",
  "ₙ": "n", "ₓ": "x", "ᵢ": "i", "ₖ": "k",
};

function stripOuterParens(s: string): string {
  const t = s.trim();
  if (t.length >= 2 && t[0] === "(" && t[t.length - 1] === ")") {
    let depth = 0;
    for (let i = 0; i < t.length; i++) {
      if (t[i] === "(") depth++;
      else if (t[i] === ")") depth--;
      if (depth === 0 && i < t.length - 1) return t;
    }
    return t.slice(1, -1).trim();
  }
  return t;
}

function findAtomLeft(s: string, end: number): number {
  let i = end - 1;
  while (i >= 0 && s[i] === " ") i--;
  if (i < 0) return end;
  while (i >= 0) {
    const ch = s[i];
    if (ch === ")" || ch === "]" || ch === "}") {
      const open = ch === ")" ? "(" : ch === "]" ? "[" : "{";
      let depth = 0;
      let j = i;
      while (j >= 0) {
        if (s[j] === ch) depth++;
        else if (s[j] === open) depth--;
        if (depth === 0) break;
        j--;
      }
      if (j < 0) return i + 1;
      i = j - 1;
      while (i >= 0 && /[a-zA-Z0-9\\'_]/.test(s[i])) i--;
      if (i >= 0 && (s[i] === "^" || s[i] === "_")) {
        i--;
        continue;
      }
      return i + 1;
    }
    if (/[a-zA-Z0-9.\\'_]/.test(ch)) {
      while (i >= 0 && /[a-zA-Z0-9.\\'_]/.test(s[i])) i--;
      if (i >= 0 && (s[i] === "^" || s[i] === "_")) {
        i--;
        continue;
      }
      return i + 1;
    }
    break;
  }
  return i + 1;
}

function findAtomRight(s: string, start: number): number {
  let i = start;
  const n = s.length;
  while (i < n && s[i] === " ") i++;
  if (i >= n) return start;
  if (s[i] === "-" || s[i] === "+") i++;
  if (s[i] === "\\") {
    i++;
    while (i < n && /[a-zA-Z]/.test(s[i])) i++;
    while (i < n && s[i] === " ") i++;
  }
  if (i < n && (s[i] === "(" || s[i] === "[" || s[i] === "{")) {
    const open = s[i];
    const close = open === "(" ? ")" : open === "[" ? "]" : "}";
    let depth = 0;
    while (i < n) {
      if (s[i] === open) depth++;
      else if (s[i] === close) depth--;
      i++;
      if (depth === 0) break;
    }
  } else {
    while (i < n && /[a-zA-Z0-9.']/.test(s[i])) i++;
    if (i < n && s[i] === "(") {
      let depth = 0;
      while (i < n) {
        if (s[i] === "(") depth++;
        else if (s[i] === ")") depth--;
        i++;
        if (depth === 0) break;
      }
    }
  }
  while (i < n && (s[i] === "^" || s[i] === "_")) {
    i++;
    if (i < n && s[i] === "{") {
      let depth = 0;
      while (i < n) {
        if (s[i] === "{") depth++;
        else if (s[i] === "}") depth--;
        i++;
        if (depth === 0) break;
      }
    } else if (i < n && s[i] === "(") {
      let depth = 0;
      while (i < n) {
        if (s[i] === "(") depth++;
        else if (s[i] === ")") depth--;
        i++;
        if (depth === 0) break;
      }
    } else {
      while (i < n && /[a-zA-Z0-9]/.test(s[i])) i++;
    }
  }
  return i;
}

function convertFractionsAndPowers(input: string): string {
  let s = input;
  for (let pass = 0; pass < 8; pass++) {
    const slash = s.indexOf("/");
    if (slash === -1) break;
    const leftStart = findAtomLeft(s, slash);
    const rightEnd = findAtomRight(s, slash + 1);
    const num = stripOuterParens(s.slice(leftStart, slash));
    const den = stripOuterParens(s.slice(slash + 1, rightEnd));
    if (!num || !den) break;
    s = `${s.slice(0, leftStart)}\\frac{${num}}{${den}}${s.slice(rightEnd)}`;
  }
  s = s.replace(/\^(\((?:[^()]|\([^()]*\))*\)|\\[a-zA-Z]+|[a-zA-Z0-9+-]+)/g, (_, exp: string) => {
    return `^{${stripOuterParens(exp)}}`;
  });
  return s;
}

// eslint-disable-next-line react-refresh/only-export-components
export function asciiMathToLatex(raw: string): string {
  let s = raw.trim();
  s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹ⁿˣʸᵘ⁻⁺]+/g, (m) => `^{${[...m].map((c) => SUP_MAP[c] ?? c).join("")}}`);
  s = s.replace(/[₀₁₂₃₄₅₆₇₈₉ₙₓᵢₖ]+/g, (m) => `_{${[...m].map((c) => SUB_MAP[c] ?? c).join("")}}`);
  s = s.replace(/√\(([^()]+)\)/g, "\\sqrt{$1}").replace(/√([a-zA-Z0-9]+)/g, "\\sqrt{$1}");
  s = s
    .replace(/−/g, "-")
    .replace(/·/g, " \\cdot ")
    .replace(/×/g, " \\times ")
    .replace(/→/g, " \\to ")
    .replace(/≠/g, " \\ne ")
    .replace(/≤/g, " \\le ")
    .replace(/≥/g, " \\ge ")
    .replace(/≈/g, " \\approx ")
    .replace(/∞/g, "\\infty ")
    .replace(/±/g, "\\pm ")
    .replace(/ε/g, "\\varepsilon ")
    .replace(/δ/g, "\\delta ")
    .replace(/π/g, "\\pi ")
    .replace(/α/g, "\\alpha ")
    .replace(/β/g, "\\beta ")
    .replace(/ξ/g, "\\xi ")
    .replace(/θ/g, "\\theta ")
    .replace(/λ/g, "\\lambda ")
    .replace(/ω/g, "\\omega ")
    .replace(/φ/g, "\\varphi ")
    .replace(/Δ/g, "\\Delta ")
    .replace(/∫/g, "\\int ")
    .replace(/∑/g, "\\sum ")
    .replace(/∂/g, "\\partial ");
  s = s.replace(
    /\b(arcsin|arccos|arctan|sinh|cosh|tanh|sin|cos|tan|cot|sec|csc|ln|log|exp|lim|max|min)\b/g,
    "\\$1",
  );
  s = convertFractionsAndPowers(s);
  return s;
}

function looksLikeMath(chunk: string): boolean {
  const t = chunk.trim();
  if (!t) return false;
  if (/^\d+(?:\.\d+)?%?$/.test(t)) return false;
  if (/[/*^=<>~√∫∑∂Δ→≠≤≥≈∞±·×−εδαβξθλωφ⁰¹²³⁴⁵⁶⁷⁸⁹ⁿˣʸᵘ⁻⁺₀₁₂₃₄₅₆₇₈₉ₙₓ]/.test(t)) return true;
  if (/\b(?:sin|cos|tan|cot|ln|log|exp|lim|dx|dy|dt|du)\b/.test(t)) return true;
  if (/^[a-zA-Z](?:'{1,2})?\([a-zA-Z0-9,\s+-]+\)$/.test(t)) return true;
  if (/^[a-zA-Z]$/.test(t)) return true;
  return false;
}

function renderInlineLatex(latex: string): string | null {
  try {
    return katex.renderToString(latex, {
      displayMode: false,
      throwOnError: true,
      strict: "ignore",
      trust: false,
      output: "htmlAndMathml",
    });
  } catch {
    return null;
  }
}

export default function MathText({ text }: { text: string }) {
  const parts = text.split(/([\u4e00-\u9fff，。；：！？、“”‘’（）【】《》—…]+)/);
  return (
    <>
      {parts.map((part, idx) => {
        if (!part) return null;
        if (/^[\u4e00-\u9fff，。；：！？、“”‘’（）【】《》—…]+$/.test(part)) {
          return <span key={idx}>{part}</span>;
        }
        const lead = part.match(/^\s*/)?.[0] ?? "";
        const trail = part.match(/[\s.,;:]*$/)?.[0] ?? "";
        const core = part.slice(lead.length, part.length - trail.length);
        if (!looksLikeMath(core)) {
          return <span key={idx}>{part}</span>;
        }
        const latex = asciiMathToLatex(core);
        const html = renderInlineLatex(latex);
        if (!html) {
          return <span key={idx}>{part}</span>;
        }
        return (
          <span key={idx}>
            {lead}
            <span className="math-inline" dangerouslySetInnerHTML={{ __html: html }} />
            {trail}
          </span>
        );
      })}
    </>
  );
}
