---
title: Documentation Style Guide
description: This guide provides style recommendations for writing documentation for this project to ensure consistency and readability.
---

## Headings

Proper heading hierarchy is crucial for document structure and accessibility.

### Heading Hierarchy

- `# H1`: Reserved for the page title. This is automatically generated from the `title` property in the frontmatter. Do not use `# H1` in the body of your document.
- `## H2`: Main sections of the document. All top-level sections should use `## H2`.
- `### H3`: Subsections within a main section.
- `#### H4`: For further subdivision if necessary.
- `##### H5` and `###### H6`: Use sparingly. If you need this level of nesting, consider restructuring your document.

### Heading Best Practices

- Use sentence case for headings (e.g., "This is a heading," not "This Is a Heading").
- Keep headings concise and descriptive.
- Do not skip heading levels (e.g., an `H3` should not directly follow an `H1`).

## Text Formatting

- **Bold**: Use for UI elements that users interact with, like button names or menu items. Example: Click on the **Save** button.
- _Italics_: Use for emphasis, for new terms or concepts, or for file paths. Example: The file is located in _configs/eternalcore_.
- `Inline Code`: Use for short code snippets, command names, filenames, and property names. Example: Set `enabled: true` in the configuration.

## Custom Components

Our documentation site uses special components to enhance content.

### Alerts

Use alerts to highlight important information.

- `Alert type="tip" title="TIP"`: For helpful tips and tricks.
- `Alert type="info" title="INFO"`: For neutral, informational messages.
- `Alert type="warning" title="WARNING"`: For warnings and potential issues.
- `Alert type="danger" title="DANGER"`: For critical information and breaking changes.

Example of how to write an alert:

```jsx
<Alert type="tip" title="TIP">
  This is a helpful tip!
</Alert>
```

## Links

- **Internal Links**: Use relative paths to link to other documentation pages. Example: `[our contribution guide](../contribute/guide.md)`.
- **External Links**: Always use full URLs.

## Lists

- **Unordered Lists**: Use for items where the order does not matter. Use a hyphen (`-`) for list items.
- **Ordered Lists**: Use for step-by-step instructions or when order is important.

## Adding New Documents

To make a new document visible in the sidebar, you must add it to the `docsStructure` array in `components/page/docs/sidebar-structure.ts`.

Find the appropriate section and add an object with the `title` for the sidebar and the `path` to your new file.

**Example:**

```ts
// ...
children: [
    {
    title: "Your New Document",
    path: "/docs/section/your-new-document-name",
    },
],
//...
```
