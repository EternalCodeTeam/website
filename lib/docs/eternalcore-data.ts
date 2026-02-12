import "server-only";

export interface CommandData {
  name: string;
  permission: string;
  description: string;
  arguments: string;
}

export interface PlaceholderData {
  name: string;
  description: string;
  category: string;
  example: string;
  returnType: string;
  requiresPlayer: boolean;
}

interface RawEternalCoreData {
  commands?: Array<{
    name: string;
    permissions?: string[];
    descriptions?: string[];
    arguments?: string[];
  }>;
  permissions?: Array<{
    name: string;
    permissions?: string[];
    descriptions?: string[];
  }>;
  placeholders?: Array<{
    name: string;
    description: string;
    category?: string;
  }>;
}

const REGEX_LEADING_SLASH = /^\//;

export async function fetchEternalCoreData() {
  const [commandsRes, placeholdersRes] = await Promise.all([
    fetch(
      "https://raw.githubusercontent.com/EternalCodeTeam/EternalCore/refs/heads/master/raw_eternalcore_documentation.json",
      {
        next: {
          revalidate: 3600,
          tags: ["eternalcore-data"],
        },
      }
    ),
    fetch(
      "https://raw.githubusercontent.com/EternalCodeTeam/EternalCore/refs/heads/master/raw_eternalcore_placeholders.json",
      {
        next: {
          revalidate: 3600,
          tags: ["eternalcore-placeholders"],
        },
      }
    ),
  ]);

  if (!commandsRes.ok) {
    throw new Error("Failed to fetch EternalCore commands data");
  }

  if (!placeholdersRes.ok) {
    throw new Error("Failed to fetch EternalCore placeholders data");
  }

  const commandsData = (await commandsRes.json()) as RawEternalCoreData;
  // biome-ignore lint/suspicious/noExplicitAny: External data source
  const placeholdersData = (await placeholdersRes.json()) as any[];

  const commandsList =
    commandsData.commands?.map((c) => ({
      name: `/${c.name.trim()}`,
      permission: c.permissions?.[0] ?? "-",
      description: c.descriptions?.[0] ?? "-",
      arguments: c.arguments?.join(", ") ?? "-",
    })) ?? [];

  const permsList =
    commandsData.permissions?.map((p) => ({
      name: p.name || "Unknown",
      permission: p.permissions?.[0] ?? "-",
      description: p.descriptions?.[0] ?? "-",
      arguments: "-",
    })) ?? [];

  const sortedCommands = [...commandsList, ...permsList].sort((a, b) =>
    a.name
      .replace(REGEX_LEADING_SLASH, "")
      .localeCompare(b.name.replace(REGEX_LEADING_SLASH, ""), "pl", {
        sensitivity: "base",
      })
  );

  const placeholders =
    placeholdersData?.map((p) => ({
      name: p.name,
      description: p.description,
      category: p.category ?? "General",
      example: p.example ?? "",
      returnType: p.returnType ?? "String",
      requiresPlayer: p.requiresPlayer ?? false,
    })) ?? [];

  const sortedPlaceholders = placeholders.sort((a, b: { name: string }) =>
    a.name.localeCompare(b.name)
  );

  return {
    commands: sortedCommands,
    placeholders: sortedPlaceholders,
  };
}
