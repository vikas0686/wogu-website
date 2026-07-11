---
title: Configuration
description: WoGu's zero-config defaults, and how the plugins bind into your build.
order: 3
---

## Zero-config by default

Adding the plugin is the entire setup. The default rule set requires no configuration
file, no rule list, and no project-specific setup to start catching violations.

## Maven: which phase WoGu runs in

The Maven plugin binds to whichever phase you declare in `<executions>`. The standard
setup binds to `verify`:

```xml
<plugin>
  <groupId>dev.wogu</groupId>
  <artifactId>wogu-maven-plugin</artifactId>
  <version>0.1.0</version>
  <executions>
    <execution>
      <goals>
        <goal>validate</goal>
      </goals>
    </execution>
  </executions>
</plugin>
```

Binding to `verify` means WoGu runs after tests, alongside your other build-time quality
gates. You can bind `wogu:validate` to an earlier phase (such as `compile` or `test`) by
setting `<phase>` explicitly on the execution if you want faster feedback.

## Gradle: task wiring

Applying the plugin registers the `woguValidate` task. Once the `java` plugin is present
in the project, WoGu wires `woguValidate` into `build` automatically — no additional
task dependency configuration is needed:

```kotlin
plugins {
  id("dev.wogu") version "0.1.0"
}
```

You can also run the task directly, independent of `build`:

```bash
gradle woguValidate
```

## What's configurable today

WoGu intentionally ships with a single, fixed default rule set in this release — every
rule in the [Rules reference](/rules) runs on every build, with no per-rule opt-out.

## What's planned

Per-project rule configuration — enabling or disabling individual rules, suppressing a
specific violation, and organization-wide policy files — is on the
[roadmap](/docs/roadmap). Until then, the fastest way to influence a specific rule is to
fix the violation using the recommended fix on that rule's page, or to open an issue if
you believe a rule is misfiring.
