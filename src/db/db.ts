import Dexie, { Table } from "dexie";

export interface User {
  id?: number;
  name: string;
  sex: string;
  height: number;
  weight: number;
  age: number;
  target: string;
  activity: string;
}

export class AppDatabase extends Dexie {
  users!: Table<User>;
  //   meals!: Table<Meal>;

  constructor() {
    super("nutrition-db");

    this.version(1).stores({
      users: "++id",
      //   meals: "++id,date",
    });
  }
}
export const db = new AppDatabase();
