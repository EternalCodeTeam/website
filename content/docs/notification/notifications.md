---
title: Notifications
---

# 💬🔔 Notifications

This plugin allows sending messages to different parts of Minecraft, including the chat, action bar, title, and subtitle. All messages can be formatted using [🔍 MiniMessages](https://docs.adventure.kyori.net/minimessage/format.html) or standard color codes. You can also use an online [🌐 message viewer](https://webui.adventure.kyori.net/)

<Alert type="tip" title="TIP">
Try our [interactive notification generator](/notification-generator) to create and preview your notifications before adding them to your configuration!
</Alert>

### 📝 Example usage

Syntax for sending notifications:

#### Chat + Multiline chat

<CodeTabs>
<CodeTab label="Single line">

```yaml
# Displays a message in the chat.
example: "Hello world!" # <- Single one line text
```

</CodeTab>
<CodeTab label="Multiple lines">

```yaml
# Displays multiple lines in the chat.
example2:
  - "Hello"
  - "world!"
```

</CodeTab>
</CodeTabs>

#### Actionbar

<CodeTabs>
<CodeTab label="Basic">

```yaml
# Displays a message in the action bar.
example:
  actionbar: "Hello world!"
```

</CodeTab>
</CodeTabs>

#### Title

<CodeTabs>
<CodeTab label="Basic">

```yaml
# Displays a message in the title.
example:
  title: "Hello world!"
```

</CodeTab>
</CodeTabs>

#### Subtitle

<CodeTabs>
<CodeTab label="Basic">

```yaml
# Displays a message in the subtitle.
example:
  subtitle: "Hello world!"
```

</CodeTab>
</CodeTabs>

#### Title with times

<CodeTabs>
<CodeTab label="With fade times">

```yaml
# Displays a message in the title or subtitle with specified times.
# THIS also working for subtitle
example:
  title: "Hello world!"
  times: "1s 2s 1s" # <- The first number is the time it takes to fade in, the second is the time it takes to stay on the screen, and the third is the time it takes to fade out.
```

</CodeTab>
</CodeTabs>

#### Sounds

<CodeTabs>
<CodeTab label="Basic">

```yaml
# Plays a sound with the specified volume and pitch.
example:
  sound: "ENTITY_PLAYER_LEVELUP 2.0 1.0" # <- The first number is the volume, the second is the pitch.
```

</CodeTab>
<CodeTab label="With category">

```yaml
# Plays a sound with the specified volume and pitch.
example:
  # Sound categories: https://hub.spigotmc.org/javadocs/spigot/org/bukkit/SoundCategory.html
  sound: "PLAYER_LEVELUP WEATHER 2.0 1.0" # <- The first number is the volume, the second is the pitch.
  # If you want to play a sound in a certain category, for example if a player has the sound category "WEATHER" in the game settings set to 0%, the sound will not play.
```

</CodeTab>
</CodeTabs>

---

### Examples combining multiple notifications:

<Alert type="tip" title="TIP">
👑 Unleash your creativity and design your own custom notifications without any limits!
</Alert>

Here's an example of an advanced notification that combines multiple notification types:

```yaml
# Advanced notification example
advanced_notification:
  # Chat message with multiple lines
  chat:
    - "<gradient:gold:yellow>Welcome to the server!</gradient>"
    - "<gray>Use <click:run_command:/help><hover:show_text:Click to see help><gold>/help</gold></hover></click> for assistance.</gray>"
  
  # Action bar notification
  actionbar: "<gradient:aqua:blue>You have <gold>5</gold> unread messages</gradient>"
  
  # Title and subtitle with custom times
  title: "<gradient:red:dark_red>WARNING!</gradient>"
  subtitle: "<gray>You are entering a PvP zone</gray>"
  times: "0.5s 3s 1s"  # Fade in, stay, fade out
  
  # Sound effect with custom volume and pitch
  sound: "ENTITY_ENDER_DRAGON_GROWL MASTER 1.0 0.8"
  
  # Clear any existing title/subtitle before showing this one
  titleHide: true
```

This example demonstrates:
- Multi-line chat messages with gradients and clickable elements
- Action bar notifications with gradients
- Title and subtitle with custom fade times
- Sound effects with custom volume and pitch
- Title clearing before showing new notifications

You can mix and match these elements to create your own custom notifications! 