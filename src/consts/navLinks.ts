import { BookMarked, CirclePlus, Home, type LucideIcon } from "lucide-react";

export interface iNavLinks {
  id: number;
  icon: LucideIcon;
  title: string;
  link: string;
}

export const navLinks: iNavLinks[] = [
  {
    id: 1,
    icon: Home,
    title: "Главная",
    link: "/",
  },

  {
    id: 2,
    icon: CirclePlus,
    title: "Добавить",
    link: "/meal",
  },
  {
    id: 3,
    icon: BookMarked,
    title: "Дневник",
    link: "/log",
  },
];
