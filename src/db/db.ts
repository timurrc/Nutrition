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
  dailyCalories?: number;
  dailyProtein?: number;
  dailyFat?: number;
  dailyCarbs?: number;
  dailyWaterMl?: number;
}

export interface CustomProduct {
  id?: number;
  userId: number;
  title: string;
  protein: number;
  fat: number;
  carbs: number;
  calories: number;
  createdAt: number;
}

export interface WaterEntry {
  id?: number;
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
  customProducts!: Table<CustomProduct>;

  constructor() {
    super("nutrition-db");

    this.version(1).stores({
      users: "++id, email",
      onBoarding: "++id, userId",
      waterEntry: "++id, userId, createdAt",
      meals: "++id, userId,createdAt",
    });

    this.version(2).stores({
      users: "++id, email",
      onBoarding: "++id, userId",
      waterEntry: "++id, userId, createdAt",
      meals: "++id, userId,createdAt",
      customProducts: "++id, userId, createdAt",
    });
  }
}

export const db = new AppDatabase();
