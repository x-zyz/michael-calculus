import { useState } from "react";
import UpdateCard from "./UpdateCard";
import DataImport from "../../components/DataImport";
import {
  Accordion,
  Button,
  Card,
  PageHeader,
  Sheet,
} from "../../components/ui";
export default function SettingsPage() {
  const [guide, setGuide] = useState(false);
  return (
    <div className="page read-page">
      <PageHeader title="关于与数据备份" subtitle="Michael calculus" />
      <UpdateCard />
      <Card>
        <h2>你的数学学习空间</h2>
        <p>
          十二节课程、三类交互实验和公式间隔复习。数据保存在本机，离线可用。
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
