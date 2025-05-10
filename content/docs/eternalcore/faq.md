---
title: EternalCore - FAQ
---

# ❓ Frequently Asked Questions

## ⛔ How to disable command in EternalCore?

### Problem:
Command from my other plugin is clashing against EternalCore command.

### Solution:
You can disable command in `commands.yml` file.

### Example:
```yaml
  rtp:
    name: []
    enabled: false
    aliases: []
    permissions: []
    subCommands: []
```

## 🎨 How do I format text in chat?

### Problem:
I want to format text in chat. I want to style it, color it, etc.

### Solution:
You can use MiniMessage formatting. Check out the [MiniMessage Viewer](https://webui.advntr.dev/).

### Example:
```yaml
  message: "<gradient:#ff00ee:#f79459>Example message</gradient>"
```

## 🏃💨 How do I stop my title from flickering?

### Problem:
I want to create in game title with timer, but it keeps flickering on users screen.

### Solution:
You can use `times` key in configuration file.

### Example:
```yaml
  teleportTimerFormat:
    actionbar: "<green>► <white>Teleporting in <green>{TIME}"
    chat: "<green>► <white>Teleporting in <green>{TIME}"
    title: "<white>Teleporting..."
    subtitle: "<green>{TIME}"
    times: "1s 2s 1s" # No flickering
``` 