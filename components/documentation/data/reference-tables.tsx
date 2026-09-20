import { getCommands, getPlaceholders } from "@/lib/documentation/eternalcore-data";
import { CommandsTable } from "./commands-table";
import { ReferenceErrorState } from "./data-state";
import { PlaceholdersTable } from "./placeholders-table";

export async function CommandsReference() {
  try {
    return <CommandsTable commands={await getCommands()} />;
  } catch {
    return <ReferenceErrorState label="Commands and permissions" />;
  }
}

export async function PlaceholdersReference() {
  try {
    return <PlaceholdersTable placeholders={await getPlaceholders()} />;
  } catch {
    return <ReferenceErrorState label="Placeholders" />;
  }
}
