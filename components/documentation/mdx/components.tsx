import type { MDXComponents } from "mdx/types";

import {
  CommandsReference,
  PlaceholdersReference,
} from "@/components/documentation/data/reference-tables";

import { AlertBox, Callout } from "./callout";
import { Card, CardGroup } from "./cards";
import { CodeBlock } from "./code-block";
import { CodeTab, CodeTabs } from "./code-tabs";
import { Badge, createHeading, Divider, DocumentationLink, DocumentationTable } from "./elements";
import { BeforeAfter, BeforeAfterItem, Command, FileTree, FileTreeItem, LinkPreview } from "./misc";
import { Step, Steps } from "./steps";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    a: DocumentationLink,
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    pre: CodeBlock,
    table: DocumentationTable,
    AlertBox,
    Badge,
    BeforeAfter,
    BeforeAfterItem,
    Callout,
    Card,
    CardGroup,
    CodeTab,
    CodeTabs,
    Command,
    Divider,
    DynamicCommandsTable: CommandsReference,
    DynamicPlaceholdersTable: PlaceholdersReference,
    FileTree,
    FileTreeItem,
    LinkPreview,
    Step,
    Steps,
    ...components,
  };
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
