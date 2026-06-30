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
            <Icon className="absolute top-4 left-5 text-gray-500" />
          )}
          {type === "date" && value.length === 0 && (
            <label className="absolute top-4 left-15 text-gray-400">
              Birthdate
            </label>
          )}
          <input
            placeholder={placeholder}
            type={type}
            className={`${className} w-full bg-surface rounded-xl outline-none ${iconSide === "left" ? "px-14 py-4" : "pr-14 pl-4"}`}
            onChange={onChange}
            value={value}
          />

          {iconSide === "right" && (
            <Icon className="absolute top-4 right-4 text-gray-500" />
          )}
        </div>
      )}
    </>
  );
};
