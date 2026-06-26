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
export class AppDatabase extends Dexie {
  users!: Table<User>;
  onBoarding!: Table<OnBoarding>;
  //   meals!: Table<Meal>;

  constructor() {
    super("nutrition-db");

    this.version(1).stores({
      users: "++id, email",
      onBoarding: "++id",

      //   meals: "++id,date",
    });
  }
}
export const db = new AppDatabase();
