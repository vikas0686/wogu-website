---
title: Installation
description: Add the WoGu Maven or Gradle plugin to your Temporal project.
order: 1
---

## Requirements

- Java 17 or newer
- Maven 3.9+ or Gradle 8+
- Temporal Java SDK (any reasonably recent version — detection is source-based and has no compile-time dependency on the SDK itself)

## Maven

WoGu is published on Maven Central under `io.github.vikas0686`. Add the plugin to your `pom.xml`:

```xml
<plugin>
  <groupId>io.github.vikas0686</groupId>
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

That's it — `mvn verify` now runs WoGu automatically, bound to the `verify` phase by
default. No extra repository configuration is needed; it resolves straight from Maven
Central.

## Gradle

```kotlin
plugins {
  id("io.github.vikas0686.wogu") version "0.1.0"
}
```

Applying the plugin registers the `woguValidate` task and, once the `java` plugin is
present, wires it into `build`.

The Gradle plugin isn't published to the Gradle Plugin Portal yet. In the meantime,
build and install it from source into your local Maven repository:

```bash
git clone https://github.com/vikas0686/wogu.git
cd wogu
mvn clean install
cd wogu-gradle-plugin
./gradlew publishToMavenLocal
```

Then add `mavenLocal()` to your project's plugin repositories so Gradle can resolve it.
The Maven plugin above is fully published and needs no local setup.

## Verify the installation

Run your build once to confirm WoGu is wired in:

```bash
mvn verify
```

or

```bash
gradle build
```

If your project has no rule violations, the build succeeds and a report is written to
`target/wogu/index.html` (Maven) or `build/reports/wogu/index.html` (Gradle). Continue to
[Quick Start](/docs/quick-start) to see WoGu catch a real violation.
