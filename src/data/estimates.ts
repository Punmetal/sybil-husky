import type { Tier } from "./content";

export const REFERENCE_MONTHS = 38;
export const MILESTONE_COUNT = 17;

// Explicit demonstration model only. Replace with approved historical data/API.
export function estimateForMonths(tier: Tier, months: number) {
  const boundedMonths = Math.min(
    REFERENCE_MONTHS,
    Math.max(1, Math.round(months)),
  );
  const reward = Math.round(
    (tier.referenceReward * boundedMonths) / REFERENCE_MONTHS,
  );
  const multiple =
    boundedMonths === REFERENCE_MONTHS
      ? tier.referenceMultiple
      : (reward / tier.price).toFixed(2);
  return { reward, multiple };
}

export const milestoneMonths = (index: number) =>
  Math.round(1 + (index * (REFERENCE_MONTHS - 1)) / (MILESTONE_COUNT - 1));
