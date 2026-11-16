import { Link } from 'react-router-dom';

export default function AssistantStatus() {
  return (
    <div className="page learning-page">
      <h1>AI 教师</h1>
      <p>尚未开放。本版本尚未提供 AI 问答。</p>
      <div className="learning-card">
        <h2>看当前题目的提示</h2>
        <p>练习中心提供分级提示和解析。</p>
        <Link className="primary-button" to="/practice">去做练习</Link>
      </div>
    </div>
  );
}
