---
title: EternalCore - Developer API
---

# EternalCore Developer API

As part of open-source community, we support developers who want to create their own plugins using our API. We provide a simple and easy to use API that allows you to create your own plugins using our API.

## 📚 Dependency Management

To use our work in your plugin, You need to install correct artifact for your project. Our plugin supports Maven, Gradle Kotlin, Gradle Groovy and SBT.
To use latest release check [maven repository](https://repo.eternalcode.pl/#/releases/com/eternalcode/eternalcore-api).

### Add repository:

<CodeTabs>
  <CodeTab label="Gradle.kts">

```kotlin
maven("https://repo.eternalcode.pl/releases")
```

  </CodeTab>
  <CodeTab label="Gradle">

```groovy
maven { url = "https://repo.eternalcode.pl/releases" }
```

  </CodeTab>
  <CodeTab label="Maven">

```xml
<repository>
    <id>eternalcode-reposilite-releases</id>
    <name>EternalCode Repository</name>
    <url>https://repo.eternalcode.pl/releases</url>
</repository>
```

  </CodeTab>
</CodeTabs>

### Add dependency:

<CodeTabs>
  <CodeTab label="Gradle.kts">

```kotlin
compileOnly("com.eternalcode:eternalcore-api:1.1.0")
```

  </CodeTab>
  <CodeTab label="Gradle">

```groovy
compileOnly("com.eternalcode:eternalcore-api:1.1.0")
```

  </CodeTab>
  <CodeTab label="Maven">

```xml
<dependency>
    <groupId>com.eternalcode</groupId>
    <artifactId>eternalcore-api</artifactId>
    <version>1.1.0</version>
    <scope>provided</scope>
</dependency>
```

  </CodeTab>
</CodeTabs>

You must also add dependency inside `plugin.yml` or `paper-plugin.yml` file, this is required to load our plugin before your plugin, so they can access our API.

<CodeTabs>
  <CodeTab label="plugin.yml">

```yaml
depend: [EternalCore]
```

  </CodeTab>
  <CodeTab label="paper-plugin.yml">

```yaml
dependencies:
  server:
    EternalCore:
      load: BEFORE
      required: true
      join-classpath: true
```

  </CodeTab>
</CodeTabs>

> **Warning** > **Remember to add dependency inside `plugin.yml` or `paper-plugin.yml` file, otherwise your plugin will not work!**

## 📝 Usage

To use our API you need to create instance of `EternalCoreAPI` class. You can do it by using `EternalCoreApiProvider.provide()` method.

```java
EternalCoreAPI eternalCoreAPI = EternalCoreApiProvider.provide();
```

After creating instance of api, the User gets access to various classes used in our plugin and methods.
Our API includes:

| Class                 | Provide method             |
| --------------------- | -------------------------- |
| AfkService            | getAfkService()            |
| SpawnService          | getSpawnService()          |
| CatboyService         | getCatboyService()         |
| TeleportService       | getTeleportService()       |
| RandomTeleportService | getRandomTeleportService() |

### AfkService usage examples

The User can then use the methods of the given classes to create their own use cases. Here is an example how to obtain instance of `AfkService`:

```java
public class YourPlugin extends JavaPlugin {

    private EternalCoreApi eternalCoreApi;
    private AfkService afkService;

    @Override
    public onEnable() {
        this.eternalCoreApi = EternalCoreProvider.provide();
        this.afkService = eternalCoreApi.getAfkService();

    }
}
```

Then pass down the `AfkService` to your classes. After that You can use examples shown below.

Check if the player is Afk by using `AfkService` Example:

```java
if (afkService.isAfk(player.getUniqueId())) {

}
```

Mark the player as afk if the player is not afk yet.

```java
if (!afkService.isAfk(player.getUniqueId())) {
    Afk afkPlayer = afkService.markAfk(player.getUniqueId(), AfkReason.PLUGIN);

}
```

### CatboyService usage example

The User can get other classes from `EternalCore` and use them in their own use cases. Here is an example how to obtain instance of `CatboyService`:

```java
public class YourPlugin extends JavaPlugin {

    private EternalCoreApi eternalCoreApi;
    private CatboyService catboyService;

    @Override
    public onEnable() {
        this.eternalCoreApi = EternalCoreProvider.provide();
        this.catboyService = eternalCoreApi.getCatboyService();

    }
}
```

Using the instance of `CatboyService` the User is able to mark players as catboys and give them unique feature provided by `EternalCore`.

```java
if (player.getName().equals("Rollczi")) {
    catboyService.markAsCatboy(player, Cat.Type.BLACK);
}
```
