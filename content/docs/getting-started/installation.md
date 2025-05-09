---
title: Installation
description: Learn how to install and set up the documentation system
---

# Installation

To get started with the documentation system, follow these steps:

## Prerequisites

Make sure you have the following installed:

- Node.js 18.0.0 or later
- Bun package manager

## Installation Steps

1. Clone the repository:

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

2. Install dependencies:

```bash
bun install
```

3. Start the development server:

```bash
bun dev
```

## Configuration

The documentation system can be configured through the `next.config.js` file:

```typescript
import { withContentlayer } from "next-contentlayer";

const nextConfig = {
  // Your Next.js configuration
};

export default withContentlayer(nextConfig);
```

## Adding Content

Create your documentation files in the `content/docs` directory using Markdown or MDX:

```markdown
---
title: My Documentation
description: A brief description
---

# My Documentation

Your content here...
```

## Custom Components

You can use custom components in your documentation:

```tsx
import { Alert } from "@/components/docs/MDXComponents";

export default function MyComponent() {
  return <Alert type="info">This is an informational message.</Alert>;
}
```

## Next Steps

- Learn about [writing documentation](/docs/guides/writing-docs)
- Explore [available components](/docs/components)
- Check out [advanced features](/docs/advanced)
