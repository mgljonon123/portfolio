import "react";

declare module "react" {
  interface IframeHTMLAttributes<T> extends React.HTMLAttributes<T> {
    mozallowfullscreen?: string | boolean;
    webkitallowfullscreen?: string | boolean;
    "xr-spatial-tracking"?: boolean;
    "execution-while-out-of-viewport"?: boolean;
    "execution-while-not-rendered"?: boolean;
    "web-share"?: boolean;
  }
}
