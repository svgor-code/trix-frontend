declare module "*.svg?" {
  const publicPath: string;
  export default publicPath;
}

// with { exportType: "default" }
declare module "*.svg" {
  import { ReactElement, SVGProps } from "react";
  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}

// with { exportType: "named" }
declare module "*.svg" {
  import { ReactElement, SVGProps } from "react";
  const ReactComponent: (props: SVGProps<SVGElement>) => ReactElement;
  export { ReactComponent };
}

// with { exportType: "named", namedExport: "Svg" }
declare module "*.svg" {
  import { ReactElement, SVGProps } from "react";
  const Svg: (props: SVGProps<SVGElement>) => ReactElement;
  export { Svg };
}