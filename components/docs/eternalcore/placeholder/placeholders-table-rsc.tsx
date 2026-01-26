import { fetchEternalCoreData } from "@/lib/docs/eternalcore-data";
import DynamicPlaceholdersTable from "./dynamic-placeholders-table";

export default async function PlaceholdersTableRSC() {
  const { placeholders } = await fetchEternalCoreData();
  return <DynamicPlaceholdersTable initialData={placeholders} />;
}
