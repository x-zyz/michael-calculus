import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, ChartNoAxesCombined, ChevronRight, CircleCheck, Clock3, GraduationCap, Layers3, MoveUpRight, NotebookPen, Sparkles } from 'lucide-react';
import { useLearning } from '../../db/learning';
import { lessons } from '../../data/learning';
import MathArtwork from '../../components/MathArtwork';

const entries = [
  { title: '学习新概念', detail: '从直觉出发，理解数学', icon: BookOpen, path: '/curriculum', cls: 'blue', index: '01' },
  { title: '走进数学实验室', detail: '拖动、观察，发现规律', icon: ChartNoAxesCombined, path: '/experiments', cls: 'green', index: '02' },
  { title: '动笔练一练', detail: '把理解变成解题能力', icon: NotebookPen, path: '/practice', cls: 'orange', index: '03' },
  { title: '让知识更牢固', detail: '回看错题，补齐薄弱点', icon: GraduationCap, path: '/review', cls: 'purple', index: '04' },
];
export default function Dashboard() {
  const {state}=useLearning(); const percent=Math.round(state.completed.length/lessons.length*100); const days=new Set(state.attempts.map(a=>new Date(a.at).toLocaleDateString())).size;
  return <div className="page dashboard">
    <div className="page-intro"><div><div className="eyebrow">A LITTLE PROGRESS, EVERY DAY</div><h1>今天，也离数学更近一步<span className="greeting-star">✳</span></h1><p>不急着记住答案，先弄懂它为什么成立。</p></div><span className="intro-tag"><span/> 你的学习旅程，从这里开始</span></div>
    <div className="hero-grid">
      <section className="hero-card"><div className="hero-content"><div className="hero-kicker"><span className="hero-pill">探索高等数学</span><span>看见 · 理解 · 掌握</span></div><h2>数学，<br/>可以<span className="hero-emphasis">看得见。</span></h2><p>从左右逼近与割线移动，<br/>看懂极限和导数的含义。</p><Link to={`/curriculum?lesson=${state.lastLesson}`} className="hero-button">{state.completed.length || state.attempts.length ? '继续学习' : '开始学习极限'} <ArrowRight size={17}/></Link><div className="hero-footnote"><span/> 函数与极限 <span className="dot-separator">·</span> 导数与微分</div></div><div className="hero-art"><MathArtwork/><span className="art-caption">THE BEAUTY OF CHANGE <span>fig. 01</span></span></div></section>
      <section className="journey-card"><div className="card-heading"><h2>我的学习旅程</h2><span className="small-icon"><Layers3 size={17}/></span></div><div className="journey-progress"><div className="progress-ring"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="42"/><circle style={{strokeDasharray:`${percent*2.64} 264`}} className="ring-start" cx="50" cy="50" r="42"/></svg><div><strong>{percent}<span>%</span></strong><small>课程阅读进度</small></div></div><div className="progress-copy"><strong>每一小步，都算数</strong><p>本机保存学习进度<br/>下次打开继续学习</p></div></div><div className="journey-stats"><div><strong>{state.completed.length} <small>个</small></strong><span>已学知识点</span></div><div><strong>{state.attempts.length} <small>次</small></strong><span>累计作答</span></div><div><strong>{days} <small>天</small></strong><span>练习天数</span></div></div><div className="journey-note"><Sparkles size={15}/><span>保持好奇，就是最好的开始。</span></div></section>
    </div>
    <section className="quick-section"><div className="section-heading"><h2>今天，从哪里开始？</h2><span>找到适合你的学习节奏</span></div><div className="quick-grid">{entries.map(({title,detail,icon:Icon,path,cls,index}) => <Link className="quick-card" key={path} to={path}><div className="quick-top"><span className={`entry-icon ${cls}`}><Icon size={23}/></span><MoveUpRight size={17} className="quick-arrow"/></div><div><h3>{title}</h3><p>{detail}</p></div><span className="quick-index">{index}</span></Link>)}</div></section>
    <div className="bottom-grid">
      <section className="course-overview"><div className="section-heading"><h2>一张地图，读懂高数</h2><Link to="/curriculum">全部课程 <ArrowRight size={15}/></Link></div><div className="chapter-list"><Link to="/curriculum?lesson=limit" className="chapter-row"><span className="chapter-number">01</span><div><span className="chapter-eyebrow">CHAPTER ONE</span><h3>函数、极限与连续</h3><p>从无限接近，走向精确理解</p></div><span className="chapter-badge">已开放 5 节</span><ChevronRight size={17}/></Link><Link to="/curriculum?lesson=derivative" className="chapter-row"><span className="chapter-number">02</span><div><span className="chapter-eyebrow">CHAPTER TWO</span><h3>导数与微分</h3><p>用变化率，描述变化的世界</p></div><span className="chapter-badge">已开放 4 节</span><ChevronRight size={17}/></Link></div><div className="course-bottom"><BookOpen size={14}/><span>一条完整路径：直觉 → 实验 → 定义 → 练习</span></div></section>
      <section className="roadmap-card"><div className="section-heading"><h2>我们正在构建</h2><span className="outline-tag">开发进度</span></div><p className="roadmap-intro">让每一份理解，都有扎实的基础。</p><div className="milestone done"><CircleCheck size={19}/><div><strong>搭建学习空间</strong><span>六大模块 · 响应式界面 · 主题切换</span></div><span className="milestone-state">当前版本</span></div><div className="milestone"><Clock3 size={19}/><div><strong>极限与导数微分已可学习</strong><span>9 节课程 · 双交互实验 · 18 道练习</span></div><span className="milestone-state">已开放</span></div><Link to="/experiments" className="roadmap-link">进入数学实验室 <ArrowRight size={15}/></Link></section>
    </div>
    <div className="thought"><span>“</span><p>数学的本质，在于它的自由。<small>— 格奥尔格·康托尔</small></p><span className="thought-decoration">∞</span></div>
  </div>;
}
