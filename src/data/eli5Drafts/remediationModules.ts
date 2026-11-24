import type { TeachingLesson } from "../teaching";
import { chainRuleRemediationModule } from "./chainRuleRemediation";

/**
 * 可扩展的前置知识补救微课注册表。
 * 未来新增罗尔定理前提补救（"rolle-conditions"）、拉格朗日中值定理辅助函数补救（"lagrange-mvt"）等模块时，
 * 只需在此新增注册项，UI（Sheet 容器）与状态管理无需重新开发。
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
} as const satisfies Readonly<Record<string, RemediationModuleSpec>>;

export type RemediationId = keyof typeof remediationModulesById;

export interface ObstacleContext {
  stepId?: string;
  errorTag?: string;
}

/**
 * 根据具体的理解障碍（答错的理解检查 stepId 或练习错因 errorTag）解析应推荐的补救微课。
 * 明确不按 lessonId 泛触发，避免对罗尔定理适用条件等无关错误误触发链式法则补救。
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
