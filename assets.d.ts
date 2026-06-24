declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  import type { StaticImageData } from "next/image";

  const src: StaticImageData;
  export default src;
}
