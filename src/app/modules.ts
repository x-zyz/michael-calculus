import { BookOpen, ChartNoAxesCombined, Sigma, LayoutGrid, MessagesSquare, NotebookPen } from 'lucide-react';
export const modules = [
  { path: '/', label: '学习首页', short: '首页', english: 'OVERVIEW', icon: LayoutGrid },
  { path: '/curriculum', label: '课程中心', short: '课程', english: 'CURRICULUM', icon: BookOpen },
  { path: '/experiments', label: '数学图像', short: '图像', english: 'MATH LAB', icon: ChartNoAxesCombined },
  { path: '/practice', label: '练习中心', short: '练习', english: 'PRACTICE', icon: NotebookPen },
  { path: '/review/formulas', label: '公式记忆中心', short: '公式', english: 'FORMULAS', icon: Sigma },
  { path: '/assistant', label: 'AI 教师', short: '教师', english: 'ASSISTANT', icon: MessagesSquare },
] as const;

export const learningModules = modules.filter(({ path }) => path !== '/assistant');
