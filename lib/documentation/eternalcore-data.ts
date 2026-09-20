import "server-only";

import { z } from "zod";

const rawCommandSchema = z.object({
  name: z.string().min(1),
  permissions: z.array(z.string()).optional(),
  descriptions: z.array(z.string()).optional(),
  arguments: z.array(z.string()).optional(),
});

const rawPermissionSchema = z.object({
  name: z.string().min(1),
  permissions: z.array(z.string()).optional(),
  descriptions: z.array(z.string()).optional(),
});

const commandsPayloadSchema = z.object({
  commands: z.array(rawCommandSchema).default([]),
  permissions: z.array(rawPermissionSchema).default([]),
});

const rawPlaceholderSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  category: z.string().optional(),
  example: z.string().optional(),
  returnType: z.string().optional(),
  requiresPlayer: z.boolean().optional(),
});

export interface CommandReference {
  readonly name: string;
  readonly permission: string;
  readonly description: string;
  readonly arguments: string;
}

export interface PlaceholderReference {
  readonly name: string;
  readonly description: string;
  readonly category: string;
  readonly example: string;
  readonly returnType: string;
  readonly requiresPlayer: boolean;
}

const LEADING_SLASH = /^\//;

export function normalizeCommands(payload: unknown): CommandReference[] {
  const parsed = commandsPayloadSchema.parse(payload);
  const commands = parsed.commands.map((command) => ({
    name: `/${command.name.replace(LEADING_SLASH, "").trim()}`,
    permission: command.permissions?.[0] ?? "-",
    description: command.descriptions?.[0] ?? "-",
    arguments: command.arguments?.join(", ") || "-",
  }));
  const permissions = parsed.permissions.map((permission) => ({
    name: permission.name,
    permission: permission.permissions?.[0] ?? "-",
    description: permission.descriptions?.[0] ?? "-",
    arguments: "-",
  }));

  return [...commands, ...permissions].toSorted((left, right) =>
    left.name
      .replace(LEADING_SLASH, "")
      .localeCompare(right.name.replace(LEADING_SLASH, ""), "en", { sensitivity: "base" })
  );
}

export function normalizePlaceholders(payload: unknown): PlaceholderReference[] {
  return z
    .array(rawPlaceholderSchema)
    .parse(payload)
    .map((placeholder) => ({
      name: placeholder.name,
      description: placeholder.description,
      category: placeholder.category ?? "General",
      example: placeholder.example ?? "",
      returnType: placeholder.returnType ?? "String",
      requiresPlayer: placeholder.requiresPlayer ?? false,
    }))
    .toSorted((left, right) => left.name.localeCompare(right.name, "en"));
}

export async function getCommands() {
  const response = await fetch(
    "https://raw.githubusercontent.com/EternalCodeTeam/EternalCore/refs/heads/master/raw_eternalcore_documentation.json",
    { next: { revalidate: 3600, tags: ["eternalcore-commands"] } }
  );

  if (!response.ok) {
    throw new Error(`EternalCore commands returned ${response.status}`);
  }

  return normalizeCommands(await response.json());
}

export async function getPlaceholders() {
  const response = await fetch(
    "https://raw.githubusercontent.com/EternalCodeTeam/EternalCore/refs/heads/master/raw_eternalcore_placeholders.json",
    { next: { revalidate: 3600, tags: ["eternalcore-placeholders"] } }
  );

  if (!response.ok) {
    throw new Error(`EternalCore placeholders returned ${response.status}`);
  }

  return normalizePlaceholders(await response.json());
}
