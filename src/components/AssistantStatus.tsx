import { PageHeader, Card, EmptyState, ActionLink } from './ui';
export default function AssistantStatus(){return <div className="page read-page"><PageHeader title="AI 教师" subtitle="尚未开放。本版本尚未提供 AI 问答。"/><Card><EmptyState title="先让理解发生" description="练习中心已有分级提示和解析，可以帮助你独立找到下一步。" action={<ActionLink variant="primary" to="/practice">去做练习</ActionLink>}/></Card></div>;}
