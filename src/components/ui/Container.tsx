import { FC } from "react";

interface IContainer {
  children: React.ReactNode;
}

export const Container: FC<IContainer> = ({ children }) => {
  return <div className="mx-auto px-2 py-2">{children}</div>;
};
