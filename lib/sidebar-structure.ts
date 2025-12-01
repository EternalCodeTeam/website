import type { DocItem } from "@/components/docs/sidebar/types";

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
        title: "Commands & Permissions",
        path: "/docs/eternalcore/commands-and-permissions",
        icon: "List",
      },
      { title: "Placeholders", path: "/docs/eternalcore/placeholders", icon: "Hash" },
      {
        title: "Features",
        path: "/docs/eternalcore/features",
        icon: "Star",
        children: [
          {
            title: "AdminChat",
            path: "/docs/eternalcore/features/adminchat",
            icon: "MessagesSquare",
          },
          { title: "AFK", path: "/docs/eternalcore/features/afk", icon: "Bed" },
          { title: "Burn", path: "/docs/eternalcore/features/burn", icon: "Flame" },
          {
            title: "Butcher",
            path: "/docs/eternalcore/features/butcher",
            icon: "Slice",
          },
          {
            title: "Clear inventory",
            path: "/docs/eternalcore/features/clear",
            icon: "BrushCleaning",
          },
          {
            title: "Container inventories",
            path: "/docs/eternalcore/features/container",
            icon: "PackageOpen",
          },
          {
            title: "Fun Commands",
            path: "/docs/eternalcore/features/fun",
            children: [
              {
                title: "Elder Guardian",
                path: "/docs/eternalcore/features/elderguardian",
                icon: "ScanEye",
              },
            ],
          },
          { title: "Feed", path: "/docs/eternalcore/features/feed", icon: "Apple" },
          { title: "Fireball", path: "/docs/eternalcore/features/fireball", icon: "Volleyball" },
          { title: "Fly", path: "/docs/eternalcore/features/fly", icon: "PlaneTakeoff" },
          {
            title: "Freeze",
            path: "/docs/eternalcore/features/freeze",
            icon: "Snowflake",
          },
          { title: "Gamemode", path: "/docs/eternalcore/features/gamemode", icon: "Joystick" },
          { title: "Give", path: "/docs/eternalcore/features/give", icon: "ShoppingBasket" },
          { title: "God mode", path: "/docs/eternalcore/features/god", icon: "HandFist" },
          { title: "Hat", path: "/docs/eternalcore/features/hat", icon: "GraduationCap" },
          {
            title: "Heal",
            path: "/docs/eternalcore/features/heal",
            icon: "HeartPlus",
          },
          { title: "Homes", path: "/docs/eternalcore/features/homes", icon: "Home" },
          { title: "Ignore", path: "/docs/eternalcore/features/ignore", icon: "MessageCircleX" },
          { title: "Item edit", path: "/docs/eternalcore/features/itemedit", icon: "Pencil" },
          { title: "Jail", path: "/docs/eternalcore/features/jail", icon: "Columns4" },
          { title: "Lightning", path: "/docs/eternalcore/features/lightning", icon: "Zap" },
          { title: "Message of the Day", path: "/docs/eternalcore/features/motd", icon: "Mailbox" },
          { title: "Near", path: "/docs/eternalcore/features/near", icon: "Radar" },
          { title: "Playtime", path: "/docs/eternalcore/features/playtime", icon: "ClockArrowUp" },
          {
            title: "Powertools",
            path: "/docs/eternalcore/features/powertool",
            icon: "WandSparkles",
          },
          {
            title: "Private messages",
            path: "/docs/eternalcore/features/msg",
            icon: "MessageSquareLock",
          },
          {
            title: "Random teleport",
            path: "/docs/eternalcore/features/randomtp",
            icon: "MapPinned",
          },
          { title: "Repair", path: "/docs/eternalcore/features/repair", icon: "Cog" },
          { title: "Seen", path: "/docs/eternalcore/features/seen", icon: "Eye" },
          { title: "Set slot", path: "/docs/eternalcore/features/setslot", icon: "ArrowUp10" },
          { title: "Spawn", path: "/docs/eternalcore/features/spawn", icon: "LocateFixed" },
          { title: "Speed", path: "/docs/eternalcore/features/speed", icon: "ArrowBigUpDash" },
          {
            title: "Teleport ask-here",
            path: "/docs/eternalcore/features/tpahere",
            icon: "MapPinHouse",
          },
          { title: "Time", path: "/docs/eternalcore/features/time", icon: "Clock" },
        ],
      },
      { title: "FAQ", path: "/docs/eternalcore/faq", icon: "HelpCircle" },
      { title: "Developer API", path: "/docs/eternalcore/using-api", icon: "Code" },
      { title: "2.0 Changelog", path: "/docs/eternalcore/v2-changelog", icon: "History" },
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
