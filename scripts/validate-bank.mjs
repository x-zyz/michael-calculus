#!/usr/bin/env node
/**
 * Unified SSOT bank validator (`npm run validate:bank`).
 *
 * Replaces ad-hoc per-section validation scripts with a single deterministic gate:
 * 1. Schema completeness & numeric answer finiteness across ch01.json..ch08.json
 * 2. Global ID uniqueness (0 duplicates) & order.json alignment
 * 3. Cross-reference integrity: lessonId, formulaIds, remediation triggerStepIds
 * 4. Strict KaTeX rendering on every formula, solution, guidedHint, and ELI5 step/transfer
 * 5. ELI5 structural & P0 quality checks
 * 6. Derived index.generated.json sync verification
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { computeBankIndex } from "./build-bank-index.mjs";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const katex = require("katex");

const ROOT = process.cwd();
const BANK_DIR = path.join(ROOT, "src", "data", "bank");

function loadTsModule(relPath) {
  const out = esbuild.buildSync({
    entryPoints: [path.join(ROOT, relPath)],
    bundle: true,
    write: false,
    format: "cjs",
    platform: "node",
    loader: { ".ts": "ts" },
  });
  const mod = { exports: {} };
  new Function("exports", "require", "module", out.outputFiles[0].text)(mod.exports, require, mod);
  return mod.exports;
}

const errors = [];
const fail = (msg) => errors.push(msg);
const checkKatex = (latex, ctx) => {
  if (!latex || typeof latex !== "string") return;
  try {
    katex.renderToString(latex, { throwOnError: true, strict: "error" });
  } catch (err) {
    fail(`KaTeX error at ${ctx}: ${err.message}`);
  }
};

const { formulaById } = loadTsModule("src/data/formulas.ts");
const { lessons } = loadTsModule("src/data/learning.ts");
const { remediationModulesById } = loadTsModule("src/data/remediation/remediationModules.ts");
const lessonChapter = new Map(lessons.map((l) => [l.id, l.chapter]));

const allProblems = [];
const seenIds = new Set();
const allStepIds = new Set();
let hintsCount = 0;
let eli5Count = 0;

for (let ch = 1; ch <= 8; ch++) {
  const file = path.join(BANK_DIR, `ch0${ch}.json`);
  if (!fs.existsSync(file)) {
    fail(`Missing chapter bank file: ch0${ch}.json`);
    continue;
  }
  const items = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!Array.isArray(items)) {
    fail(`ch0${ch}.json must be a JSON array`);
    continue;
  }

  for (const p of items) {
    if (!p.id || typeof p.id !== "string") {
      fail(`ch0${ch}.json contains entry without string id`);
      continue;
    }
    if (seenIds.has(p.id)) fail(`Duplicate problem id: ${p.id}`);
    seenIds.add(p.id);
    allProblems.push(p);

    if (p.chapter !== ch) fail(`${p.id}: chapter=${p.chapter} inside ch0${ch}.json`);
    if (!lessonChapter.has(p.lessonId)) {
      fail(`${p.id}: unknown lessonId "${p.lessonId}"`);
    } else if (lessonChapter.get(p.lessonId) !== ch) {
      fail(`${p.id}: lessonId "${p.lessonId}" belongs to ch${lessonChapter.get(p.lessonId)}, not ch${ch}`);
    }

    if (!p.title?.trim()) fail(`${p.id}: blank title`);
    if (!p.formula?.trim()) fail(`${p.id}: blank formula`);
    if (!p.explanation?.trim()) fail(`${p.id}: blank explanation`);
    if (!p.errorTag?.trim()) fail(`${p.id}: blank errorTag`);
    if (!Array.isArray(p.hints) || p.hints.length === 0) fail(`${p.id}: missing hints`);

    if ("answer" in p) {
      if (!Number.isFinite(p.answer)) fail(`${p.id}: non-finite numeric answer`);
    } else {
      if (!p.prompt?.trim()) fail(`${p.id}: missing written prompt`);
      if (!p.solution?.trim()) fail(`${p.id}: missing written solution`);
      if (!Array.isArray(p.steps) || p.steps.length === 0) fail(`${p.id}: missing written steps`);
    }

    checkKatex(p.formula, `${p.id}.formula`);
    if ("solution" in p && p.solution) checkKatex(p.solution, `${p.id}.solution`);

    if (p.formulaIds) {
      for (const fid of p.formulaIds) {
        if (!formulaById.has(fid)) fail(`${p.id}: invalid formulaId "${fid}"`);
      }
    }

    if (p.guidedHints) {
      hintsCount++;
      if (!Array.isArray(p.guidedHints) || p.guidedHints.length === 0) {
        fail(`${p.id}: empty guidedHints`);
      } else {
        for (const [i, h] of p.guidedHints.entries()) {
          if (!h.change?.trim() || !h.text?.trim()) fail(`${p.id}.guidedHints[${i}]: blank change/text`);
          checkKatex(h.formula, `${p.id}.guidedHints[${i}].formula`);
        }
      }
    }

    if (p.teaching) {
      eli5Count++;
      const t = p.teaching;
      if (!Array.isArray(t.steps) || t.steps.length === 0) {
        fail(`${p.id}.teaching: missing steps`);
      } else {
        checkKatex(t.solution, `${p.id}.teaching.solution`);
        const stepIds = new Set();
        for (const s of t.steps) {
          if (stepIds.has(s.id)) fail(`${p.id}.teaching: duplicate step id "${s.id}"`);
          stepIds.add(s.id);
          allStepIds.add(s.id);
          checkKatex(s.formula, `${p.id}.teaching.${s.id}.formula`);
          if (s.check) {
            const { choices, correct, feedback, prompt } = s.check;
            if (!prompt?.trim()) fail(`${p.id}/${s.id}: blank check prompt`);
            if (!Array.isArray(choices) || choices.length < 2) fail(`${p.id}/${s.id}: <2 choices`);
            if (correct < 0 || correct >= choices.length) fail(`${p.id}/${s.id}: invalid correct index`);
            if (!Array.isArray(feedback) || feedback.length !== choices.length) {
              fail(`${p.id}/${s.id}: feedback length mismatch`);
            }
            const norm = choices.map((c) => c.normalize("NFKC").replace(/\s+/g, ""));
            if (new Set(norm).size !== choices.length) fail(`${p.id}/${s.id}: duplicate choices`);
          }
          if (s.transfer) {
            if (!Number.isFinite(s.transfer.answer)) fail(`${p.id}/${s.id}: non-finite transfer answer`);
            if ("answer" in p && s.transfer.answer === p.answer) {
              fail(`${p.id}/${s.id}: transfer answer equals original answer`);
            }
            if (s.transfer.solution) checkKatex(s.transfer.solution, `${p.id}/${s.id}.transfer.solution`);
            if (s.transfer.promptFormula) checkKatex(s.transfer.promptFormula, `${p.id}/${s.id}.transfer.promptFormula`);
          }
        }
      }
    }
  }
}

// Verify remediation triggerStepIds exist in the bank
for (const mod of Object.values(remediationModulesById)) {
  for (const stepId of mod.triggerStepIds) {
    if (!allStepIds.has(stepId)) {
      fail(`remediationModules["${mod.id}"]: unknown triggerStepId "${stepId}"`);
    }
  }
}

// Verify index.generated.json matches computed index
const indexPath = path.join(BANK_DIR, "index.generated.json");
if (!fs.existsSync(indexPath)) {
  fail("Missing src/data/bank/index.generated.json — run `npm run build:bank-index`");
} else {
  const actual = JSON.parse(fs.readFileSync(indexPath, "utf8"));
  const expected = computeBankIndex(BANK_DIR);
  try {
    assert.deepStrictEqual(actual, expected);
  } catch {
    fail("src/data/bank/index.generated.json is out of sync — run `npm run build:bank-index`");
  }
}

if (errors.length > 0) {
  console.error(`BANK VALIDATION FAILED (${errors.length} error(s)):`);
  for (const e of errors.slice(0, 30)) console.error(`  - ${e}`);
  if (errors.length > 30) console.error(`  ... and ${errors.length - 30} more`);
  process.exit(1);
}

console.log(
  `BANK VALIDATION PASSED: ${allProblems.length} problems, ${hintsCount} guidedHints, ${eli5Count} ELI5 lessons, index in sync, 0 KaTeX/schema/ref errors.`,
);
