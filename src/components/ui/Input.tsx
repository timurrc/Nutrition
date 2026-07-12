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
type InputType = "text" | "password" | "date" | "email" | "number";
type IconSideType = "left" | "right";

const inputClass = (className?: string, withLeftIcon?: boolean, withRightIcon?: boolean) =>
  `${className ?? ""} h-11 w-full rounded-lg border border-border bg-surface outline-none transition-colors placeholder:text-placeholder focus:border-primary focus:ring-2 focus:ring-primary/10 ${withLeftIcon ? "pl-11 pr-4" : withRightIcon ? "pl-4 pr-11" : "px-4"}`;

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

  if (!Icon) {
    return (
      <input
        placeholder={placeholder}
        type={type}
        className={inputClass(className)}
        onChange={onChange}
        value={value}
      />
    );
  }

  return (
    <div
      className={`relative ${type === "date" ? "overflow-hidden rounded-xl" : ""}`}
    >
      {iconSide === "left" && (
        <Icon className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-text-secondary" />
      )}
      {type === "date" && value.length === 0 && (
        <label className="absolute left-14 top-1/2 -translate-y-1/2 text-placeholder">
          Дата рождения
        </label>
      )}
      <input
        placeholder={placeholder}
        type={type}
        className={inputClass(className, iconSide === "left", iconSide === "right")}
        onChange={onChange}
        value={value}
      />
      {iconSide === "right" && (
        <Icon className="absolute right-4 top-1/2 size-4 -translate-y-1/2 text-text-secondary" />
      )}
    </div>
  );
};
