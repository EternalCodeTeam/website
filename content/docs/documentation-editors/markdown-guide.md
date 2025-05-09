---
title: Markdown Documentation Guide
description: A comprehensive guide to using Markdown in our documentation system
---

# Markdown Documentation Guide

This guide provides a comprehensive overview of all Markdown features available in our documentation system.

## Frontmatter

Frontmatter is used at the top of Markdown files to define metadata. It's written in YAML format between triple-dashed lines:

```yaml
---
title: Page Title
description: Page description that appears in meta tags
---
```

Available frontmatter fields:
- `title`: The page title (required)
- `description`: Page description for SEO (recommended)

## Links

### Internal Links

Link to other pages within the documentation:

```markdown
[Getting Started](/docs/documentation-editors/markdown-guide)
```

[Getting Started](/docs/documentation-editors/markdown-guide)

### External Links

Link to external websites:

```markdown
[EternalCode Website](https://eternalcode.pl)
```

[EternalCode Website](https://eternalcode.pl)

## Headings

Create section headings using hash symbols:

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

## Text Formatting

```markdown
**Bold text**
*Italic text*
~~Strikethrough~~
`Inline code`
```

**Bold text**
*Italic text*
~~Strikethrough~~
`Inline code`

## Lists

### Unordered Lists

```markdown
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3
```

- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

### Ordered Lists

```markdown
1. First item
2. Second item
3. Third item
```

1. First item
2. Second item
3. Third item

## Tables

Create tables using pipes and dashes. Tables are automatically styled with enhanced formatting, including header styling, alternating row colors, hover effects, and responsive design:

```markdown
| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

The table styling includes:
- Dark headers with light text
- Alternating row colors for better readability
- Hover effects to highlight the current row
- Rounded corners and subtle shadows
- Automatic dark mode support

### Table Alignment

You can align text in columns:

```markdown
| Left-aligned | Center-aligned | Right-aligned |
| :----------- | :------------: | ------------: |
| Left         | Center         | Right         |
| Text         | Text           | Text          |
```

| Left-aligned | Center-aligned | Right-aligned |
| :----------- | :------------: | ------------: |
| Left         | Center         | Right         |
| Text         | Text           | Text          |

## Emoji

You can use GitHub-style emoji shortcodes:

```markdown
:smile: :heart: :rocket: :warning:
```

:smile: :heart: :rocket: :warning:

## GitHub-flavored Alerts

Our documentation supports GitHub-style alerts using our custom Alert component:

```markdown
<Alert type="info">
This is an information alert.
</Alert>

<Alert type="warning">
This is a warning alert.
</Alert>

<Alert type="danger">
This is a danger/error alert.
</Alert>

<Alert type="tip">
This is a tip/success alert.
</Alert>
```

<Alert type="info">
This is an information alert.
</Alert>

<Alert type="warning">
This is a warning alert.
</Alert>

<Alert type="danger">
This is a danger/error alert.
</Alert>

<Alert type="tip">
This is a tip/success alert.
</Alert>

## Code Blocks

### Basic Code Block

```markdown
​```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
​```
```

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

### Line Highlighting in Code Blocks

Highlight specific lines by adding line numbers in curly braces after the language name:

```markdown
​```javascript {2,4-6}
function example() {
  // This line is highlighted
  const a = 1;
  // These lines are
  // also highlighted
  // as a group
  return a;
}
​```
```

```javascript {2,4-6}
function example() {
  // This line is highlighted
  const a = 1;
  // These lines are
  // also highlighted
  // as a group
  return a;
}
```

### Focus in Code Blocks

Focus on specific lines while fading others by adding focus-lines in curly braces:

```markdown
​```javascript focus=3
function example() {
  const a = 1;
  // This line is in focus
  const b = 2;
  return a + b;
}
​```
```

```javascript focus=3
function example() {
  const a = 1;
  // This line is in focus
  const b = 2;
  return a + b;
}
```

### Colored Diffs in Code Blocks

Show additions and deletions in code:

```markdown
​```diff
function example() {
- const oldValue = 'old';
+ const newValue = 'new';
  return newValue;
}
​```
```

```diff
function example() {
- const oldValue = 'old';
+ const newValue = 'new';
  return newValue;
}
```

## Code Tabs

Use the CodeTabs component to show code in multiple languages:

```markdown
<CodeTabs>
  <CodeTab label="JavaScript">

​```javascript
function hello() {
  console.log("Hello JavaScript!");
}
​```

  </CodeTab>
  <CodeTab label="TypeScript">

​```typescript
function hello(): void {
  console.log("Hello TypeScript!");
}
​```

  </CodeTab>
  <CodeTab label="Python">

​```python
def hello():
    print("Hello Python!")
​```

  </CodeTab>
</CodeTabs>
```

<CodeTabs>
  <CodeTab label="JavaScript">

```javascript
function hello() {
  console.log("Hello JavaScript!");
}
```

  </CodeTab>
  <CodeTab label="TypeScript">

```typescript
function hello(): void {
  console.log("Hello TypeScript!");
}
```

  </CodeTab>
  <CodeTab label="Python">

```python
def hello():
    print("Hello Python!")
```

  </CodeTab>
</CodeTabs>

## Blockquotes

```markdown
> This is a blockquote.
> 
> It can span multiple lines.
```

> This is a blockquote.
> 
> It can span multiple lines.

## Horizontal Rules

```markdown
---
```

---

## Images

```markdown
![Alt text](/logo.svg)
```

![Alt text](/logo.svg)

## Task Lists

```markdown
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task
```

- [x] Completed task
- [ ] Incomplete task
- [ ] Another task
