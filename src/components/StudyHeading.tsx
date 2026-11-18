import type { ComponentProps } from "react";
import { PageHeader } from "./ui";
import ChapterPainting from "./ChapterPainting";

export default function StudyHeading({
  chapter,
  ...header
}: ComponentProps<typeof PageHeader> & { chapter: number }) {
  return (
    <div className="study-heading">
      <PageHeader {...header} />
      <ChapterPainting chapter={chapter} />
    </div>
  );
}
