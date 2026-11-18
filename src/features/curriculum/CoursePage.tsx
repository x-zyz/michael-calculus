import { useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import {
  chapters,
  lessons,
  problems,
  lessonExperiment,
  lessonSecant,
  lessonDerivativeApp,
} from "../../data/learning";
import { useLearning } from "../../db/learning";
import Formula from "../../components/Formula";
import {
  Accordion,
  Button,
  Card,
  ListItem,
  PageHeader,
  ProgressBar,
  Tabs,
  ActionLink,
  InfoTip,
} from "../../components/ui";
import { Experiment } from "../experiments/LimitLab";
import { SecantExperiment } from "../experiments/SecantLab";
import { DerivativeAppExperiment } from "../experiments/DerivativeLab";
import { IntegralExperiment } from "../experiments/IntegralLab";
import { integralModeForLesson } from "../../data/integrals";
import { IntegralApplicationsLab } from "../experiments/IntegralApplicationsLab";
import { applicationModeForLesson } from "../../data/integralApplications";
const steps = ["直觉", "实验", "定义", "例题", "练习"];
export default function CoursePage() {
  const { lessonId } = useParams();
  const [query] = useSearchParams();
  const { state, save } = useLearning();
  const lesson = lessons.find((l) => l.id === lessonId);
  if (query.get("lesson"))
    return <Navigate replace to={`/curriculum/${query.get("lesson")}`} />;
  function outline() {
    return chapters.map((c) => (
      <Accordion
        key={c.id}
        title={c.title}
        defaultOpen={!lesson || lesson.chapter === c.id}
      >
        {lessons
          .filter((l) => l.chapter === c.id)
          .map((l) => (
            <ListItem
              key={l.id}
              title={l.title}
              status={
                state.completed.includes(l.id)
                  ? "done"
                  : state.lastLesson === l.id && state.completed.length
                    ? "active"
                    : "new"
              }
              to={`/curriculum/${l.id}`}
            />
          ))}
      </Accordion>
    ));
  }
  return (
    <div className={`page ${lesson ? "" : "course-catalog"}`}>
      <PageHeader
        title="课程中心"
        subtitle={
          lesson
            ? undefined
            : `${lessons.length} 节课 · 已学 ${state.completed.length}/${lessons.length}`
        }
      />
      <div className="course-layout">
        <aside className="course-outline" aria-label="课程大纲">
          {outline()}
        </aside>
        <div className="lesson-reader">
          {lesson ? (
            <Lesson
              key={lesson.id}
              lesson={lesson}
              onCompleted={() =>
                save({
                  ...state,
                  lastLesson: lesson.id,
                  completed: [...new Set([...state.completed, lesson.id])],
                })
              }
            />
          ) : (
            <Card>
              <h2>从一个问题，走进高数。</h2>
              <p>
                选择左侧章节中的课时。每节课包含直觉、实验、定义、例题和练习五步。
              </p>
              <div className="learning-actions">
                <ActionLink
                  variant="primary"
                  to={`/curriculum/${state.lastLesson}`}
                >
                  继续学习 →
                </ActionLink>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
function Lesson({
  lesson,
  onCompleted,
}: {
  lesson: (typeof lessons)[number];
  onCompleted: () => void;
}) {
  const { state, save } = useLearning();
  const [step, setStep] = useState(state.completed.includes(lesson.id) ? 4 : 0);
  const chapter = chapters.find((c) => c.id === lesson.chapter)!;
  function change(next: number) {
    setStep(next);
    save({
      ...state,
      lastLesson: lesson.id,
      completed:
        next === 4
          ? [...new Set([...state.completed, lesson.id])]
          : state.completed,
    });
  }
  return (
    <>
      <Link className="mobile-course-back" to="/curriculum">
        ← 课程目录
      </Link>
      <Card>
        <span className="eyebrow">{chapter.title}</span>
        <h2>{lesson.title}</h2>
        <Tabs
          label="学习环节"
          items={steps.map((value) => ({ value, label: value }))}
          value={steps[step]}
          onChange={(value) => change(steps.indexOf(value))}
        />
        <ProgressBar label="本课学习步骤" value={((step + 1) / 5) * 100} />
        <small>
          第 {step + 1}/5 步 ·{" "}
          {state.completed.includes(lesson.id) ? "已完成阅读" : "学习中"}
        </small>
        <article className="lesson-copy" data-testid="lesson-content">
          {step === 0 && <p>{lesson.intuition}</p>}
          {step === 2 && (
            <>
              <Formula value={lesson.definition} />
              <p>{lesson.condition}</p>
              <Link
                className="about-link"
                to={`/review/formulas?lesson=${lesson.id}`}
              >
                背这节的公式 →
              </Link>
            </>
          )}
          {step === 3 && (
            <>
              <Formula value={lesson.example} />
              <ol>
                {lesson.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <p className="learning-tip">{lesson.takeaway}</p>
            </>
          )}
          {step === 4 && (
            <>
              <p>
                本节有 {problems.filter((p) => p.lessonId === lesson.id).length}{" "}
                道基础题。完成最后一步后进入练习，将理解变成解题能力。
              </p>
              <p className="learning-note">支持数值、分数答案和分级提示。</p>
            </>
          )}
        </article>
        {step === 1 && (
          <>
            <InfoTip label="实验说明">
              图形和有限采样用于观察，不代替数学证明。
            </InfoTip>
            {lesson.chapter === 1 ? (
              <Experiment initialKind={lessonExperiment[lesson.id] || "hole"} />
            ) : lesson.chapter === 2 ? (
              <SecantExperiment
                initialKind={lessonSecant[lesson.id] || "square"}
              />
            ) : lesson.chapter === 5 ? (
              <IntegralApplicationsLab initialMode={applicationModeForLesson(lesson.id)} />
            ) : lesson.chapter === 4 ? (
              <IntegralExperiment initialMode={integralModeForLesson(lesson.id)} />
            ) : (
              <DerivativeAppExperiment
                initialKind={lessonDerivativeApp[lesson.id] || "mvt"}
              />
            )}
          </>
        )}
      </Card>
      <div className="lesson-footer">
        <small>
          {steps[step]} · {step + 1}/5
        </small>
        {step < 4 ? (
          <Button variant="primary" onClick={() => change(step + 1)}>
            下一步 →
          </Button>
        ) : (
          <Link
            className="btn btn-primary"
            to={`/practice?lesson=${lesson.id}`}
            onClick={onCompleted}
          >
            完成阅读，开始练习 →
          </Link>
        )}
      </div>
    </>
  );
}
