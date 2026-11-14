import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CircleDashed, Construction } from 'lucide-react';
import { modules } from '../app/modules';
import { modulePreviews } from '../data/modulePreviews';

export default function ModulePage({ module }: { module: typeof modules[number] }) {
  const preview = modulePreviews[module.path];
  const next = modules[(modules.findIndex(x => x.path === module.path) + 1) % modules.length];
  return <div className="page module-page"><div className="page-intro"><div><span className="eyebrow">{module.english}</span><h1>{module.label}</h1><p>{preview.subtitle}</p></div><span className="outline-tag">基础版 · 模块预览</span></div><section className="module-hero"><div><span className="hero-pill">从这里开始探索</span><h2>{preview.title}</h2><p>让每个概念有来处，让每次练习有收获。</p></div><module.icon size={96} strokeWidth={.8}/></section><div className="scope-notice"><Construction size={18}/><div><strong>正在准备更完整的学习体验</strong><p>{preview.stage}</p></div></div><div className="preview-grid">{preview.items.map((item, i) => <article className="preview-card" key={item.title}><div className="preview-top"><span className="math-symbol">{item.symbol}</span><span className="preview-number">0{i + 1}</span></div><span className="eyebrow">{item.meta}</span><h2>{item.title}</h2><p>{item.detail}</p><div className="preview-status"><CircleDashed size={14}/> 即将开放</div></article>)}</div><div className="module-bottom"><Link to="/"><ArrowLeft size={16}/> 返回学习首页</Link><Link to={next.path}>看看{next.label} <ArrowRight size={16}/></Link></div></div>;
}
