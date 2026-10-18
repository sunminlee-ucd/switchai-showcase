# Cheapest acceptable route — source-derived example

This excerpt preserves the TypeScript selector's quality/reliability filtering, cost ordering, deterministic tie-breaks, and explicit failure behavior. Type annotations and imports were removed so the logic runs directly in Node.js.

## Run

With Node.js 22 or newer, from this directory:

```sh
node --test route-selector.test.cjs
node demo.cjs
```

All demo candidates, scores, latency values, and prices are **synthetic**, not provider benchmarks or current pricing. No API keys, network calls, or paid requests are involved.

## What to inspect

The cheapest candidate is not always eligible: the selector preserves minimum configured quality and reliability floors. Equal expected costs are resolved using worst-case cost before other tie-breaks. An empty acceptable set fails rather than silently relaxing the thresholds.

This function consumes already validated/evaluated candidates. Capability, privacy, context, pricing freshness, and budget guards belong to the upstream policy layer in the private implementation. Provider adapters, fallback, verification, idempotency, and reconciliation are not part of this small example.

## Automated checks

The [public sample workflow](../.github/workflows/sample-checks.yml) runs the focused tests and synthetic demo on pushes and pull requests. It uses no application credentials or private repositories. Passing these checks does not certify the complete private application or its deployment.
