---
title: Quick Start
description: See WoGu catch a real determinism violation in under a minute.
order: 2
---

## 1. Add the plugin

Follow [Installation](/docs/installation) to add the Maven or Gradle plugin to your
project. No configuration is required for the default rule set.

## 2. Run your build

```bash
mvn verify
```

If a workflow implementation in your project violates a rule, the build fails with a
console summary:

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

## 3. Open the report

```text
target/wogu/index.html
```

The report renders every violation with the full call path from the workflow's entry
point down to the offending call, so you can see exactly how the violation is reachable
even when it's several method calls deep.

## Example

```java
// Inside a workflow implementation
UUID.randomUUID();
```

- `mvn verify` fails
- The HTML report shows the violation and its full call path
- Recommended fix: `Workflow.randomUUID()`

```java
import io.temporal.workflow.Workflow;

public class PaymentWorkflowImpl implements PaymentWorkflow {
  @Override
  public String processPayment(String accountId) {
    String transactionId = Workflow.randomUUID().toString();
    return "Payment " + transactionId + " processed for account " + accountId;
  }
}
```

See the [Rules reference](/rules) for everything WoGu checks for today, or read
[Reports](/docs/reports) to understand what the HTML report shows.
