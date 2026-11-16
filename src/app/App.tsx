import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronRight, Compass, Moon, PanelLeftClose, Sun } from 'lucide-react';
import { learningModules, modules } from './modules';
import { copy, locale } from './i18n';
import { readTheme, saveTheme } from '../db/preferences';
import Dashboard from '../features/dashboard/Dashboard';
import { LearningProvider, useLearning } from '../db/learning';
import { CoursePage, ExperimentsPage, PracticePage, ReviewPage } from '../features/learning/LearningPages';
import { FormulaProvider, useFormulas } from '../db/formulas';
import FormulaPages from '../features/formulas/FormulaPages';
import AssistantStatus from '../components/AssistantStatus';

export default function App() { return <LearningProvider><FormulaProvider><Workspace/></FormulaProvider></LearningProvider>; }

function Workspace() {
  const {storageError: learningError} = useLearning();
  const {storageError: formulaError} = useFormulas();
  const storageError=learningError || formulaError;
  const [theme, setTheme] = useState(readTheme);
  const [guideOpen, setGuideOpen] = useState(false);
  const guideClose = useRef<HTMLButtonElement>(null);
  const guideTrigger = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const active = modules.find(m => m.path === location.pathname || (m.path === '/review' && location.pathname.startsWith('/review/')));
  useEffect(() => { document.documentElement.dataset.theme = theme; saveTheme(theme); }, [theme]);
  useEffect(() => { document.title = `${active?.label || '页面未找到'} · Michael calculus`; window.scrollTo(0, 0); }, [active]);
  useEffect(() => { if (guideOpen) guideClose.current?.focus(); }, [guideOpen]);
  function closeGuide() { setGuideOpen(false); guideTrigger.current?.focus(); }
  return <div className="app-shell">
    <a href="#main-content" className="skip-link" onClick={e => { e.preventDefault(); document.getElementById('main-content')?.focus(); }}>跳到主要内容</a>
    <aside className="sidebar">
      <Link to="/" className="brand" aria-label="Michael calculus 首页"><span className="brand-mark">m<span>∫</span></span><span><strong>Michael<span className="brand-calculus">calculus</span></strong></span></Link>
      <div className="workspace-label">你的数学学习空间 <PanelLeftClose size={15}/></div>
      <nav aria-label="主导航" className="main-nav">{learningModules.map(({ path, label, icon: Icon }) => <NavLink key={path} to={path} end={path !== "/review"}><Icon size={19}/><span>{label}</span></NavLink>)}</nav>
      <div className="sidebar-bottom">
        <div className="sidebar-note"><span className="note-symbol">✳</span><h3>理解，比记住更重要。</h3><p>给每一个「为什么」，<br/>留一点探索的时间。</p><button ref={guideTrigger} onClick={() => setGuideOpen(true)}>了解学习路径 <ArrowRight size={14}/></button></div>
        <div className="local-profile"><span className="avatar">M</span><div><strong>我的学习空间</strong><small>本地体验 · 无需登录</small></div><span className="profile-status"/></div>
      </div>
    </aside>
    <div className="workspace">
      <header className="topbar"><div className="breadcrumb"><span>学习空间</span><ChevronRight size={14}/><strong>{active?.label || '页面未找到'}</strong></div><div className="top-actions"><span className="version-badge"><i/> v0.6.2</span><button className="icon-button" aria-label={theme === 'light' ? '切换深色主题' : '切换浅色主题'} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme === 'light' ? <Moon size={18}/> : <Sun size={18}/>}</button><span className="top-avatar">M</span></div></header>
      <main id="main-content" tabIndex={-1}>{storageError && <p role="alert" className="storage-alert">当前无法保存本地数据，关闭应用后本次进度可能丢失。请检查设备存储空间。</p>}<Routes><Route path="/" element={<Dashboard/>}/><Route path="/review/formulas" element={<FormulaPages/>}/><Route path="/assistant" element={<AssistantStatus/>}/>{learningModules.slice(1).map(module => <Route key={module.path} path={module.path} element={module.path === '/curriculum' ? <CoursePage/> : module.path === '/experiments' ? <ExperimentsPage/> : module.path === '/practice' ? <PracticePage/> : <ReviewPage/>}/>)}<Route path="*" element={<div className="not-found"><Compass size={40}/><h1>这个坐标还没有内容</h1><p>回到首页，继续你的数学之旅。</p><Link className="primary-button" to="/">回到学习首页 <ArrowRight size={16}/></Link></div>}/></Routes></main>
      <footer className="footer"><span>{copy[locale].title} <span className="footer-dot">·</span> {copy[locale].subtitle}</span><span>从一个「为什么」开始 <span className="tiny-star">✳</span></span></footer>
    </div>
    <nav className="mobile-nav" aria-label="移动导航">{learningModules.map(({path,short,icon:Icon}) => <NavLink key={path} to={path} end={path !== "/review"}><Icon size={20}/><span>{short}</span></NavLink>)}</nav>
    {guideOpen && <div className="modal-backdrop" onClick={closeGuide}><section className="guide-modal" role="dialog" aria-modal="true" aria-labelledby="guide-title" onClick={e => e.stopPropagation()} onKeyDown={e => { if(e.key === 'Escape') closeGuide(); if(e.key === 'Tab') { e.preventDefault(); guideClose.current?.focus(); } }}><span className="eyebrow">THE LEARNING LOOP</span><h2 id="guide-title">从直觉，到独立解题。</h2><p>每个知识点都将沿着这条路径展开。</p><ol>{['直觉理解：先知道为什么', '交互实验：把变化看清楚', '数学定义：建立严谨的认识', '例题拆解：理解每一步的依据', '独立练习：验证自己的理解', '反馈复习：让知识真正留下来'].map(x => <li key={x}>{x}</li>)}</ol><p className="muted">已开放极限、导数与中值定理应用的十二节课程、三类交互实验和二十四道练习，学习记录保存在本机。</p><button ref={guideClose} className="primary-button" onClick={closeGuide}>明白了 <ArrowRight size={16}/></button></section></div>}
  </div>;
}
