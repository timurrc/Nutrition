import { BookMarked, ChartColumn, CirclePlus, Home, UserRound, type LucideIcon } from "lucide-react";

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
  {
    id: 4,
    icon: ChartColumn,
    title: "Стат",
    link: "/stats",
  },
  {
    id: 5,
    icon: UserRound,
    title: "Профиль",
    link: "/profile",
  },
];
