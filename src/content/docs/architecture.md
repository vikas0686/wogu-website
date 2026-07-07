---
title: Architecture
description: The modules that make up WoGu, and how they depend on each other.
order: 7
---

For the visual pipeline — from a developer's workflow code to a production deploy — see
the [Architecture](/architecture) page. This page covers the module layout underneath it.

## Modules

| Module | What it is |
|---|---|
| `wogu-api` | The SPI: `WorkflowValidator`, `Rule`, `RuleCategory`, `RuleResult`, `ValidationContext`, `ValidationSummary`, `Violation`, `Severity`. Zero dependency on any engine, parser, or build tool. |
| `wogu-core` | The `ValidationEngine`: discovers `WorkflowValidator` implementations via `ServiceLoader`, runs them, aggregates results. Renders the shared console output. No compile-time reference to any specific validator or rule. |
| `wogu-temporal` | Temporal Java SDK rules, declared as YAML and executed by a generic rule engine, plus the call-graph analyzer, the workflow scanner, and the logic that recognizes an Activity boundary. |
| `wogu-report` | Renders a `ValidationSummary` as a single, self-contained `index.html`. Depends only on `wogu-api`, so it renders any engine's output without change. |
| `wogu-maven-plugin` | The `wogu:validate` Maven goal, bound to `verify` by default. |
| `wogu-gradle-plugin` | The `woguValidate` Gradle task. |

## Dependency direction

`wogu-temporal` — and any future engine module — depends only on `wogu-api`. `wogu-core`
and `wogu-report` also depend only on `wogu-api`, and discover or render engine output
reflectively. The two build-tool plugins are the only places that wire a specific set of
engine jars onto the classpath, so adding support for a new engine to an existing
build is a dependency addition, not a code change to the engine or the report.

| Depends on `wogu-api` only | Depends on `wogu-core` + `wogu-report` + `wogu-temporal` |
|---|---|
| `wogu-core`, `wogu-report`, `wogu-temporal` | `wogu-maven-plugin`, `wogu-gradle-plugin` |

This is what makes the rule engine additive: a new rule is a YAML file plus a
documentation page, never a change to the engine, the report, or either plugin. See
[Custom Rules](/docs/custom-rules) for how a rule is authored.
