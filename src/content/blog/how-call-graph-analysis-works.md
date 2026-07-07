---
title: How WoGu's call graph analysis works
description: A walk through what "reachable from a workflow's entry point" actually means, and why it stops precisely at an Activity boundary.
date: "2026-07-02"
author: WoGu Team
---

Every rule in WoGu's Determinism category — [WG001](/rules/WG001) through
[WG010](/rules/WG010) — is described the same way: "flags a call reachable from a
workflow's entry point, however many method calls away." This post is about what that
sentence actually means in the analyzer.

## Starting point: the entry point

WoGu scans a project for classes implementing a Temporal workflow interface, and
identifies their entry-point methods: the implementation methods matching an
`@WorkflowMethod`-annotated interface method. That's the root of the traversal — nothing
outside a path reachable from one of these methods is ever considered.

## Following resolvable calls

From each entry point, the analyzer follows every method call it can resolve to another
method's source within the same project — a direct call, a call through a private
service field, a call several classes deep. It doesn't matter how many hops it takes;
what matters is whether the call resolves to source WoGu can see.

```java
public class PaymentWorkflowImpl implements PaymentWorkflow {
  private final PaymentService paymentService = new PaymentService();

  @Override
  public void processPayment() {
    // WG002 fires here: the analyzer follows this call into
    // PaymentService.waitForSettlement() and finds Thread.sleep() inside it.
    paymentService.waitForSettlement();
  }
}

class PaymentService {
  void waitForSettlement() throws InterruptedException {
    Thread.sleep(5000);
  }
}
```

The report renders this exact path — workflow entry point, through the intermediate
call, down to the offending line — so fixing it doesn't require re-deriving how the
violation was reached.

## Where it deliberately stops

Two kinds of boundary end the traversal, on purpose:

- **A call it can't resolve to source it can see** — a compiled dependency, or a call
  resolved only through reflection or dynamic dispatch. This is a real limitation: a
  violation hidden behind such a call is a false negative. WoGu accepts that trade-off
  deliberately, because the alternative — guessing at calls it can't actually verify —
  would produce false positives instead, and a rule that cries wolf gets disabled.
- **A Temporal Activity implementation** — recognized by its `@ActivityInterface` /
  `@ActivityMethod` annotations, or by resolving only as far as the activity interface's
  bodyless method declaration. Activities are not replayed, so `Thread.sleep()`,
  `Math.random()`, and the rest are completely legitimate there. Every Determinism rule
  shares this same stopping point, which is why none of them require rule-specific work
  to avoid flagging Activity code — it's shared infrastructure, not something each rule
  reimplements.

## Why this shape generalizes

Because the traversal and the Activity boundary live in shared infrastructure, a new
rule is usually just a description of *what* to flag at each call site — not a new
traversal. See [Custom Rules](/docs/custom-rules) for what adding one actually looks
like.
