---
title: Why determinism bugs are hard to catch in code review
description: A non-deterministic call rarely looks wrong at the call site — it looks wrong three replays later, on a different worker.
date: "2026-06-24"
author: WoGu Team
---

`UUID.randomUUID()` is not a bug. `Thread.sleep(5000)` is not a bug. `Math.random()` is
not a bug. Each of these is completely ordinary code, and a reviewer skimming a pull
request has no reason to slow down on any of them — until the class calling it happens to
be a Temporal workflow implementation, or happens to be reachable from one.

## The bug is in the call graph, not the call site

Consider a workflow that calls a service method, which calls another service method,
which happens to read `System.currentTimeMillis()`. Nothing at the workflow's own call
site looks suspicious — the non-determinism is two hops away, inside a class that might
not even have "workflow" in its name. A reviewer would have to trace that call graph by
hand, every time, for every one of a dozen non-deterministic APIs, to catch it. In
practice, nobody does this consistently, and the ones who try do it inconsistently.

This is exactly why [WG001](/rules/WG001) through [WG010](/rules/WG010) are built on a
call-graph analyzer rather than a simple "grep the workflow class" check: the bug WoGu is
designed to catch is specifically the one hidden behind a helper method.

## It fails at the worst possible time

A `NonDeterministicException` doesn't happen when the code runs the first time — it
happens on *replay*: after a worker restart, a deployment, or a handoff to a different
worker. That means the bug can sit latent through code review, through a successful
deploy, and through days of normal operation, only to surface the next time a worker
needs to reconstruct history. By then, the person debugging it is rarely the person who
wrote the offending line, and the stack trace points at Temporal's replay machinery, not
at the three-hop call that actually caused it.

## Catching it at build time changes the economics

A rule that runs on every `mvn verify` catches the violation in the same feedback loop as
a failing unit test — before merge, with the exact call path from the workflow's entry
point down to the offending call rendered in the report. That's the same shift that
made build-time coverage and bug-pattern gates useful: moving the check from "something a
careful reviewer might catch" to "something the build always catches."

See [Call Graph Analysis](/architecture#call-graph-analysis) for how the traversal
actually works, and where it deliberately stops.
