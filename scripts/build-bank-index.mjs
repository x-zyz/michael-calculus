#!/usr/bin/env node
/**
 * Builds the lightweight search/filter index src/data/bank/index.generated.json
 * deterministically from src/data/bank/ch01.json ... ch08.json + order.json.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const BANK_DIR = path.join(ROOT, "src", "data", "bank");

export function computeBankIndex(bankDir = BANK_DIR) {
  const byId = new Map();
  for (let ch = 1; ch <= 8; ch++) {
    const file = path.join(bankDir, `ch0${ch}.json`);
    const items = JSON.parse(fs.readFileSync(file, "utf8"));
    for (const p of items) {
      byId.set(p.id, p);
    }
  }

  const orderPath = path.join(bankDir, "order.json");
  const order = fs.existsSync(orderPath)
    ? JSON.parse(fs.readFileSync(orderPath, "utf8"))
    : [...byId.keys()];

  const entries = order.map((id) => {
    const p = byId.get(id);
    if (!p) throw new Error(`order.json references unknown problem id: ${id}`);
    const kind = "answer" in p ? "数值题" : p.kind;
    const difficulty = p.difficulty ?? "basic";
    const meta = p.meta ?? {};
    const searchParts = [
      p.id,
      p.title,
      p.source ?? "",
      p.lessonId,
      p.errorTag,
      p.errorLabel ?? "",
      meta.nickname ?? "",
      ...(meta.theorems ?? []),
      ...(meta.techniques ?? []),
    ];
    const searchText = searchParts
      .filter(Boolean)
      .join(" ")
      .normalize("NFKC")
      .toLowerCase();

    return {
      id: p.id,
      ch: p.chapter,
      lessonId: p.lessonId,
      title: p.title,
      ...(p.source ? { source: p.source } : {}),
      kind,
      difficulty,
      errorTag: p.errorTag,
      hasHints: Boolean(p.guidedHints?.length),
      hasEli5: Boolean(p.teaching),
      formulaCount: p.formulaIds?.length ?? 0,
      ...(meta.nickname ? { nickname: meta.nickname } : {}),
      ...(meta.theorems?.length ? { theorems: meta.theorems } : {}),
      ...(meta.techniques?.length ? { techniques: meta.techniques } : {}),
      ...(meta.isTrap ? { isTrap: true } : {}),
      searchText,
    };
  });

  return {
    version: 1,
    total: entries.length,
    order,
    entries,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const index = computeBankIndex();
  const outPath = path.join(BANK_DIR, "index.generated.json");
  fs.writeFileSync(outPath, `${JSON.stringify(index)}\n`, "utf8");
  const kb = (fs.statSync(outPath).size / 1024).toFixed(1);
  console.log(`Built ${outPath} (${index.total} entries, ${kb} KB)`);
}
