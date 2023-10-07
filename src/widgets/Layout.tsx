import { PropsWithChildren } from "react";
import "./layout.scss";

export const Layout = ({ children }: PropsWithChildren) => {
  return <div className="layout">{children}</div>;
};
