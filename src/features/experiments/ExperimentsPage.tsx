import { useParams, Link } from "react-router-dom";
import {
  Card,
  PageHeader,
  ActionLink,
  InfoTip,
  EmptyState,
} from "../../components/ui";
import { Experiment } from "./LimitLab";
import { SecantExperiment } from "./SecantLab";
import { DerivativeAppExperiment } from "./DerivativeLab";
import { IntegralExperiment } from "./IntegralLab";
import { IntegralApplicationsLab } from "./IntegralApplicationsLab";
const labs = [
  {
    id: "limits",
    title: "左右极限逼近",
    description: "从两侧靠近同一点，看见趋近与间断。",
    symbol: "lim",
    lesson: "limit",
  },
  {
    id: "secant",
    title: "割线、切线与微分",
    description: "拖动步长，观察平均变化率走向瞬时变化率。",
    symbol: "f ′",
    lesson: "derivative",
  },
  {
    id: "derivatives",
    title: "中值定理与导数应用",
    description: "在曲线上寻找中值点，观察洛必达与极值。",
    symbol: "ξ",
    lesson: "mvt",
  },
  { id: "integrals", title: "不定积分与定积分", description: "平移原函数、比较取样矩形，并观察变上限积分。", symbol: "∫", lesson: "riemann", chapter: 5 },
  { id: "integral-applications", title: "定积分的应用", description: "观察曲线间的面积、旋转体截面和逼近弧长的折线。", symbol: "S", lesson: "integral-area", chapter: 5 },
];
export default function ExperimentsPage() {
  const { labId } = useParams();
  const lab = labs.find((l) => l.id === labId);
  return (
    <div className={`page ${labId ? "read-page" : ""}`}>
      <PageHeader
        title="数学实验室"
        subtitle={lab?.description || "先选择一个实验，再亲手改变参数。"}
        action={
          <InfoTip label="实验说明">
            图形和有限采样用于观察，不代替数学证明。
          </InfoTip>
        }
      />
      {!labId ? (
        <div className="lab-grid">
          {labs.map((l) => (
            <Card key={l.id}>
              <div className="lab-thumbnail" aria-hidden="true">
                <svg viewBox="0 0 240 100" aria-hidden="true">
                  <path
                    d="M15 80H225M40 90V10"
                    stroke="var(--muted)"
                    fill="none"
                    opacity=".4"
                  />
                  <path
                    d={
                      l.id === "limits"
                        ? "M25 70Q80 65 115 45M125 40Q170 15 220 20"
                        : l.id === "secant"
                          ? "M30 75Q120 85 215 15M65 85L205 25"
                          : "M30 25C90 100 95 90 125 50S180 0 215 65"
                    }
                    stroke="var(--info)"
                    strokeWidth="3"
                    fill="none"
                  />
                  <text x="160" y="85" fill="var(--nav-text)">
                    {l.symbol}
                  </text>
                </svg>
              </div>
              <h2>{l.title}</h2>
              <p>{l.description}</p>
              <div className="learning-actions">
                <ActionLink to={`/experiments/${l.id}`}>进入实验 →</ActionLink>
                <Link to={`/curriculum/${l.lesson}`}>关联课时</Link>
              </div>
            </Card>
          ))}
        </div>
      ) : lab ? (
        <>
          <Link className="about-link" to="/experiments">
            ← 全部实验
          </Link>
          {lab.id === "limits" ? (
            <Experiment />
          ) : lab.id === "secant" ? (
            <SecantExperiment />
          ) : lab.id === "integral-applications" ? (
            <IntegralApplicationsLab />
          ) : lab.id === "integrals" ? (
            <IntegralExperiment />
          ) : (
            <DerivativeAppExperiment />
          )}
          <div className="learning-actions">
            <ActionLink variant="primary" to={lab.chapter ? "/practice?chapter=" + lab.chapter : "/practice"}>
              观察完了，去练习 →
            </ActionLink>
          </div>
        </>
      ) : (
        <EmptyState
          title="没有找到这个实验"
          action={<ActionLink to="/experiments">返回实验室</ActionLink>}
        />
      )}
    </div>
  );
}
