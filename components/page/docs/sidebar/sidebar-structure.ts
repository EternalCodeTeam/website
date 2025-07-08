import { DocItem } from './types';

export const docsStructure: DocItem[] = [
  {
    title: "EternalCore",
    path: "/docs/eternalcore",
    children: [
      { title: "Introduction", path: "/docs/eternalcore/introduction" },
      {
        title: "Installation and Upgrading",
        path: "/docs/eternalcore/installation",
      },
      {
        title: "Features",
        path: "/docs/eternalcore/features",
        children: [
          { title: "Butcher Command", path: "/docs/eternalcore/features/butcher-command" },
        ],
      },
      { title: "FAQ", path: "/docs/eternalcore/faq" },
      {
        title: "Features, Commands and Permissions",
        path: "/docs/eternalcore/features",
      },
      { title: "Homes", path: "/docs/eternalcore/homes" },
      { title: "Placeholders", path: "/docs/eternalcore/placeholders" },
      { title: "Developer API", path: "/docs/eternalcore/using-api" },
    ],
  },
  {
    title: "EternalCombat",
    path: "/docs/eternalcombat",
    children: [
      { title: "Introduction", path: "/docs/eternalcombat/introduction" },
      {
        title: "Installation and Upgrading",
        path: "/docs/eternalcombat/installation",
      },
      { title: "Features", path: "/docs/eternalcombat/features" },
      { title: "Using API", path: "/docs/eternalcombat/using-api" },
    ],
  },
  {
    title: "Documentation Editors",
    path: "/docs/documentation-editors",
    children: [
      {
        title: "Markdown Guide",
        path: "/docs/documentation-editors/markdown-guide",
      },
      {
        title: "Documentation Style Guide",
        path: "/docs/documentation-editors/documentation-style-guide",
      },
    ],
  },
  {
    title: "Contribute",
    path: "/docs/contribute",
    children: [{ title: "How to Contribute", path: "/docs/contribute/guide" }],
  },
  {
    title: "Notifications",
    path: "/docs/notification",
    children: [{ title: "How to use Notifications?", path: "/docs/notification/notifications" }],
  },
];
