---
title: EternalCore - Notifications
---

# 💬🔔 Notifications

This plugin allows sending messages to different parts of Minecraft, including the chat, action bar, title, and subtitle. All messages can be formatted using [🔍 MiniMessages](https://docs.adventure.kyori.net/minimessage/format.html) or standard color codes. You can also use an online [🌐 message viewer](https://webui.adventure.kyori.net/)

## 📝 Example usage

Syntax for sending notifications:

### Chat + Multiline chat

```yaml
# Displays a message in the chat.
example: "Hello world!" # <- Single one line text
example2: # <- If you want display multiple lines in the chat, use the following syntax:
  - "Hello"
  - "world!"
```

### Actionbar

```yaml
# Displays a message in the action bar.
example:
  actionbar: "Hello world!"
```

### Title

```yaml
# Displays a message in the title.
example:
  title: "Hello world!"
```

### Subtitle

```yaml
# Displays a message in the subtitle.
example:
  subtitle: "Hello world!"
```

### Title with times

```yaml
# Displays a message in the title or subtitle with specified times.
# THIS also working for subtitle
example:
  title: "Hello world!"
  times: "1s 2s 1s" # <- The first number is the time it takes to fade in, the second is the time it takes to stay on the screen, and the third is the time it takes to fade out.
```

### Sounds

```yaml
# Plays a sound with the specified volume and pitch.
example:
  sound: "ENTITY_PLAYER_LEVELUP 2.0 1.0" # <- The first number is the volume, the second is the pitch.
```

### Sounds + Category

```yaml
# Plays a sound with the specified volume and pitch.
example:
  # Sound categories: https://hub.spigotmc.org/javadocs/spigot/org/bukkit/SoundCategory.html
  sound: "PLAYER_LEVELUP WEATHER 2.0 1.0" # <- The first number is the volume, the second is the pitch.
  # If you want to play a sound in a certain category, for example if a player has the sound category "WEATHER" in the game settings set to 0%, the sound will not play.
```

---

### Examples combining multiple notifications:

👑 Unleash your creativity and design your own custom notifications without any limits!

#### Disable message

```yaml
# Does not display a message.
example: []
```

#### Chat + Actionbar

```yaml
# Displays a message in the chat and action bar.
example:
  chat: "Hello world!"
  actionbar: "Hello world!"
```

#### Title + Subtitle

```yaml
# Displays a message in the title and subtitle.
example:
  title: "Hello world!"
  subtitle: "Hello world!"
```

#### Title + Subtitle with specified times

```yaml
# Displays a message in the title and subtitle.
example:
  title: "Hello world!"
  subtitle: "Hello world!"
  times: "1s 2s 1s" # <- The first number is the time it takes to fade in, the second is the time it takes to stay on the screen, and the third is the time it takes to fade out.
```

#### Chat + Actionbar + Title + Subtitle

```yaml
# Displays a message in the chat, action bar, title, and subtitle.
example:
  chat: "Hello world!"
  actionbar: "Hello world!"
  title: "Hello world!"
  subtitle: "Hello world!"
```

#### Chat + Actionbar + Title + Subtitle with specified times for title and subtitle

```yaml
# Displays a message in the chat, action bar, title, and subtitle with specified times for title and subtitle
example:
  chat: "Hello world!"
  actionbar: "Hello world!"
  title: "Hello world!"
  subtitle: "Hello world!"
  times: "1s 2s 1s" # <- The first number is the time it takes to fade in, the second is the time it takes to stay on the screen, and the third is the time it takes to fade out.
```

#### Chat + Actionbar + Title + Subtitle + Sound

```yaml
# Displays a message in the chat, action bar, title, and subtitle with specified times for title and subtitle
example:
  chat: "Hello world!"
  actionbar: "Hello world!"
  title: "Hello world!"
  subtitle: "Hello world!"
  sound: "ENTITY_PLAYER_LEVELUP 2.0 1.0" # <- The first number is the volume, the second is the pitch.
```

#### Chat + Actionbar + Title + Subtitle + Sound + Category

```yaml
# Displays a message in the chat, action bar, title, and subtitle with specified times for title and subtitle
example:
  chat: "Hello world!"
  actionbar: "Hello world!"
  title: "Hello world!"
  subtitle: "Hello world!"
  sound: "ENTITY_PLAYER_LEVELUP WEATHER 2.0 1.0" # <- The first number is the volume, the second is the pitch.
  # If you want to play a sound in a certain category, for example if a player has the sound category "WEATHER" in the game settings set to 0%, the sound will not play.
```

#### Clear title/subtitle before send new

```yaml
# Clears the title and subtitle before sending a new one.
example:
  titleHide: true
```
