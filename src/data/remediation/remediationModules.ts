import type { TeachingLesson } from "../teaching";
import { chainRuleRemediationModule } from "./chainRuleRemediation";
import { lagrangeMvtRemediationModule } from "./lagrangeMvtRemediation";
import { rolleConditionsRemediationModule } from "./rolleConditionsRemediation";

/**
 * 可扩展的前置知识补救微课注册表。
 * 现已注册链式法则前置（"chain-rule"）、罗尔定理三大前提（"rolle-conditions"）、
 * 拉格朗日中值定理与辅助函数构造（"lagrange-mvt"）三套补救微课；
 * 未来继续扩展时只需在此新增注册项，UI（Sheet 容器）与状态管理无需重新开发。
 */
export interface RemediationModuleSpec {
  id: string;
  title: string;
  triggerLabel: string;
  durationMinutes: number;
  /** 仅在对应理解检查步骤答错时触发（按具体障碍精确匹配，不按 lessonId 泛匹配） */
  triggerStepIds: readonly string[];
  /** 在普通练习中连续答错对应错因标签时触发 */
  triggerErrorTags: readonly string[];
  /** 课程页主动入口挂载位置（仅供课程页主动打开，不作为错题误触发依据） */
  courseEntryLessonIds: readonly string[];
  lesson: TeachingLesson;
}

export const remediationModulesById = {
  "chain-rule": {
    id: "chain-rule",
    title: "链式法则前置速通",
    triggerLabel: "先补 2 分钟链式法则前置",
    durationMinutes: 2,
    triggerStepIds: [
      // Ch2 链式法则与隐函数求导核心步骤
      "p15-1",
      "p16-1",
      "p129-1",
      "p177-1",
      "p179-1",
      "p214-1",
      "jc935-2-4-1-1-1",
      "jc935-2-4-1-2-1",
      "jc935-2-4-1-3-1",
      "jc935-2-4-1-4-1",
      "jc935-2-4-5-1-1",
      // Ch3 §3.1 涉及链式法则求导的步骤
      "p181-2",
      "jc935-3-1-1-2",
      "jc935-3-1-6-1",
      "jc935-3-1-11-1-1",
      "jc935-3-1-14-2",
    ],
    triggerErrorTags: ["chain_rule", "implicit_derivative"],
    courseEntryLessonIds: ["chain", "advanced-derivatives"],
    lesson: chainRuleRemediationModule,
  },
  "rolle-conditions": {
    id: "rolle-conditions",
    title: "罗尔定理三大前提速通",
    triggerLabel: "先补 2 分钟罗尔定理前提",
    durationMinutes: 2,
    triggerStepIds: [
      "p20-1",
      "p181-1",
      "p217-1",
      "jc935-3-1-1-1",
      "jc935-3-1-5-1",
      "jc935-3-1-7-1",
      "jc935-3-1-8-1",
      "jc935-3-1-12-1",
    ],
    triggerErrorTags: [],
    courseEntryLessonIds: ["mvt"],
    lesson: rolleConditionsRemediationModule,
  },
  "lagrange-mvt": {
    id: "lagrange-mvt",
    title: "拉格朗日放缩与辅助函数速通",
    triggerLabel: "先补 2 分钟辅助函数与放缩",
    durationMinutes: 2,
    triggerStepIds: [
      "jc935-3-1-9-1",
      "jc935-3-1-10-1",
      "jc935-3-1-11-2-1",
      "jc935-3-1-13-1",
      "jc935-3-1-14-1",
    ],
    triggerErrorTags: [],
    courseEntryLessonIds: ["mvt"],
    lesson: lagrangeMvtRemediationModule,
  },
} as const satisfies Readonly<Record<string, RemediationModuleSpec>>;

export type RemediationId = keyof typeof remediationModulesById;

export interface ObstacleContext {
  stepId?: string;
  errorTag?: string;
}

/**
 * 根据具体的理解障碍（答错的理解检查 stepId 或练习错因 errorTag）解析应推荐的补救微课。
 * 明确不按 lessonId 泛触发，避免对无关步骤误触发补救模块。
 */
export function resolveRemediationForObstacle(
  context: ObstacleContext,
): (typeof remediationModulesById)[RemediationId] | undefined {
  const modules = Object.values(remediationModulesById);
  if (context.stepId) {
    const byStep = modules.find((mod) => mod.triggerStepIds.some((id) => id === context.stepId));
    if (byStep) return byStep;
    // 在 ELI5 理解检查中，只有明确标注了对应障碍的 stepId 才触发，不回退到 errorTag 或 lessonId
    return undefined;
  }
  if (context.errorTag) {
    return modules.find((mod) => mod.triggerErrorTags.some((tag) => tag === context.errorTag));
  }
  return undefined;
}
