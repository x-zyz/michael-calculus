import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
const walk = (p) =>
  readdirSync(p).flatMap((n) => {
    const f = join(p, n);
    return statSync(f).isDirectory() ? walk(f) : [f];
  });
const tsx = walk("src").filter((f) => f.endsWith(".tsx"));
const source = tsx.map((f) => readFileSync(f, "utf8")).join("\n");
const words = new Set(source.match(/[a-zA-Z][a-zA-Z0-9_-]*/g));
const dynamic = [...source.matchAll(/([a-z][a-z-]+)-\$\{/g)].map(
  (m) => m[1] + "-",
);
const external = new Set(["katex", "katex-display", "katex-html"]);
const errors = [];
for (const file of walk("src").filter((f) => f.endsWith(".css"))) {
  const css = readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  if (file.endsWith("tokens.css")) continue;
  if (/font-size\s*:\s*[^;{}]*\d(?:\.\d+)?px/.test(css))
    errors.push(file + ": literal px font-size");
  if (/#[a-f\d]{3,8}\b/i.test(css))
    errors.push(file + ": literal hexadecimal color");
  if (/!important/.test(css)) errors.push(file + ": !important");
  for (const match of css.matchAll(/([^{}]+)\{/g)) {
    const selector = match[1];
    if (selector.trim().startsWith("@")) continue;
    for (const c of selector.matchAll(/\.([a-zA-Z][\w-]*)/g))
      if (
        !words.has(c[1]) &&
        !external.has(c[1]) &&
        !dynamic.some(
          (p) => c[1].startsWith(p) && words.has(c[1].slice(p.length)),
        )
      )
        errors.push(file + ": unused class ." + c[1]);
  }
}
for (const file of walk("src/features").filter((f) => f.endsWith(".tsx"))) {
  const s = readFileSync(file, "utf8");
  if (s.split("\n").length > 300)
    errors.push(file + ": feature exceeds 300 lines");
  if (/<(?:select|details)\b|<input[^>]+type=["']number/.test(s))
    errors.push(file + ": use the shared UI controls");
}
if (errors.length) {
  console.error([...new Set(errors)].join("\n"));
  process.exitCode = 1;
} else
  console.log(
    "CSS tokens, class references, shared controls and feature sizes verified.",
  );
