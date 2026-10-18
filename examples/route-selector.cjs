// Source-derived route selector. TypeScript annotations/imports removed.
function assertUnitInterval(value, field) {
  if (!Number.isFinite(value) || value < 0 || value > 1) {
    throw new Error(`${field} must be between 0 and 1`);
  }
}

function compareCandidates(a, b) {
  return a.expectedCostEur - b.expectedCostEur ||
    a.worstCaseCostEur - b.worstCaseCostEur ||
    b.route.expectedQuality - a.route.expectedQuality ||
    b.route.expectedReliability - a.route.expectedReliability ||
    a.route.expectedLatencyMs - b.route.expectedLatencyMs ||
    a.route.provider.localeCompare(b.route.provider) ||
    a.route.model.localeCompare(b.route.model);
}

function selectCheapestAcceptableRoute(candidates, thresholds) {
  assertUnitInterval(thresholds.minQuality, 'minQuality');
  assertUnitInterval(thresholds.minReliability, 'minReliability');
  const acceptable = candidates.filter(candidate =>
    candidate.route.expectedQuality >= thresholds.minQuality &&
    candidate.route.expectedReliability >= thresholds.minReliability
  ).sort(compareCandidates);
  const selected = acceptable[0];
  if (!selected) throw new Error('no candidate satisfies the quality and reliability floors');
  return { selected, alternatives: acceptable.slice(1) };
}

module.exports = { selectCheapestAcceptableRoute };
