// Scope: CL-001 previews only. Lessons and exercises will be data-driven in CL-003+.
export const modulePreviews: Record<string, { title: string; subtitle: string; stage: string; items: { title: string; detail: string; symbol: string; meta: string }[] }> = {
  '/curriculum': { title: '把知识，连成一张地图。', subtitle: '从极限到微积分，让每一个新概念都有迹可循。', stage: '课程目录与阅读器正在准备中，后续版本开放。', items: [
    { title: '函数、极限与连续', detail: '函数极限 · 两个重要极限 · 等价无穷小 · 连续性与间断点', symbol: 'lim', meta: '第一章 / 基础篇' },
    { title: '导数与微分', detail: '导数定义 · 基本求导 · 复合函数 · 隐函数与微分', symbol: 'f ′', meta: '第二章 / 变化篇' },
    { title: '积分与更多探索', detail: '不定积分 · 定积分 · 多元微积分 · 微分方程', symbol: '∫', meta: '后续章节 / 拓展篇' },
  ] },
  '/experiments': { title: '拖动一下，数学就动了。', subtitle: '让抽象的定义，成为你亲眼看到的变化。', stage: '交互实验将在后续版本陆续开放。当前为实验介绍。', items: [
    { title: '左右极限逼近', detail: '从左右两侧靠近同一个点，观察函数值是否走向同一个答案。', symbol: '→', meta: '实验 01 / 极限' },
    { title: '割线与切线', detail: '让两个点慢慢靠近，看看割线如何走向切线。', symbol: 'f ′', meta: '实验 02 / 导数' },
    { title: '分段函数连续性', detail: '改变分段函数的参数，观察衔接处的跳跃与连续。', symbol: 'ƒ', meta: '实验 03 / 连续' },
  ] },
  '/practice': { title: '理解之后，亲手解一遍。', subtitle: '从一道题开始，把「我懂了」变成「我会了」。', stage: '公式输入与人工审核题型将在后续版本开放。', items: [
    { title: '知识点专项练习', detail: '围绕一个概念集中练习，用分级提示帮助你独立思考。', symbol: 'x²', meta: '专项训练' },
    { title: '一步一步解题', detail: '关注每一步的数学依据，逐步建立完整的解题思路。', symbol: '=', meta: '分步反馈' },
    { title: '章节诊断', detail: '用一次诊断发现薄弱点，再沿着知识地图查漏补缺。', symbol: '✓', meta: '阶段检验' },
  ] },
  '/review': { title: '把每一次卡住，变成进步。', subtitle: '错题不是终点，而是下一次理解的起点。', stage: '错题记录与复习推荐将在后续版本开放。', items: [
    { title: '我的错题档案', detail: '集中回顾做错的题目，保留你的作答与反馈。', symbol: '↺', meta: '当前没有作答记录' },
    { title: '找到错误的原因', detail: '区分概念理解、公式使用和计算错误，进行针对性复习。', symbol: '?', meta: '错因分析' },
    { title: '让理解留得更久', detail: '结合知识点掌握情况，安排下一次有针对性的练习。', symbol: '∞', meta: '复习计划' },
  ] },
  '/assistant': { title: '每一个「为什么」，都值得被回答。', subtitle: '未来的数学学习助手，陪你梳理概念与解题思路。', stage: 'AI 教师属于后续阶段，本版本尚未接入 AI 服务。', items: [
    { title: '从直觉理解概念', detail: '计划用更熟悉的例子，解释严谨数学背后的直觉。', symbol: '✳', meta: '概念讲解 / 规划中' },
    { title: '给提示，留思考', detail: '计划提供由浅入深的提示，帮助你自己找到下一步。', symbol: '…', meta: '分级启发 / 规划中' },
    { title: '连接已有的知识', detail: '计划结合当前学习内容，建立知识点之间的联系。', symbol: '⋈', meta: '学习建议 / 规划中' },
  ] },
};
