---
title: Rules
description: How rules, categories, severities, and call-graph analysis fit together.
order: 4
---

## Rules, not validators

WoGu revolves around **rules** (`WG001`, `WG002`, ...), not validator implementations. A
single validator commonly evaluates several rules in one pass over a project — sharing
one parse of the source, one workflow scan, one call graph — because most of that setup
is identical across rules for the same engine.

Each rule carries: an id, a title, a category, a severity, the engine it applies to, the
version it shipped in, a documentation reference, and whether an automatic fix is
available. Reports and future per-rule configuration key off this metadata, never off the
validator implementation that happened to produce a result.

## Categories and numbering

Every rule id is `WG` followed by three digits. Every category reserves a fixed numeric
range, enforced at construction time — not just documented:

| Range | Category |
|---|---|
| WG001–WG099 | Determinism |
| WG100–WG199 | Activities |
| WG200–WG299 | Versioning |
| WG300–WG349 | Signals |
| WG350–WG399 | Updates |
| WG400–WG499 | Performance |
| WG500–WG599 | Best Practices |
| WG600–WG699 | Security |
| WG900–WG999 | Organization Policies |

Only the Determinism range is populated today — see the [Roadmap](/docs/roadmap) for
what's next.

## Severity

Every rule shipped today reports at `ERROR` severity: a violation fails the build.
`WARNING` and `INFO` are supported by the model for future rules that should surface in
the report without failing the build.

## Call graph analysis

WoGu doesn't just check a workflow class itself. Starting from a workflow's entry
point — the implementation method matching an `@WorkflowMethod`-annotated interface
method — it follows every method call it can resolve to source elsewhere in the project,
however many hops deep, looking for the pattern each rule flags.

This traversal stops, without reporting anything past that point, at two kinds of
boundary:

- A call it cannot resolve to source it can see: a compiled dependency, or a call
  resolved only through reflection or dynamic dispatch.
- A call that resolves into a Temporal **Activity** implementation. Activities are not
  replayed, so they're exempt from every determinism rule by design.

This means a rule can produce a **false negative** (a real violation hidden behind a call
it can't see into) but is designed to avoid **false positives** — it only flags a call
once it resolves to the exact method or constructor the rule is looking for.

## Where rules are defined

Most rules are declarative: a YAML file naming the forbidden method calls and
constructors to flag, executed by one generic rule type. See
[Custom Rules](/docs/custom-rules) for how to add one, and the
[Rule Reference](/rules) for the full, searchable list of what ships today.
