import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { Moon, Sun, Settings, ChevronRight } from "lucide-react";
import { learningModules, modules } from "./modules";
import { readTheme, saveTheme } from "../db/preferences";
import { LearningProvider, useLearning } from "../db/learning";
import { FormulaProvider, useFormulas } from "../db/formulas";
import { Button, EmptyState, ActionLink } from "../components/ui";
import Dashboard from "../features/dashboard/Dashboard";
import CoursePage from "../features/curriculum/CoursePage";
import ExperimentsPage from "../features/experiments/ExperimentsPage";
import PracticePage from "../features/practice/PracticePage";
import ReviewPage from "../features/review/ReviewPage";
import FormulaPages from "../features/formulas/FormulaPages";
import AssistantStatus from "../components/AssistantStatus";
import SettingsPage from "../features/settings/SettingsPage";
export default function App() {
  return (
    <LearningProvider>
      <FormulaProvider>
        <Workspace />
      </FormulaProvider>
    </LearningProvider>
  );
}
function Workspace() {
  const { storageError: learningError } = useLearning();
  const { storageError: formulaError } = useFormulas();
  const [theme, setTheme] = useState(readTheme);
  const location = useLocation();
  const active = modules.find((m) =>
    m.path === "/"
      ? location.pathname === "/"
      : location.pathname === m.path ||
        location.pathname.startsWith(m.path + "/"),
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    saveTheme(theme);
  }, [theme]);
  useEffect(() => {
    document.title = `${active?.label || "关于与数据备份"} · Michael calculus`;
    window.scrollTo(0, 0);
  }, [active, location.pathname]);
  return (
    <div className="app-shell">
      <a
        className="skip-link"
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        跳到主要内容
      </a>
      <aside className="sidebar">
        <Link className="brand" to="/" aria-label="Michael calculus 首页">
          <span className="brand-mark">m∫</span>
          <span>
            <strong className="brand-name">Michael</strong>
            <span className="brand-caption">CALCULUS</span>
          </span>
        </Link>
        <nav className="main-nav" aria-label="主导航">
          {learningModules.map(({ path, label, icon: Icon }) => (
            <NavLink key={path} to={path} end={path === "/"}>
              <Icon size={24} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <Link to="/settings">
            <Settings size={20} />
            关于 / 数据备份
          </Link>
          <small>本机学习 · 离线可用</small>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <div className="breadcrumb">
            <Link to="/">学习空间</Link>
            <ChevronRight size={16} />
            <strong>{active?.label || "关于与数据备份"}</strong>
          </div>
          <div className="top-actions">
            <Button
              className="icon-button"
              variant="ghost"
              aria-label={theme === "light" ? "切换深色主题" : "切换浅色主题"}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
            </Button>
            <Link
              className="btn btn-ghost icon-button"
              to="/settings"
              aria-label="关于与数据备份"
            >
              <Settings size={24} />
            </Link>
          </div>
        </header>
        <main id="main-content" tabIndex={-1}>
          {(learningError || formulaError) && (
            <p role="alert" className="storage-alert">
              当前无法保存本地数据，关闭应用后本次进度可能丢失。请检查设备存储空间。
            </p>
          )}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/curriculum" element={<CoursePage />} />
            <Route path="/curriculum/:lessonId" element={<CoursePage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/review/formulas" element={<FormulaPages />} />
            <Route path="/experiments" element={<ExperimentsPage />} />
            <Route path="/experiments/:labId" element={<ExperimentsPage />} />
            <Route path="/assistant" element={<AssistantStatus />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route
              path="*"
              element={
                <div className="page">
                  <EmptyState
                    title="这个坐标还没有内容"
                    description="回到首页，继续你的数学之旅。"
                    action={
                      <ActionLink variant="primary" to="/">
                        回到学习首页 →
                      </ActionLink>
                    }
                  />
                </div>
              }
            />
          </Routes>
        </main>
        <footer className="footer">Michael calculus · 让数学看得见</footer>
      </div>
      <nav className="mobile-nav" aria-label="移动导航">
        {learningModules.map(({ path, short, icon: Icon }) => (
          <NavLink key={path} to={path} end={path === "/"}>
            <Icon size={24} />
            <span>{short}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
