import { DocItem } from "@/components/docs/sidebar/types";

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
          { title: "Commands and Permissions", path: "/docs/eternalcore/features/permissions" },
          { title: "Butcher Command", path: "/docs/eternalcore/features/butcher-command" },
          { title: "AdminChat Command", path: "/docs/eternalcore/features/adminchat" },
          { title: "Homes", path: "/docs/eternalcore/features/homes" },
        ],
      },
      {
        title: "Commands",
        path: "/docs/eternalcore/commands",
        children: [
          { title: "Disable commands", path: "/docs/eternalcore/commands/disable-commands" },
          { title: "Edit commands", path: "/docs/eternalcore/commands/edit-commands" },
        ],
      },
      { title: "FAQ", path: "/docs/eternalcore/faq" },
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
