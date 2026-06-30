import { FC } from "react";

interface IButton {
  children: React.ReactNode;
  className?: string;

  onClick: () => void;
  disabled?: boolean;
  variant: "primary" | "secondary" | "disabled";
}

export const Button: FC<IButton> = ({
  children,
  className,
  onClick,
  disabled,
  variant,
}) => {
  const variants = {
    primary:
      "py-4 bg-primary active:bg-primary-hover active:transition-all text-text-button w-full rounded-xl font-semibold",
    secondary:
      "py-4 bg-[#60A5FA] active:bg-primary-hover active:transition-all text-background w-full rounded-xl font-semibold",
    disabled: "py-4 bg-disabled text-black w-full rounded-xl font-semibold",
  };

  return (
    <button
      onClick={onClick}
      className={`${variants[variant]} ${className ?? ""}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
