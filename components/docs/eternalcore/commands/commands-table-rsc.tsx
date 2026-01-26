import { fetchEternalCoreData } from "@/lib/docs/eternalcore-data";
import DynamicCommandsTable from "./dynamic-commands-table";

export default async function CommandsTableRSC() {
  const { commands } = await fetchEternalCoreData();
  return <DynamicCommandsTable initialData={commands} />;
}
