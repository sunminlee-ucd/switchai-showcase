const { selectCheapestAcceptableRoute } = require('./route-selector.cjs');
const candidates = [
  { expectedCostEur: 0.001, worstCaseCostEur: 0.002, route: { provider: 'synthetic', model: 'cheap-below-floor', expectedQuality: 0.6, expectedReliability: 0.99, expectedLatencyMs: 100 } },
  { expectedCostEur: 0.01, worstCaseCostEur: 0.02, route: { provider: 'synthetic', model: 'acceptable', expectedQuality: 0.9, expectedReliability: 0.99, expectedLatencyMs: 200 } }
];
const result = selectCheapestAcceptableRoute(candidates, { minQuality: 0.8, minReliability: 0.95 });
console.log('SwitchAI selection excerpt — invented candidates/prices, no provider calls');
console.log(JSON.stringify(result, null, 2));
