"use client";

import DynamicCommandsTable from "@/components/page/docs/eternalcore/DynamicCommandsTable";
import DynamicFeaturesTable from "@/components/page/docs/eternalcore/DynamicFeaturesTable";
import TableWrapper from "@/components/page/docs/table/TableWrapper";

export const components = {
  DynamicFeaturesTable,
  DynamicCommandsTable,
  // Use TableWrapper with a delay of 2000ms to replace AnimationSafeTable
  AnimationSafeTable: (props: any) => <TableWrapper {...props} delay={2000} />,
  // Use TableWrapper with a delay of 2000ms to replace TableContainer
  TableContainer: (props: any) => <TableWrapper {...props} delay={2000} />,
};
