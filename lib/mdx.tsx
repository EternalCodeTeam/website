import React from "react";
import { Inline } from "@/components/docs/Inline";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeTabs, CodeTab } from "@/components/docs/CodeTabs";
import { H1, H2, H3, H4, H5, H6 } from "@/components/docs/AnimatedHeading";
import DynamicFeaturesTable from "@/components/docs/DynamicFeaturesTable";
import DynamicCommandsTable from "@/components/docs/DynamicCommandsTable";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { mdxOptions } from "./mdx-config.mjs";
import TableWrapper from "@/components/docs/TableWrapper";
import TableContainer from "@/components/docs/TableContainer";

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
    let { children, ...rest } = props;
    let content = typeof children === "string" ? children : String(children);
    content = content.replace(/^`+|`+$/g, "");
    if (!content.includes("\n")) {
      return <Inline {...rest}>{content}</Inline>;
    }
    return React.createElement("code", { ...rest }, children);
  },
  pre: CodeBlock,
  TableWrapper,
  TableContainer,
};


export { mdxOptions };
