import { Link } from "react-router-dom";
import {
  chapters,
  lessons,
  computeMastery,
  problems,
} from "../../data/learning";
import { firstLessonId, textbookSections } from "../../data/textbookSections";
import { useLearning } from "../../db/learning";
import { useFormulas } from "../../db/formulas";
import { counters } from "../formulas/engine";
import {
  ActionLink,
  Card,
  PageHeader,
  StatTile,
  ProgressBar,
  SectionHeader,
} from "../../components/ui";
import MathArtwork from "../../components/MathArtwork";
export default function Dashboard() {
  const { state } = useLearning();
  const { store } = useFormulas();
  const lesson = lessons.find((l) => l.id === state.lastLesson) || lessons[0];
  const chapter = chapters.find((c) => c.id === lesson.chapter)!;
  const hasProgress =
    state.completed.length > 0 ||
    state.attempts.length > 0 ||
    state.lastLesson !== firstLessonId;
  const mastery = computeMastery(state.attempts);
  const counts = counters(store);
  const latest = new Map(state.attempts.map((a) => [a.problemId, a.correct]));
  const pending = problems.filter((p) => latest.get(p.id) === false).length;
  return (
    <div className="page dashboard">
      <PageHeader title="学习首页" />
      <Card variant="emphasis" className="home-focus">
        <div className="home-visual" aria-hidden="true">
          <MathArtwork />
        </div>
        <p>
          {hasProgress ? `继续学习 · ${chapter.title}` : "从 §1.1 函数开始"}
        </p>
        <h2>{lesson.title}</h2>
        <p>
          当前环节 · {state.completed.includes(lesson.id) ? "练习" : "直觉"}
        </p>
        <p>
          已学 {state.completed.length} / {lessons.length} 节
        </p>
        <ProgressBar
          label="课程阅读进度"
          value={(state.completed.length / lessons.length) * 100}
        />
        <div className="learning-actions">
          <ActionLink variant="primary" to={`/curriculum/${lesson.id}`}>
            {hasProgress ? "继续学习" : "开始学习"} →
          </ActionLink>
          <Link to="/curriculum">查看全部课程</Link>
        </div>
      </Card>
      <div className="stat-row">
        <StatTile value={pending} label="待复习错题" to="/review" />
        <StatTile
          value={counts.due}
          label="今日到期公式"
          to="/review/formulas"
        />
        <StatTile
          value={mastery.chapters.reduce((n, c) => n + c.mastered, 0)}
          label="已掌握题数"
          to="/review"
        />
      </div>
      <Card>
        <SectionHeader
          title="课程地图"
          action={<Link to="/curriculum">课程目录 →</Link>}
        />
        {chapters.map((c) => {
          const list = lessons.filter((l) => l.chapter === c.id),
            done = list.filter((l) => state.completed.includes(l.id)).length;
          return (
            <Link
              className="chapter-progress"
              key={c.id}
              to={`/curriculum/${textbookSections[c.id][0].lessons[0]}`}
            >
              <strong>{c.title}</strong>
              <small>
                {done}/{list.length}
              </small>
              <ProgressBar
                value={(done / list.length) * 100}
                label={`${c.title}阅读进度`}
              />
            </Link>
          );
        })}
      </Card>
      <Link className="about-link" to="/assistant">
        AI 教师 · 尚未开放 →
      </Link>
    </div>
  );
}
