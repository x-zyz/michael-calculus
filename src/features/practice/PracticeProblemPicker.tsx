import { problemIndex, problemNumberById, type ProblemIndexEntry, type ProblemSearchFilter } from "../../data/bank";
import { chapters, errorTags, practiceDifficultyLabels, writtenProblemKinds, type PracticeDifficulty } from "../../data/learning";
import { Button, Sheet, Chip, ChipRow, TextInput } from "../../components/ui";

const semanticTags = [...new Set(problemIndex.flatMap(({ theorems, techniques }) => [...(theorems ?? []), ...(techniques ?? [])]))];
const kinds = ["数值题", ...writtenProblemKinds] as const;

export default function PracticeProblemPicker({
  open, onClose, filters, onFilters, difficulty, onDifficulty, kind, onKind, results, selectedId, latest, onSelect,
}: {
  open: boolean;
  onClose: () => void;
  filters: ProblemSearchFilter;
  onFilters: (filters: ProblemSearchFilter) => void;
  difficulty: PracticeDifficulty | "";
  onDifficulty: (value: PracticeDifficulty | "") => void;
  kind: ProblemIndexEntry["kind"] | "";
  onKind: (value: ProblemIndexEntry["kind"] | "") => void;
  results: ProblemIndexEntry[];
  selectedId?: string;
  latest: ReadonlyMap<string, boolean>;
  onSelect: (entry: ProblemIndexEntry) => void;
}) {
  if (!open) return null;
  const set = (changes: ProblemSearchFilter) => onFilters({ ...filters, ...changes });
  return (
    <Sheet title="题目列表" open={open} onClose={onClose}>
      <section className="practice-search" data-testid="chapter-mastery">
        <label htmlFor="practice-query">搜索题目</label>
        <TextInput id="practice-query" type="search" placeholder="关键词、题号、出处或昵称"
          value={filters.query ?? ""} onChange={(event) => set({ query: event.target.value })} />
        <ChipRow label="按教学内容筛选">
          <Chip selected={filters.onlyEli5} onClick={() => set({ onlyEli5: !filters.onlyEli5 })}>有 ELI5</Chip>
          <Chip selected={filters.onlyHints} onClick={() => set({ onlyHints: !filters.onlyHints })}>有逐步提示</Chip>
        </ChipRow>
        <p role="status">找到 {results.length} 道题</p>
        <ChipRow label="按章节筛选">
          <Chip selected={!filters.chapter} onClick={() => set({ chapter: undefined })}>全部章节</Chip>
          {chapters.map(({ id, short }) => (
            <Chip key={id} selected={filters.chapter === id} onClick={() => set({ chapter: id })}>{short}</Chip>
          ))}
        </ChipRow>
        <ChipRow label="按难度筛选">
          <Chip selected={!difficulty} onClick={() => onDifficulty("")}>全部难度</Chip>
          {(Object.entries(practiceDifficultyLabels) as [PracticeDifficulty, string][]).map(([value, label]) => (
            <Chip key={value} selected={difficulty === value} onClick={() => onDifficulty(value)}>{label}</Chip>
          ))}
        </ChipRow>
        <ChipRow label="按题型筛选">
          <Chip selected={!kind} onClick={() => onKind("")}>全部题型</Chip>
          {kinds.map((value) => <Chip key={value} selected={kind === value} onClick={() => onKind(value)}>{value}</Chip>)}
        </ChipRow>
        <h3>定理与解题方法</h3>
        <ChipRow label="按错因标签筛选">
          <Chip selected={!filters.tag} onClick={() => set({ tag: undefined })}>全部错因考点</Chip>
          {errorTags.map(({ tag, label }) => (
            <Chip key={tag} selected={filters.tag === tag} onClick={() => set({ tag })}>{label}</Chip>
          ))}
          {semanticTags.map((tag) => <Chip key={tag} selected={filters.tag === tag} onClick={() => set({ tag })}>{tag}</Chip>)}
        </ChipRow>
      </section>
      {chapters.map(({ id, title }) => {
        const entries = results.filter(({ ch }) => ch === id);
        return entries.length > 0 && (
          <section key={id} aria-label={title}>
            <h3>{title}</h3>
            <div className="question-grid">
              {entries.map((entry) => {
                const correct = latest.get(entry.id);
                return (
                  <Button key={entry.id} aria-pressed={selectedId === entry.id}
                    className={correct === true ? "status-done" : correct === false ? "status-wrong" : ""}
                    onClick={() => onSelect(entry)}>
                    <strong>{correct === true ? "✓" : correct === false ? "✕" : "○"} 第 {problemNumberById.get(entry.id)} 题</strong>
                    <small>{practiceDifficultyLabels[entry.difficulty]} · {entry.title}</small>
                    {entry.source && filters.query && <small>{entry.source}</small>}
                  </Button>
                );
              })}
            </div>
          </section>
        );
      })}
    </Sheet>
  );
}
