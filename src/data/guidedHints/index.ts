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
import { ch2CoreGuidedHints } from "./ch2Core";
import { ch2Sec1GuidedHints } from "./ch2Sec1";
import { ch2Sec2aGuidedHints } from "./ch2Sec2a";
import { ch2Sec2bGuidedHints } from "./ch2Sec2b";
import { ch2Sec3to4GuidedHints } from "./ch2Sec3to4";
import { ch2Sec5GuidedHints } from "./ch2Sec5";
import { ch2ReviewGuidedHints } from "./ch2Review";
import { ch3Sec1GuidedHints } from "./ch3Sec1";
import { ch3Sec2GuidedHints } from "./ch3Sec2";

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
  ...ch2CoreGuidedHints,
  ...ch2Sec1GuidedHints,
  ...ch2Sec2aGuidedHints,
  ...ch2Sec2bGuidedHints,
  ...ch2Sec3to4GuidedHints,
  ...ch2Sec5GuidedHints,
  ...ch2ReviewGuidedHints,
  ...ch3Sec1GuidedHints,
  ...ch3Sec2GuidedHints,
};
