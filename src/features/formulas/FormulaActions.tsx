import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Tabs, Button } from "../../components/ui";
import { problems } from "../../data/learning";
import { formulaById } from "../../data/formulas";
import { useFormulas } from "../../db/formulas";
import { markStuck } from "./engine";
export function ReviewNavigation() {
  const location = useLocation(),
    navigate = useNavigate();
  return (
    <Tabs
      label="复习分类"
      value={location.pathname === "/review/formulas" ? "formulas" : "mistakes"}
      items={[
        { value: "mistakes", label: "错题" },
        { value: "formulas", label: "公式" },
      ]}
      onChange={(v) =>
        navigate(v === "formulas" ? "/review/formulas" : "/review")
      }
    />
  );
}
export function StuckButton({ problemId }: { problemId: string }) {
  const { store, save } = useFormulas();
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const p = problems.find((p) => p.id === problemId)!;
  return p.formulaIds?.length ? (
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
