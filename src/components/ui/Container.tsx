import { FC } from "react";

interface IContainer {
  children: React.ReactNode;
}

export const Container: FC<IContainer> = ({ children }) => {
  return <div className="mx-auto px-3 py-3">{children}</div>;
};
