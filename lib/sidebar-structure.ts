import { DocItem } from "@/components/docs/sidebar/types";

export const docsStructure: DocItem[] = [
  {
    title: "EternalCore",
    path: "/docs/eternalcore",
    icon: "Zap",
    children: [
      { title: "Introduction", path: "/docs/eternalcore/introduction", icon: "BookOpen" },
      {
        title: "Installation and Upgrading",
        path: "/docs/eternalcore/installation",
        icon: "Download",
      },
      {
        title: "Features",
        path: "/docs/eternalcore/features",
        icon: "Star",
        children: [
          {
            title: "Commands and Permissions",
            path: "/docs/eternalcore/features/permissions",
            icon: "Shield",
          },
          {
            title: "Butcher Command",
            path: "/docs/eternalcore/features/butcher-command",
            icon: "Sword",
          },
          {
            title: "AdminChat Command",
            path: "/docs/eternalcore/features/adminchat",
            icon: "MessageSquare",
          },
          { title: "Homes", path: "/docs/eternalcore/features/homes", icon: "MapPin" },
        ],
      },
      { title: "FAQ", path: "/docs/eternalcore/faq", icon: "HelpCircle" },
      { title: "Placeholders", path: "/docs/eternalcore/placeholders", icon: "Hash" },
      { title: "Developer API", path: "/docs/eternalcore/using-api", icon: "Code" },
    ],
  },
  {
    title: "EternalCombat",
    path: "/docs/eternalcombat",
    icon: "Sword",
    children: [
      { title: "Introduction", path: "/docs/eternalcombat/introduction", icon: "BookOpen" },
      {
        title: "Installation and Upgrading",
        path: "/docs/eternalcombat/installation",
        icon: "Download",
      },
      { title: "Features", path: "/docs/eternalcombat/features", icon: "Star" },
      { title: "Using API", path: "/docs/eternalcombat/using-api", icon: "Code" },
    ],
  },
  {
    title: "Contribute",
    path: "/docs/contribute",
    icon: "Heart",
    children: [{ title: "How to Contribute", path: "/docs/contribute/guide", icon: "Users" }],
  },
  {
    title: "Notifications",
    path: "/docs/notification",
    icon: "Bell",
    children: [
      {
        title: "How to use Notifications?",
        path: "/docs/notification/notifications",
        icon: "MessageSquare",
      },
    ],
  },
];
