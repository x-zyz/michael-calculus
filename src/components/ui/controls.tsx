import {
  useId,
  useState,
  Children,
  isValidElement,
  type ReactNode,
  type HTMLAttributes,
  type ChangeEvent,
} from "react";

import { ChevronDown, Minus, Plus, Info } from "lucide-react";
import { Button } from "./primitives";
import { Sheet } from "./Sheet";
export function Accordion({
  title,
  children,
  defaultOpen = false,
  ...props
}: {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
} & HTMLAttributes<HTMLElement>) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <section {...props} className="accordion">
      <Button
        className="accordion-trigger"
        variant="ghost"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        {title}
        <ChevronDown size={20} className={open ? "chevron-open" : ""} />
      </Button>
      {
        <div className="accordion-body" id={id} hidden={!open}>
          {children}
        </div>
      }
    </section>
  );
}

export function InfoTip({
  children,
  label = "查看说明",
}: {
  children: ReactNode;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <span className="info-tip">
      <Button
        variant="ghost"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <Info size={20} />
      </Button>
      <Sheet open={open} onClose={() => setOpen(false)} title={label}>
        <p role="note">{children}</p>
      </Sheet>
    </span>
  );
}

export function Select({
  children,
  value,
  onChange,
  ...props
}: {
  children: ReactNode;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  id?: string;
  "aria-label"?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const options = Children.toArray(children)
    .filter(isValidElement)
    .map((el) => el.props as { value: string; children: ReactNode });
  const active = options.find((o) => String(o.value) === String(value));
  return (
    <div className="custom-select">
      <button
        type="button"
        className="select-trigger"
        role="combobox"
        aria-expanded={open}
        aria-controls={id}
        data-value={value}
        {...props}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
      >
        {active?.children}
        <ChevronDown size={20} />
      </button>
      {open && (
        <div id={id} role="listbox" className="select-options">
          {options.map((o) => (
            <button
              type="button"
              role="option"
              data-value={o.value}
              aria-selected={String(value) === String(o.value)}
              key={o.value}
              onClick={() => {
                onChange({
                  target: { value: o.value },
                } as ChangeEvent<HTMLSelectElement>);
                setOpen(false);
              }}
            >
              {o.children}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function NumberStepper({
  value,
  onChange,
  label,
  min = 0,
  max = 20,
}: {
  value: number;
  onChange: (n: number) => void;
  label: string;
  min?: number;
  max?: number;
}) {
  return (
    <div className="stepper">
      <span>{label}</span>
      <div>
        <Button
          aria-label={`减少${label}`}
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
        >
          <Minus size={20} />
        </Button>
        <input
          aria-label={label}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (Number.isInteger(n) && n >= min && n <= max) onChange(n);
          }}
        />
        <Button
          aria-label={`增加${label}`}
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
        >
          <Plus size={20} />
        </Button>
      </div>
    </div>
  );
}
