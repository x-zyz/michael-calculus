import { useState } from "react";
import { Capacitor, registerPlugin } from "@capacitor/core";
import { Crown } from "lucide-react";
import UpdateCard from "./UpdateCard";
import DataImport from "../../components/DataImport";
import { useMembership } from "../../db/membership";
import {
  Accordion,
  Button,
  Card,
  PageHeader,
  ProgressBar,
  Sheet,
} from "../../components/ui";

const appHub = registerPlugin<{ open(): Promise<void> }>("AppHubAccount");

export default function SettingsPage() {
  const [guide, setGuide] = useState(false);
  const [accountError, setAccountError] = useState(false);
  const member = useMembership();
  return (
    <div className="page read-page">
      <PageHeader title="关于与数据备份" subtitle="0979 会员中心 · Michael calculus" />
      <Card className="member-card">
        <div className="member-card-head">
          <span className="member-emblem" aria-hidden="true">
            <Crown size={22} />
          </span>
          <div>
            <p className="eyebrow">0979 会员等级</p>
            <h2>
              {member.code} · {member.title}
            </h2>
          </div>
          <span className="member-points">{member.points} 积分</span>
        </div>
        <ProgressBar
          value={member.progress}
          label="0979 会员等级进度"
        />
        <p className="learning-note">
          {member.nextPoints
            ? `距下一等级还差 ${Math.max(0, member.nextPoints - member.points)} 积分 · 已完成 ${member.lessons} 节课程、掌握 ${member.mastered} 题、复习公式 ${member.reviews} 次。`
            : `已达最高等级 · 已完成 ${member.lessons} 节课程、掌握 ${member.mastered} 题、复习公式 ${member.reviews} 次。`}
        </p>
      </Card>
      <UpdateCard />
      {Capacitor.isPluginAvailable("AppHubAccount") && (
        <Card>
          <h2>App Hub 账号</h2>
          <Button onClick={() => {
            setAccountError(false);
            void appHub.open().catch(() => setAccountError(true));
          }}>管理账号</Button>
          {accountError && <p role="status">暂时无法打开账号页面。</p>}
        </Card>
      )}
      <Card>
        <h2>你的数学学习空间</h2>
        <p>
          课程、交互实验和公式间隔复习。数据保存在本机，离线可用。
        </p>
        <div className="learning-actions">
          <Button
            onClick={(e) => {
              e.currentTarget.focus();
              setGuide(true);
            }}
          >
            了解学习路径
          </Button>
        </div>
      </Card>
      <Accordion title="学习数据恢复 / 导入旧版备份">
        <DataImport />
      </Accordion>
      <p className="learning-note">
        AI
        问答、云同步和手写识别尚未开放。升级继续使用仓库固定签名；无需重新生成密钥。
      </p>
      <Sheet
        open={guide}
        onClose={() => setGuide(false)}
        title="从直觉，到独立解题。"
      >
        <p>每个知识点都沿着这条路径展开。</p>
        <ol>
          {[
            "直觉理解：先知道为什么",
            "交互实验：把变化看清楚",
            "数学定义：建立严谨的认识",
            "例题拆解：理解每一步的依据",
            "独立练习：验证自己的理解",
            "反馈复习：让知识真正留下来",
          ].map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>
        <Button variant="primary" onClick={() => setGuide(false)}>
          明白了 →
        </Button>
      </Sheet>
    </div>
  );
}
