---
title: Custom Rules
description: How rules are authored, from a declarative YAML file to a hand-written rule.
order: 6
---

## Most rules need no Java at all

The primary extension point in WoGu's architecture is a declarative rule: "flag every
reachable call to this specific method, or every reachable construction of this specific
class." Every Determinism rule shipping today (WG001 through WG010) is expressed exactly
this way — a YAML file, nothing more.

## Anatomy of a declarative rule

A rule file under `wogu-temporal/src/main/resources/rules/` looks like this:

```yaml
id: WG001
title: UUID.randomUUID() inside Workflow
category: DETERMINISM
severity: ERROR
engine: TEMPORAL_JAVA
since: 0.1.0
documentation: docs/rules/WG001.md
type: forbidden-method
description: >
  A Temporal workflow implementation calls java.util.UUID.randomUUID(), which is not
  replay-safe.
replacement: Workflow.randomUUID()
methods:
  - java.util.UUID.randomUUID
```

Fields:

- **id, title, category, severity, engine, since, documentation** — metadata rendered in
  the report and on the rule's page.
- **type** — `forbidden-method` is the built-in generic rule executor.
- **methods** — fully qualified `Class.method` references to flag.
- **constructors** — fully qualified class names to flag when constructed (used by rules
  like WG005 and WG007, which flag both a constructor and instance methods on the
  resulting object).

Method matching resolves the call site whether the class name is written explicitly
(`Thread.sleep()`) or not (an instance call like `random.nextInt()`, matched by resolving
the call and checking its declaring type).

## Adding a new declarative rule

1. Add `wogu-temporal/src/main/resources/rules/wg0nn.yaml` with the fields above.
2. Give it the next free id in the right category's range — see
   [Rules](/docs/rules#categories-and-numbering) for the ranges. A mismatched id and
   category is rejected at construction time.
3. Add `docs/rules/WG0NN.md` documenting the rule, following the existing template:
   Problem, Why this matters, Bad Example, Good Example, Recommended Fix, References,
   False Positives.
4. Add a test that writes real source to a temporary directory and validates it
   end-to-end.

There is no filename to register anywhere — rule definitions are discovered from the
classpath at startup.

## Custom (hand-written) rules

Some rules can't be expressed as a method-call pattern — a workflow-complexity check, a
`ContinueAsNew` recommendation, versioning safety. For those, a rule extends a base class
that handles metadata storage, and only replaces *how violations are found* — everything
about how the rule is registered, executed, and reported is identical to a declarative
rule.

## Adding a new workflow engine

The rule and validator model has zero dependency on Temporal specifically. A new engine
module implements the same validator interface and depends only on the shared API module
— the core engine discovers it reflectively, and the report renders whatever rule
metadata it produces, regardless of which engine ran it. See the
[Architecture](/architecture) page for how the modules relate.
