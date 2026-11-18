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
import { textbookSections } from "../../data/textbookSections";
import { formulas } from "../../data/formulas";
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
const lessonsById = new Map(lessons.map((lesson) => [lesson.id, lesson]));

function lessonLab(id: string) {
  if (id in lessonExperiment) return <Experiment initialKind={lessonExperiment[id]} />;
  if (id in lessonSecant) return <SecantExperiment initialKind={lessonSecant[id]} />;
  if (id in lessonDerivativeApp) return <DerivativeAppExperiment initialKind={lessonDerivativeApp[id]} />;
  if (["antiderivative", "riemann", "fundamental-theorem"].includes(id)) {
    return <IntegralExperiment initialMode={integralModeForLesson(id)} />;
  }
  if (["integral-area", "integral-volume", "integral-arc"].includes(id)) {
    return <IntegralApplicationsLab initialMode={applicationModeForLesson(id)} />;
  }
}
export default function CoursePage() {
  const { lessonId } = useParams();
  const [query] = useSearchParams();
  const { state, save } = useLearning();
  const lesson = lessonId ? lessonsById.get(lessonId) : undefined;
  if (query.get("lesson"))
    return <Navigate replace to={`/curriculum/${query.get("lesson")}`} />;
  function outline() {
    return chapters.map((c) => (
      <Accordion
        key={c.id}
        title={c.title}
        defaultOpen={!lesson || lesson.chapter === c.id}
      >
        {textbookSections[c.id].map((section) => (
          <section className="course-section" key={section.number}>
            <h3>{section.optional ? "*" : ""}§{section.number} {section.title}</h3>
            {section.lessons.map((id) => (
              <ListItem
                key={id}
                title={lessonsById.get(id)!.title}
                status={
                  state.completed.includes(id)
                    ? "done"
                    : state.lastLesson === id && state.completed.length
                      ? "active"
                      : "new"
                }
                to={`/curriculum/${id}`}
              />
            ))}
          </section>
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
                按教材节号选课，查看讲解与例题，再完成配套练习。
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
  const lab = lessonLab(lesson.id);
  const steps = lab ? ["直觉", "实验", "定义", "例题", "练习"] : ["直觉", "定义", "例题", "练习"];
  const [step, setStep] = useState(state.completed.includes(lesson.id) ? steps.length - 1 : 0);
  const currentStep = steps[step];
  const chapter = chapters.find((c) => c.id === lesson.chapter)!;
  const section = textbookSections[lesson.chapter].find(({ lessons }) => lessons.includes(lesson.id));
  function change(next: number) {
    setStep(next);
    save({
      ...state,
      lastLesson: lesson.id,
      completed:
        next === steps.length - 1
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
        <span className="eyebrow">{chapter.title}{section && ` · §${section.number}`}</span>
        <h2>{lesson.title}</h2>
        <Tabs
          label="学习环节"
          items={steps.map((value) => ({ value, label: value }))}
          value={steps[step]}
          onChange={(value) => change(steps.indexOf(value))}
        />
        <ProgressBar label="本课学习步骤" value={((step + 1) / steps.length) * 100} />
        <small>
          第 {step + 1}/{steps.length} 步 ·{" "}
          {state.completed.includes(lesson.id) ? "已完成阅读" : "学习中"}
        </small>
        <article className="lesson-copy" data-testid="lesson-content">
          {currentStep === "直觉" && <p>{lesson.intuition}</p>}
          {currentStep === "定义" && (
            <>
              <Formula value={lesson.definition} />
              <p>{lesson.condition}</p>
              {formulas.some((formula) => formula.lessonId === lesson.id) && (
                <Link className="about-link" to={`/review/formulas?lesson=${lesson.id}`}>
                  背这节的公式 →
                </Link>
              )}
            </>
          )}
          {currentStep === "例题" && (
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
          {currentStep === "练习" && (
            <>
              <p>
                本节有 {problems.filter((p) => p.lessonId === lesson.id).length}{" "}
                道基础题。完成最后一步后进入练习，将理解变成解题能力。
              </p>
              <p className="learning-note">支持数值、分数答案和分级提示。</p>
            </>
          )}
        </article>
        {currentStep === "实验" && (
          <>
            <InfoTip label="实验说明">
              图形和有限采样用于观察，不代替数学证明。
            </InfoTip>
            {lab}
          </>
        )}
      </Card>
      <div className="lesson-footer">
        <small>
          {steps[step]} · {step + 1}/{steps.length}
        </small>
        {step < steps.length - 1 ? (
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
