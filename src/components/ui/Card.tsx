import { FC } from "react";

interface ICard {
  children?: React.ReactNode;
  className?: string;

  onClick?: () => void;
}

export const Card: FC<ICard> = ({ children, className, onClick }) => {
  return (
    <div className={`${className}`} onClick={onClick}>
      {children}
    </div>
  );
};
