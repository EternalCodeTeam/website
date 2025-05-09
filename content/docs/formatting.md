---
title: Formatting Examples
description: All formatting options available in EternalCode documentation
---

# Formatting Examples

Below you can find all formatting options supported in our documentation system.

## Headings

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

## Text Styles

- **Bold**
- _Italic_
- ~~Strikethrough~~
- <u>Underline (HTML)</u>

## Lists

- Unordered list item 1
- Unordered list item 2
  - Nested item

1. Ordered list item 1
2. Ordered list item 2

## Links

[Internal Link](/docs/getting-started/introduction)
[External Link](https://eternalcode.pl)

## Blockquote

> This is a blockquote. Use it for tips, notes, or quotes.

## Inline Code

Here is some `inline code` in a sentence.

## Code Block

```typescript
function hello(name: string) {
  return `Hello, ${name}!`;
}
```

## Code Tabs

<CodeTabs>
  <CodeTab label="TypeScript">

```typescript
const message: string = "Hello TypeScript!";
console.log(message);
```

  </CodeTab>
  <CodeTab label="Python">

```python
def hello():
    print("Hello Python!")
```

  </CodeTab>
</CodeTabs>

## Alerts

<Alert type="info">
This is an info alert.
</Alert>

<Alert type="warning">
This is a warning alert.
</Alert>

<Alert type="danger">
This is a danger alert.
</Alert>

<Alert type="tip">
This is a tip alert.
</Alert>

## Image

![EternalCode Logo](/logo.svg)
