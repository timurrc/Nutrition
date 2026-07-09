import { ElementType, FC } from "react";

interface ITypography {
  variant: TextType;
  as?: ElementType;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

type TextType = "h1" | "h2" | "h3" | "body" | "bodySmall" | "caption";

export const Typography: FC<ITypography> = ({
  variant,
  as,
  onClick,
  children,
  className,
}) => {
  const variants = {
    h1: {
      tag: "h1",
      className: "text-[32px] leading-10 font-semibold tracking-tight text-text",
    },

    h2: {
      tag: "h2",
      className: "text-2xl font-semibold text-text",
    },

    h3: {
      tag: "h3",
      className: "text-xl font-semibold text-text",
    },

    body: {
      tag: "p",
      className: "text-base text-text",
    },

    bodySmall: {
      tag: "p",
      className: "text-sm text-text",
    },

    caption: {
      tag: "span",
      className: "text-xs text-text-secondary",
    },
  } as const;
  const Component = as || variants[variant].tag;

  return (
    <Component
      className={`${variants[variant].className} ${className ?? ""}`}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};
