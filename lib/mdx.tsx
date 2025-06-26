import React from "react";

import { H1, H2, H3, H4, H5, H6 } from "@/components/page/docs/content/DocsContentHeading";
import { CodeBlock } from "@/components/page/docs/code/CodeBlock";
import { CodeTabs, CodeTab } from "@/components/page/docs/code/CodeTabs";
import DynamicCommandsTable from "@/components/page/docs/eternalcore/DynamicCommandsTable";
import DynamicFeaturesTable from "@/components/page/docs/eternalcore/DynamicFeaturesTable";
import { Inline } from "@/components/page/docs/inline/Inline";
import TableWrapper from "@/components/page/docs/table/TableWrapper";
import { AlertBox } from "@/components/ui/alert-box";

import { mdxOptions } from "./mdx-config.mjs";

export const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  Alert: AlertBox,
  CodeTabs,
  CodeTab,
  DynamicFeaturesTable,
  DynamicCommandsTable,
  Inline,
  code: (props: React.ComponentProps<"code">) => {
    const { children, ...rest } = props;
    let content = typeof children === "string" ? children : String(children);
    content = content.replace(/^`+|`+$/g, "");
    if (!content.includes("\n")) {
      return <Inline {...rest}>{content}</Inline>;
    }
    return React.createElement("code", { ...rest }, children);
  },
  pre: CodeBlock,
  TableWrapper,
  TableContainer: (props: any) => <TableWrapper {...props} delay={2000} />,
};

export { mdxOptions };
