import { bench, describe } from "vitest";
import { getSlugFromPath, slugify, unslugify } from "../lib/docs/utils";
import { cn } from "../lib/utils";

describe("slugify", () => {
  bench("simple text", () => {
    slugify("Hello World");
  });

  bench("text with special characters", () => {
    slugify("Hello & World! @2024 #CodSpeed");
  });

  bench("text with multiple spaces", () => {
    slugify("  Hello   World   Test  ");
  });

  bench("long text", () => {
    slugify(
      "This is a much longer title that might be used for a documentation page in the project"
    );
  });
});

describe("unslugify", () => {
  bench("simple slug", () => {
    unslugify("hello-world");
  });

  bench("multi-word slug", () => {
    unslugify("this-is-a-longer-slug-with-many-words");
  });
});

describe("getSlugFromPath", () => {
  bench("simple path", () => {
    getSlugFromPath("content/docs/eternalcore/commands.mdx");
  });

  bench("nested path", () => {
    getSlugFromPath("content/docs/eternalcore/features/advanced/config.mdx");
  });
});

describe("cn (class merging)", () => {
  bench("simple classes", () => {
    cn("bg-white px-4 py-2");
  });

  bench("conditional classes", () => {
    const isActive = globalThis.performance.now() > 0;
    cn("px-4 py-2", isActive && "bg-white", !isActive && "bg-black");
  });

  bench("conflicting tailwind classes", () => {
    cn("bg-white px-4 py-2 text-black", "bg-red-500 px-8");
  });
});
