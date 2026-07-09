import { FC } from "react";

interface IContainer {
  children: React.ReactNode;
}

export const Container: FC<IContainer> = ({ children }) => {
  return (
    <div className="mx-auto w-full max-w-lg px-4 py-4 pb-24">{children}</div>
  );
};
