import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui";
import { problemIndexById } from "../../data/bank";
import { formulaById } from "../../data/formulas";
import { useFormulas } from "../../db/formulas";
import { markStuck } from "./engine";
export function StuckButton({ problemId }: { problemId: string }) {
  const { store, save } = useFormulas();
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const p = problemIndexById.get(problemId);
  return p?.formulaIds?.length ? (
    <div className="fm-stuck">
      <Button
        variant="ghost"
        onClick={() => {
          setOpen(!open);
          setDone(false);
        }}
      >
        卡在公式上了
      </Button>
      {open && (
        <fieldset>
          <legend>确认是哪一个公式？</legend>
          {p.formulaIds.map((id) => (
            <Button
              key={id}
              onClick={() => {
                save(markStuck(store, id, problemId));
                setOpen(false);
                setDone(true);
              }}
            >
              {formulaById.get(id)?.name}
            </Button>
          ))}
        </fieldset>
      )}
      {done && (
        <p role="status">
          已加入今日公式复习。<Link to="/review/formulas">去复习 →</Link>
        </p>
      )}
    </div>
  ) : null;
}
