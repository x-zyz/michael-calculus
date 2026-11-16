import { ArrowRight, ChartNoAxesCombined, GraduationCap, NotebookPen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { chapters, lessons } from '../../data/learning';
import { useLearning } from '../../db/learning';
import { TodayFormulas } from '../formulas/FormulaPages';

const shortcuts = [
  { title: '做练习', detail: '按章节选题，查看提示和解析', icon: NotebookPen, path: '/practice' },
  { title: '看错题', detail: '重做错题，查看薄弱考点', icon: GraduationCap, path: '/review' },
  { title: '做实验', detail: '观察极限、切线与导数的变化', icon: ChartNoAxesCombined, path: '/experiments' },
];

export default function Dashboard() {
  const { state } = useLearning();
  const lesson = lessons.find(({ id }) => id === state.lastLesson) ?? lessons[0];
  const chapter = chapters.find(({ id }) => id === lesson.chapter);
  const hasProgress = lesson.id !== lessons[0].id || state.completed.length > 0 || state.attempts.length > 0;

  return (
    <div className="page dashboard learning-home">
      <h1>学习首页</h1>
      <section className="learning-card home-next">
        <p>{chapter?.title}</p>
        <h2>{lesson.title}</h2>
        <p>已学 {state.completed.length} / {lessons.length} 节</p>
        <Link className="primary-button" to={`/curriculum?lesson=${lesson.id}`}>
          {hasProgress ? '继续学习' : '开始学习'} <ArrowRight size={17} />
        </Link>
        <Link className="home-course-link" to="/curriculum">查看全部课程</Link>
      </section>

      <section>
        <h2>练习与复习</h2>
        <div className="home-shortcuts">
          {shortcuts.map(({ title, detail, icon: Icon, path }) => (
            <Link className="learning-card" key={path} to={path}>
              <Icon size={20} aria-hidden="true" />
              <div><h3>{title}</h3><p>{detail}</p></div>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          ))}
        </div>
        <TodayFormulas />
      </section>

      <nav aria-label="开发计划">
        <Link className="home-plan-link" to="/assistant">AI 教师 · 尚未开放</Link>
      </nav>
    </div>
  );
}
