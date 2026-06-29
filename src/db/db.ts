import Dexie, { Table } from "dexie";

export interface User {
  id?: string;
  email: string;
  password: string;
  date?: string;
}
export interface OnBoarding {
  id?: string;
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
export class AppDatabase extends Dexie {
  users!: Table<User>;
  onBoarding!: Table<OnBoarding>;
  waterEntry!: Table<WaterEntry>;
  //   meals!: Table<Meal>;

  constructor() {
    super("nutrition-db");

    this.version(1).stores({
      users: "++id, email",
      onBoarding: "++id, userId",
      waterEntry: "++id",
      //   meals: "++id,date",
    });
  }
}
export const db = new AppDatabase();
