import { LucideIcon } from "lucide-react";
import { FC } from "react";

interface IInput {
  placeholder?: string;
  type: InputType;
  className?: string;
  icon?: LucideIcon;
  iconSide?: IconSideType;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
}
type InputType = "text" | "password" | "date" | "email";
type IconSideType = "left" | "right";

export const Input: FC<IInput> = ({
  placeholder,
  className,
  type,
  icon,
  iconSide,
  onChange,
  value,
}) => {
  const Icon = icon;
  return (
    <>
      {Icon && (
        <div
          className={`relative ${type === "date" && "overflow-hidden items-center rounded-xl"}`}
        >
          {iconSide === "left" && (
            <Icon className="absolute top-1/2 -translate-y-1/2 left-4 size-4 text-text-secondary" />
          )}
          {type === "date" && value.length === 0 && (
            <label className="absolute top-1/2 -translate-y-1/2 left-14 text-placeholder">
              Birthdate
            </label>
          )}
          <input
            placeholder={placeholder}
            type={type}
            className={`${className ?? ""} w-full h-11 bg-surface border border-border rounded-lg outline-none transition-colors placeholder:text-placeholder focus:border-primary focus:ring-2 focus:ring-primary/10 ${iconSide === "left" ? "pl-11 pr-4" : "pl-4 pr-11"}`}
            onChange={onChange}
            value={value}
          />

          {iconSide === "right" && (
            <Icon className="absolute top-1/2 -translate-y-1/2 right-4 size-4 text-text-secondary" />
          )}
        </div>
      )}
    </>
  );
};
