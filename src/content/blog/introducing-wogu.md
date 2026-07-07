---
title: "Introducing WoGu: workflow correctness for Temporal"
description: WoGu v0.1.0 is on Maven Central — ten Determinism rules that fail your build before a NonDeterministicException reaches production.
date: "2026-06-15"
author: WoGu Team
---

Temporal workflows are replayed: whenever a worker needs to reconstruct a workflow's
state, it re-executes the workflow's code from the beginning of event history. That
requirement — determinism — is easy to state and surprisingly easy to violate. A stray
`UUID.randomUUID()`, a `Thread.sleep()`, a `System.currentTimeMillis()` call three method
calls deep in a service class your workflow happens to invoke — any of these can produce
a `NonDeterministicException` the first time a worker restarts or hands off a replay,
often long after the code shipped and long after the pull request that introduced it was
approved.

Today we're releasing WoGu v0.1.0 on Maven Central: a build plugin that checks for exactly
this class of bug, the same way a coverage or static-analysis gate already runs in your
build.

## What ships today

Ten Determinism rules for the Temporal Java SDK — [WG001](/rules/WG001) through
[WG010](/rules/WG010) — covering non-deterministic randomness, wall-clock reads, blocking
sleeps, and unmanaged threads and executors. Every rule is built on the same recursive
call-graph analysis: starting from a workflow's entry point, WoGu follows every method
call it can resolve to source in your project, however many hops deep, and stops exactly
at the boundary of a Temporal Activity implementation — because Activities aren't
replayed, and shouldn't be flagged.

## Why a build plugin, not a linter you run by hand

A rule that only runs when someone remembers to run it doesn't catch anything in
practice. Binding to `mvn verify` (and `gradle build`, once the Gradle plugin is
installed) means the check runs on every build, the same build your tests already run in
— no separate step to forget, no separate CI job to wire up.

## Try it

```bash
mvn verify
```

Add the plugin, per [Installation](/docs/installation), and that command is the whole
setup. See [Quick Start](/docs/quick-start) for a walkthrough of a real violation and its
fix.

WoGu is Apache 2.0 licensed and built in the open — the [rule engine, the report
generator, and every rule's YAML definition](https://github.com/vikas0686/wogu) are in the
public repository.
