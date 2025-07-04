---
title: Frequently Asked Questions
description: Frequently Asked Questions about EternalCore.
---

## Disabling commands

If a command from EternalCore conflicts with a command from another plugin, you can disable it. To do this, locate the command in the `commands.yml` file and set the `enabled` property to `false`.

**Example:**

```yaml
rtp:
  name: []
  enabled: false
  aliases: []
  permissions: []
  subCommands: []
```

## Formatting text in chat

You can format chat messages with colors and styles using MiniMessage. For a live preview and help with formatting, check out the [MiniMessage Viewer](https://webui.advntr.dev/).

**Example:**

```yaml
message: "<gradient:#ff00ee:#f79459>Example message</gradient>"
```

## Preventing title flicker

When creating in-game titles with timers, you might notice flickering. To fix this, use the `times` key in your configuration. This allows you to define the fade-in, stay, and fade-out durations for the title, which prevents flickering.

**Example:**

```yaml
teleportTimerFormat:
  actionbar: "<green>► <white>Teleporting in <green>{TIME}"
  chat: "<green>► <white>Teleporting in <green>{TIME}"
  title: "<white>Teleporting..."
  subtitle: "<green>{TIME}"
  # Fade-in, stay, and fade-out times. Prevents flickering.
  times: "1s 2s 1s"
```
