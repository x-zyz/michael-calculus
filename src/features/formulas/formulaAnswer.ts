const aliases: Record<string, string> = {
  "−": "-", "′": "'", "″": "''", "’": "'",
  "→": "\\to", "\\rightarrow": "\\to",
  "≈": "\\approx", "∼": "\\sim", "~": "\\sim",
  "±": "\\pm", "∞": "\\infty", "α": "\\alpha",
  "π": "\\pi", "ξ": "\\xi", "∃": "\\exists", "∈": "\\in",
  "⇒": "\\Rightarrow", "\\implies": "\\Rightarrow",
  "\\dfrac": "\\frac", "\\tfrac": "\\frac",
};

export const formulaAnswerLimit = 300;

function canonical(value: string): string | null {
  if (value.length > formulaAnswerLimit || value.includes("□")) return null;

  const expression = value.trim()
    .replace(/\^\{((?:\s*\\(?:doubleprime|prime)\b)+)\s*\}|\^(\\(?:doubleprime|prime)\b)/g, (_, grouped: string | undefined, single: string | undefined) =>
      (grouped ?? single ?? "").replace(/\s+/g, "").replaceAll("\\doubleprime", "''").replaceAll("\\prime", "'"))
    .replace(/^\\begin\{gathered\}([\s\S]*)\\end\{gathered\}$/, "$1");
  const tokens = (expression.match(/\\[a-zA-Z]+|\\.|[^\s]/gu) ?? [])
    .filter((token, index, all) => !(token === "\\\\" && all[index + 1] === "\\Rightarrow") && !["\\left", "\\right", "\\,", "\\ ", "\\;", "\\!", "\\quad", "\\qquad"].includes(token))
    .map((token) => aliases[token] ?? token);
  let cursor = 0;

  function argument(): string {
    if (tokens[cursor] !== "{") {
      if (!tokens[cursor] || tokens[cursor] === "}") throw new Error("missing argument");
      return "{" + atom() + "}";
    }
    return atom();
  }

  function atom(): string {
    const token = tokens[cursor++];
    switch (token) {
      case "{": {
        let group = "{";
        while (cursor < tokens.length && tokens[cursor] !== "}") group += atom();
        if (tokens[cursor++] !== "}") throw new Error("unclosed group");
        return group + "}";
      }
      case "}":
        throw new Error("unexpected group ending");
      case "\\frac":
        return token + argument() + argument();
      case "\\sqrt":
      case "^":
      case "_":
        return token + argument();
      default:
        // Keep command boundaries when a variable follows a function or symbol.
        return token.startsWith("\\") ? token + " " : token;
    }
  }

  try {
    let result = "";
    while (cursor < tokens.length) result += atom();
    return result || null;
  } catch {
    return null;
  }
}

export function matchesFormula(input: string, answer: string, allowEqualsOmission = false): boolean {
  const expected = canonical(answer);
  const actual = canonical(input);
  if (!expected || !actual) return false;
  return actual === expected || (allowEqualsOmission && expected.startsWith("=") && actual === expected.slice(1));
}
