/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}

declare module "react-fast-marquee" {
  import React from "react";
  interface MarqueeProps {
    className?: string;
    style?: React.CSSProperties;
    speed?: number;
    direction?: "left" | "right" | "up" | "down";
    pauseOnHover?: boolean;
    pauseOnClick?: boolean;
    play?: boolean;
    gradient?: boolean;
    gradientColor?: string;
    gradientWidth?: number | string;
    onCycleComplete?: () => void;
    onFinish?: () => void;
    children?: React.ReactNode;
  }
  const Marquee: React.FC<MarqueeProps>;
  export default Marquee;
}
