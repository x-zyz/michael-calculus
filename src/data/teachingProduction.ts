import type { TeachingLesson } from "./teaching";
import { chapterOneBatch01Drafts } from "./eli5Drafts/ch01Batch01";

export const chapterOneProductionTeaching: Readonly<Record<string, TeachingLesson>> = {
  ...chapterOneBatch01Drafts,
};
