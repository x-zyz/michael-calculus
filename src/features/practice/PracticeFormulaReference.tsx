import { useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { BookOpen, X } from "lucide-react";
import Formula from "../../components/Formula";
import { Button, Card, Sheet, Tabs } from "../../components/ui";
import { formulaById, formulas } from "../../data/formulas";
import { lessons, type Problem } from "../../data/learning";

const desktopQuery = "(min-width: 1180px)";
const scopeTabs = [
  { value: "problem", label: "本题公式" },
  { value: "chapter", label: "本章常用公式" },
];
const derivativeBasics = new Set(["diff-power", "diff-sin", "diff-cos", "diff-exp", "diff-log", "sum", "product", "quotient", "chain"]);

function subscribeToDesktop(change: () => void) {
  const query = window.matchMedia?.(desktopQuery);
  query?.addEventListener("change", change);
  return () => query?.removeEventListener("change", change);
}

function isDesktop() {
  return window.matchMedia?.(desktopQuery).matches ?? false;
}

export default function PracticeFormulaReference({ problem, children }: {
  problem: Problem;
  children: (trigger: ReactNode) => ReactNode;
}) {
  const desktop = useSyncExternalStore(subscribeToDesktop, isDesktop);
  const [open, setOpen] = useState(false);
  const [scope, setScope] = useState("problem");
  const trigger = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const chapter = lessons.find(({ id }) => id === problem.lessonId)?.chapter;
  const current = scope === "problem";
  const chapterFormulas = formulas.filter((formula) => formula.chapter === chapter);
  const prerequisites = formulas.filter((formula) =>
    formula.chapter !== chapter && chapter !== undefined && chapter > 2 && derivativeBasics.has(formula.id),
  );
  const explicit = [...new Set(problem.formulaIds)].flatMap((id) => {
    const formula = formulaById.get(id);
    return formula ? [formula] : [];
  });
  const problemFormulas = explicit.length ? explicit : formulas.filter(({ lessonId }) => lessonId === problem.lessonId);
  const displayed = current ? problemFormulas : [...chapterFormulas, ...prerequisites];

  function close() {
    setOpen(false);
    if (desktop) trigger.current?.focus({ preventScroll: true });
  }

  const content = (
    <div className="practice-reference-content">
      <Tabs items={scopeTabs} value={scope} onChange={setScope} label="公式范围" />
      <div role="tabpanel" aria-label={current ? "本题公式" : "本章常用公式"}>
        {displayed.length ? (
          <dl className="practice-reference-list">
            {displayed.map(({ id, name, latex, conditions }) => (
              <div key={id}>
                <dt>{name}</dt>
                <dd><Formula value={latex} /><p>{conditions}</p></dd>
              </div>
            ))}
          </dl>
        ) : <p>{current && (chapterFormulas.length || prerequisites.length)
          ? "本题暂无专属公式，可查看本章常用公式。"
          : "此范围暂无已收录的公式。"}</p>}
      </div>
    </div>
  );
  return (
    <div className="practice-reference-layout" data-reference-open={open && desktop || undefined}>
      <div className="practice-reference-question">
        {children(
          <Button ref={trigger} className="practice-reference-trigger"
            aria-expanded={open} aria-controls={open && desktop ? panelId : undefined}
            aria-haspopup={desktop ? undefined : "dialog"}
            onClick={() => { setScope("problem"); setOpen(!open); }}>
            <BookOpen size={18} aria-hidden="true" /> {problemFormulas.length ? `公式表（${problemFormulas.length}）` : "公式表"}
          </Button>,
        )}
      </div>
      {desktop ? open && (
        <Card id={panelId} role="region" aria-label="公式表" className="practice-reference-panel"
          onKeyDown={(event) => { if (event.key === "Escape") close(); }}>
          <header className="section-header">
            <h2>公式表</h2>
            <Button variant="ghost" className="icon-button" aria-label="关闭公式表" onClick={close}>
              <X size={24} aria-hidden="true" />
            </Button>
          </header>
          {content}
        </Card>
      ) : <Sheet open={open} title="公式表" onClose={close}>{content}</Sheet>}
    </div>
  );
}
