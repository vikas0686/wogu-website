---
title: Reports
description: What WoGu writes to the console and to the HTML report on every build.
order: 5
---

## Console output

Every run prints a summary to the build console:

```text
----------------------------------------------------
WoGu Workflow Guard
----------------------------------------------------
Scanning project...

✓ Found 1 workflow class

Running Rules...

✗ WG001 UUID.randomUUID() inside Workflow
✗ WG002 Thread.sleep() inside Workflow
✗ WG003 Non-deterministic Time APIs inside Workflow
----------------------------------------
3 ERROR
Build FAILED

HTML Report
target/wogu/index.html
```

A build with no violations prints the same shape of summary and continues normally — WoGu
only fails the build when a rule actually reports a violation.

## HTML report

Alongside the console output, WoGu writes a single, self-contained HTML file:

- **Maven:** `target/wogu/index.html`
- **Gradle:** `build/reports/wogu/index.html`

The report includes:

- **Build Information** — project coordinates and when the scan ran.
- **Rule Summary** — every rule that ran, and whether it passed or failed.
- **Violation detail cards** — one per violation, each showing the full call path from
  the workflow's entry point down to the offending call, so you can see exactly how deep
  in the call graph the issue was found.

Because the report renders purely from rule metadata, adding a new rule never requires a
change to the report generator — a new rule's violations render with the same detail
cards automatically.

## CI/CD

Since the report is a static file, upload it as a build artifact in CI to review a failed
run without re-running the build locally:

```yaml
- name: Build and validate workflows
  run: mvn verify

- name: Upload WoGu report
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: wogu-report
    path: target/wogu/index.html
```

`if: always()` ensures the report uploads even when `mvn verify` fails the job — which is
exactly the run you want to inspect.
