const { test } = require('node:test');
const assert = require('node:assert/strict');
const { selectCheapestAcceptableRoute } = require('./route-selector.cjs');
function candidate(model, cost, quality = 0.9, reliability = 0.99, worst = cost) {
  return { expectedCostEur: cost, worstCaseCostEur: worst,
    route: { provider: 'synthetic', model, expectedQuality: quality, expectedReliability: reliability, expectedLatencyMs: 100 } };
}
const thresholds = { minQuality: 0.8, minReliability: 0.95 };

test('a cheaper route cannot bypass the quality floor', () => {
  const selected = selectCheapestAcceptableRoute([candidate('cheap-weak', 0.001, 0.6), candidate('acceptable', 0.01)], thresholds);
  assert.equal(selected.selected.route.model, 'acceptable');
});

test('a cheap unreliable route is rejected even with sufficient quality', () => {
  const selected = selectCheapestAcceptableRoute([candidate('unreliable', 0.001, 0.95, 0.8), candidate('reliable', 0.01)], thresholds);
  assert.equal(selected.selected.route.model, 'reliable');
});

test('equal expected costs prefer the lower worst-case estimate', () => {
  const selected = selectCheapestAcceptableRoute([candidate('wide', 0.01, 0.9, 0.99, 0.05), candidate('bounded', 0.01, 0.9, 0.99, 0.02)], thresholds);
  assert.equal(selected.selected.route.model, 'bounded');
});

test('no acceptable option fails explicitly instead of silently lowering thresholds', () => {
  assert.throws(() => selectCheapestAcceptableRoute([candidate('weak', 0.001, 0.1)], thresholds), /no candidate/);
});

test('invalid thresholds are rejected', () => {
  for (const minQuality of [NaN, -1, 2]) {
    assert.throws(() => selectCheapestAcceptableRoute([], { ...thresholds, minQuality }), /between 0 and 1/);
  }
});
