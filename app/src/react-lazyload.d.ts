declare module "react-lazyload" {
  import { ComponentType } from "react";

  interface LazyLoadProps {
    once?: boolean;
    height?: number | string;
    offset?: number | number[];
    overflow?: boolean;
    resize?: boolean;
    scroll?: boolean;
    children?: React.ReactNode;
    placeholder?: React.ReactNode;
    debounce?: boolean | number;
    throttle?: number;
  }

  const LazyLoad: ComponentType<LazyLoadProps>;
  export default LazyLoad;
}
