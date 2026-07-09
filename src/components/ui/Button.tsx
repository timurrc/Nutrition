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
      "h-11 bg-primary hover:bg-primary-hover active:bg-primary-hover transition-colors text-text-button w-full rounded-lg font-medium text-base shadow-sm",
    secondary:
      "h-11 bg-primary hover:bg-primary-hover active:bg-primary-hover transition-colors text-text-button w-full rounded-lg font-medium text-base shadow-sm",
    disabled:
      "h-11 bg-disabled text-text-secondary w-full rounded-lg font-medium cursor-not-allowed",
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
