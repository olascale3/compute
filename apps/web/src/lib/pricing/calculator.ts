import { PRICING_DATA } from './models';

export function calculateCost(
  provider: string,
  model: string,
  inputTokens: number,
  outputTokens: number
): number {
  // Exact match first
  let pricing = PRICING_DATA.find(
    (p) => p.provider === provider && p.model === model
  );

  // Fallback: prefix match (e.g., "gpt-4o-2024-11-20" matches "gpt-4o")
  if (!pricing) {
    pricing = PRICING_DATA.find(
      (p) => p.provider === provider && model.startsWith(p.model)
    );
  }

  if (!pricing) {
    return 0; // Unknown model — log but don't fail
  }

  return (
    (inputTokens * pricing.inputPer1M + outputTokens * pricing.outputPer1M) /
    1_000_000
  );
}
