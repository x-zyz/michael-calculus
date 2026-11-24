import {
  type ReactNode,
  type ButtonHTMLAttributes,
  type ComponentPropsWithRef,
  type HTMLAttributes,
  type InputHTMLAttributes,
} from "react";

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
export function Button({
  variant = "secondary",
  className = "",
  ...props
}: ComponentPropsWithRef<"button"> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
}) {
  return (
    <button
      type="button"
      {...props}
      className={`btn btn-${variant} ${className}`}
    />
  );
}

export function ActionLink({
  to,
  children,
  variant = "secondary",
  ...props
}: {
  to: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
} & HTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link to={to} {...props} className={`btn btn-${variant}`}>
      {children}
    </Link>
  );
}

export function Card({
  variant = "default",
  className = "",
  ...props
}: HTMLAttributes<HTMLElement> & { variant?: "default" | "emphasis" }) {
  return <section {...props} className={`card card-${variant} ${className}`} />;
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <header className="page-header">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action}
    </header>
  );
}

export function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      {action}
    </div>
  );
}

export function Tabs({
  items,
  value,
  onChange,
  label = "选项",
}: {
  items: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  label?: string;
}) {
  return (
    <div className="tabs" role="tablist" aria-label={label}>
      {items.map((i) => (
        <button
          className="tab"
          role="tab"
          aria-selected={value === i.value}
          key={i.value}
          onClick={() => onChange(i.value)}
        >
          {i.label}
        </button>
      ))}
    </div>
  );
}

export function SegmentedControl(props: Parameters<typeof Tabs>[0]) {
  return <Tabs {...props} />;
}

export function Chip({
  selected,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }) {
  return (
    <Button {...props} className="chip" aria-pressed={selected}>
      {children}
    </Button>
  );
}

export function ChipRow({
  children,
  label,
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <div className="chip-row" role="group" aria-label={label}>
      {children}
    </div>
  );
}

export function StatTile({
  value,
  label,
  to,
}: {
  value: ReactNode;
  label: string;
  to?: string;
}) {
  const child = (
    <>
      <strong>{value}</strong>
      <span>{label}</span>
    </>
  );
  return to ? (
    <Link className="stat-tile" to={to}>
      {child}
      <ArrowRight size={16} />
    </Link>
  ) : (
    <div className="stat-tile">{child}</div>
  );
}

export function ProgressBar({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div
      className="progress"
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

export function ListItem({
  title,
  description,
  status = "new",
  indicator,
  to,
  onClick,
  action,
}: {
  title: string;
  description?: ReactNode;
  status?: "done" | "wrong" | "active" | "new";
  to?: string;
  onClick?: () => void;
  action?: ReactNode;
  indicator?: ReactNode;
}) {
  const content = (
    <>
      {indicator ?? <span
        className={`list-status status-${status}`}
        aria-label={
          status === "done"
            ? "已完成"
            : status === "wrong"
              ? "待复习"
              : status === "active"
                ? "进行中"
                : "未学"
        }
      >
        {status === "done"
          ? "✓"
          : status === "wrong"
            ? "✕"
            : status === "active"
              ? "◐"
              : "○"}
      </span>}
      <span className="list-copy">
        <h3>{title}</h3>
        {description && <small>{description}</small>}
      </span>
      <ArrowRight size={16} />
    </>
  );
  return (
    <div className="list-item">
      {to ? (
        <Link to={to} aria-label={title}>
          {content}
        </Link>
      ) : (
        <Button onClick={onClick} variant="ghost" aria-label={title}>
          {content}
        </Button>
      )}
      {action}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <span className="empty-mark">✓</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {action}
    </div>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="text-input" />;
}
