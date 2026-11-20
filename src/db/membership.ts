import { computeMastery } from "../data/learning";
import { useLearning } from "./learning";
import { useFormulas } from "./formulas";

export interface MembershipLevel {
  level: number;
  code: string;
  title: string;
  minPoints: number;
  nextPoints: number | null;
  points: number;
  progress: number;
  lessons: number;
  mastered: number;
  reviews: number;
  source: "local" | "apphub";
}

export const membershipTiers = [
  { level: 1, title: "初光见习", minPoints: 0, chapter: 1 },
  { level: 2, title: "睡莲探索", minPoints: 5, chapter: 2 },
  { level: 3, title: "晨雾进阶", minPoints: 20, chapter: 6 },
  { level: 4, title: "光影精通", minPoints: 50, chapter: 5 },
  { level: 5, title: "印象典藏", minPoints: 100, chapter: 8 },
] as const;

const tiers = membershipTiers;

export const membershipKey = "mc-0979-member-v1";

function readSyncedLevel(): number | null {
  try {
    const raw = JSON.parse(localStorage.getItem(membershipKey) || "null");
    if (
      raw &&
      typeof raw.level === "number" &&
      Number.isInteger(raw.level) &&
      raw.level >= 1 &&
      raw.level <= tiers.length
    ) {
      return raw.level;
    }
  } catch {
    return null;
  }
  return null;
}

export function computeMembership(input: {
  lessons: number;
  mastered: number;
  reviews: number;
}): MembershipLevel {
  const lessons = Math.max(0, input.lessons);
  const mastered = Math.max(0, input.mastered);
  const reviews = Math.max(0, input.reviews);
  const points = lessons * 3 + mastered * 2 + Math.min(reviews, 60);

  const synced = readSyncedLevel();
  const computedTier =
    [...tiers].reverse().find((t) => points >= t.minPoints) || tiers[0];
  const tier = synced
    ? tiers[Math.max(synced, computedTier.level) - 1]
    : computedTier;
  const next = tiers.find((t) => t.level === tier.level + 1) ?? null;
  const span = next ? next.minPoints - tier.minPoints : 1;
  const progress = next
    ? Math.max(0, Math.min(100, Math.round(((points - tier.minPoints) / span) * 100)))
    : 100;

  return {
    level: tier.level,
    code: `Lv.${tier.level}`,
    title: tier.title,
    minPoints: tier.minPoints,
    nextPoints: next ? next.minPoints : null,
    points,
    progress,
    lessons,
    mastered,
    reviews,
    source: synced && synced >= computedTier.level ? "apphub" : "local",
  };
}

export function useMembership(): MembershipLevel {
  const { state } = useLearning();
  const { store } = useFormulas();
  const mastery = computeMastery(state.attempts);
  const mastered = mastery.chapters.reduce((sum, ch) => sum + ch.mastered, 0);
  return computeMembership({
    lessons: state.completed.length,
    mastered,
    reviews: store.reviews.length,
  });
}
