import { computeMastery } from "../data/learning";
import { useLearning } from "../db/learning";
import { Card, ProgressBar, Chip, ChipRow } from "./ui";
export default function MasterySummary({
  onTag,
}: {
  onTag?: (tag: string) => void;
}) {
  const { state } = useLearning();
  const m = computeMastery(state.attempts);
  return (
    <Card data-testid="review-mastery">
      <h2>章节与考点掌握度诊断</h2>
      {m.chapters.map((c) => (
        <div className="chapter-progress" key={c.id}>
          <strong>{c.title}</strong>
          <span>
            已掌握 {c.mastered} / {c.total} 题（{c.rate}%）
          </span>
          <ProgressBar value={c.rate} label={c.title} />
          <small>
            待复习错题 {c.pending} 题 · 薄弱考点：
            {c.weakTags.length ? c.weakTags.join("、") : "暂无"}
          </small>
        </div>
      ))}
      <ChipRow label="薄弱考点">
        {m.tags
          .filter((t) => t.pending)
          .map((t) => (
            <Chip key={t.tag} onClick={() => onTag?.(t.tag)}>
              {t.label} · {t.pending}
            </Chip>
          ))}
      </ChipRow>
    </Card>
  );
}
