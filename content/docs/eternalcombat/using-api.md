---
title: EternalCombat - Using API
---

# EternalCombat API

As part of open-source community, we support developers who want to create their own plugins using our API. We provide a simple and easy to use API that allows you to create your own plugins using our API.

## 📚 Dependency Management

To use our work in your plugin, You need to install correct artifact for your project. Our plugin supports Maven, Gradle Kotlin, Gradle Groovy and SBT.
To use latest release check [maven repository](https://repo.eternalcode.pl/#/releases/com/eternalcode/eternalcombat-api).

### Add repository:

<CodeTabs>
  <CodeTab label="Gradle (KTS)">

```kotlin
maven("https://repo.eternalcode.pl/releases")
```

  </CodeTab>
  <CodeTab label="Gradle (Groovy)">

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
  <CodeTab label="Gradle (KTS)">

```kotlin
compileOnly("com.eternalcode:eternalcombat-api:1.1.1")
```

  </CodeTab>
  <CodeTab label="Gradle (Groovy)">

```groovy
compileOnly("com.eternalcode:eternalcombat-api:1.1.1")
```

  </CodeTab>
  <CodeTab label="Maven">

```xml
<dependency>
    <groupId>com.eternalcode</groupId>
    <artifactId>eternalcombat-api</artifactId>
    <version>1.1.1</version>
    <scope>provided</scope>
</dependency>
```

  </CodeTab>
</CodeTabs>

You must also add dependency inside `plugin.yml` or `paper-plugin.yml` file, this is required to load our plugin before your plugin, so they can access our API.

<CodeTabs>
  <CodeTab label="plugin.yml">

```yaml
depend: [EternalCombat]
```

  </CodeTab>
  <CodeTab label="paper-plugin.yml">

```yaml
dependencies:
  server:
    EternalCombat:
      load: OMIT
      required: true
      join-classpath: true
```

  </CodeTab>
</CodeTabs>

> **Warning**
> **Remember to add dependency inside `plugin.yml` or `paper-plugin.yml` file, otherwise your plugin will not work!**

## 📝 Usage
To use our API you need to create instance of `EternalCombatAPI` class. You can do it by using `EternalCombatAPI.getInstance()` method.

```java
EternalCombatAPI eternalCombatApi = EternalCombatProvider.provide();
```
After creating instance of api, the User gets access to various classes used in our plugin and methods.
Our API includes:

| Class                    | Provide method                |
|--------------------------|-------------------------------|
| FightManager             | getFightManager()             |
| RegionProvider           | getRegionProvider()           |
| FightPearlManager        | getFightPearlManager()        |
| FightTagOutService       | getFightTagOutService()       |
| FightEffectService       | getFightEffectService()       |
| DropManager              | getDropManager()              |
| DropKeepInventoryManager | getDropKeepInventoryManager() |
| PluginConfig             | getPluginConfig()             |

### FightManager usage examples

The User can then use the methods of the given classes to create their own use cases. Here is an example how to obtain instance of `FightManager`:

```java
public class YourPlugin extends JavaPlugin {

    private EternalCombatApi eternalCombatApi; 
    private FightManager fightManager; 
    
    @Override
    public onEnable() {
        this.eternalCombatApi = EternalCombatProvider.provide(); 
        this.fightManager = eternalCombatApi.getFightManager(); 
    }
}
```

Then pass down the `FightManager` to your classes. After that You can use examples shown below.

Check if the player is in combat by using `FightManager` class. Example:

```java
if (fightManager.isInCombat(player.getUniqueId())) {
    // player is in combat
}
```

Tag player who is not already in the combat using `FightManager` class. Example:

```java
if (!fightManager.isInCombat(player.getUniqueId())) {
    fightManager.tag(player.getUniqueId(), Duration.of(10, ChronoUnit.SECONDS), CauseOfTag.COMMAND);
    
    FightTag fightTag = fightManager.getTag(player.getUniqueId());
    // tag player
}
```

## Event base API

Our plugin supports two types of events. 
The first type is the `FightTagEvent` that is called when the player enters the fight or extends duration of the fight. 
The second type is the `FightUnTagEvent` that is called when the player leaves the fight.

You can access both event types by using `@EventHandler`. In example below we check why the player was untagged.

```java
@EventHandler
public void onUnTag(FightUntagEvent event) {
    CauseOfUnTag cause = event.getCause();

    if (cause == CauseOfUnTag.DEATH) {
        Bukkit.getPlayer(event.getPlayer()).sendMessage("You died!");
    }
}
``` 