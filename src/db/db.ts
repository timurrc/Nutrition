import Dexie, { Table } from "dexie";

export interface User {
  id?: number;
  email: string;
  password: string;
  date?: string;
}
export interface OnBoarding {
  id?: number;
  userId?: number;
  sex: string;
  height: number;
  weight: number;
  age: number;
  target: string;
  activity: string;
}
export interface WaterEntry {
  id?: string;
  userId: number;
  amount: number;
  description: string | null;
  createdAt: number;
}

export interface MealEntry {
  id?: number;
  userId: number;
  image: string;
  title: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  per: number;

  mealType: MealType;
  createdAt: number;
}
export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export class AppDatabase extends Dexie {
  users!: Table<User>;
  onBoarding!: Table<OnBoarding>;
  waterEntry!: Table<WaterEntry>;
  meals!: Table<MealEntry>;

  constructor() {
    super("nutrition-db");

    this.version(1).stores({
      users: "++id, email",
      onBoarding: "++id, userId",
      waterEntry: "++id, userId",
      meals: "++id,date",
    });
  }
}
export const db = new AppDatabase();
