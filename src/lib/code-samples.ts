export const mavenPluginSnippet = `<plugin>
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
</plugin>`;

export const gradlePluginSnippet = `plugins {
  id("io.github.vikas0686.wogu") version "0.1.0"
}`;

export const gradlePluginGroovySnippet = `plugins {
  id 'io.github.vikas0686.wogu' version '0.1.0'
}`;

export const cliSnippet = `$ mvn verify

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
target/wogu/index.html`;

export const githubActionsSnippet = `name: CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: "17"

      - name: Build and validate workflows
        run: mvn verify

      - name: Upload WoGu report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: wogu-report
          path: target/wogu/index.html`;

export const mavenFullExampleSnippet = `<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>payments-service</artifactId>
  <version>1.0.0</version>

  <dependencies>
    <dependency>
      <groupId>io.temporal</groupId>
      <artifactId>temporal-sdk</artifactId>
      <version>1.25.1</version>
    </dependency>
  </dependencies>

  <build>
    <plugins>
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
    </plugins>
  </build>
</project>`;

export const mavenBoundPhaseSnippet = `<plugin>
  <groupId>io.github.vikas0686</groupId>
  <artifactId>wogu-maven-plugin</artifactId>
  <version>0.1.0</version>
  <executions>
    <execution>
      <phase>compile</phase>
      <goals>
        <goal>validate</goal>
      </goals>
    </execution>
  </executions>
</plugin>`;

export const gradleFullExampleSnippet = `plugins {
  java
  id("io.github.vikas0686.wogu") version "0.1.0"
}

repositories {
  mavenCentral()
}

dependencies {
  implementation("io.temporal:temporal-sdk:1.25.1")
}`;

export const gradleLocalInstallSnippet = `git clone https://github.com/vikas0686/wogu.git
cd wogu
mvn clean install
cd wogu-gradle-plugin
./gradlew publishToMavenLocal`;

export const gradleCliSnippet = `$ gradle build

> Task :woguValidate
Scanning project...
✓ Found 1 workflow class

Running Rules...

✗ WG001 UUID.randomUUID() inside Workflow
----------------------------------------
1 ERROR
Build FAILED

HTML Report
build/reports/wogu/index.html`;

export const badWorkflowSnippet = `public class PaymentWorkflowImpl implements PaymentWorkflow {
  @Override
  public String processPayment(String accountId) {
    String transactionId = UUID.randomUUID().toString();
    return "Payment " + transactionId + " processed for " + accountId;
  }
}`;

export const goodWorkflowSnippet = `import io.temporal.workflow.Workflow;

public class PaymentWorkflowImpl implements PaymentWorkflow {
  @Override
  public String processPayment(String accountId) {
    String transactionId = Workflow.randomUUID().toString();
    return "Payment " + transactionId + " processed for " + accountId;
  }
}`;
