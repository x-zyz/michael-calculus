import { BookOpen, ChartNoAxesCombined, GraduationCap, LayoutGrid, MessagesSquare, NotebookPen } from 'lucide-react';
export const modules = [
  { path: '/', label: '学习首页', short: '首页', english: 'OVERVIEW', icon: LayoutGrid },
  { path: '/curriculum', label: '课程中心', short: '课程', english: 'CURRICULUM', icon: BookOpen },
  { path: '/experiments', label: '数学实验室', short: '实验', english: 'MATH LAB', icon: ChartNoAxesCombined },
  { path: '/practice', label: '练习中心', short: '练习', english: 'PRACTICE', icon: NotebookPen },
  { path: '/review', label: '错题与复习', short: '复习', english: 'REVIEW', icon: GraduationCap },
  { path: '/assistant', label: 'AI 教师', short: '教师', english: 'ASSISTANT', icon: MessagesSquare },
] as const;
