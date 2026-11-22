import type { GuidedHint } from "../learning";
import { ch1CoreGuidedHints } from "./ch1Core";
import { ch1Sec1GuidedHints } from "./ch1Sec1";
import { ch1Sec2to3GuidedHints } from "./ch1Sec2to3";
import { ch1Sec4GuidedHints } from "./ch1Sec4";
import { ch1Sec5GuidedHints } from "./ch1Sec5";
import { ch1Sec6to7GuidedHints } from "./ch1Sec6to7";
import { ch1Sec8to10GuidedHints } from "./ch1Sec8to10";
import { ch1ReviewGuidedHints } from "./ch1Review";
import { ch1ExamGuidedHints } from "./ch1Exam";

export const guidedHintsById: Record<string, GuidedHint[]> = {
  ...ch1CoreGuidedHints,
  ...ch1Sec1GuidedHints,
  ...ch1Sec2to3GuidedHints,
  ...ch1Sec4GuidedHints,
  ...ch1Sec5GuidedHints,
  ...ch1Sec6to7GuidedHints,
  ...ch1Sec8to10GuidedHints,
  ...ch1ReviewGuidedHints,
  ...ch1ExamGuidedHints,
};
