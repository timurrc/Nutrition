import { db, MealEntry } from "../db/db";

export const MealRepository = {
  create(meal: MealEntry) {
    return db.meals.add(meal);
  },

  getByDate(userId: number, date: Date) {
    const start = new Date(date);
    const end = new Date(date);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    return db.meals
      .where("createdAt")
      .between(start.getTime(), end.getTime())
      .filter((meal) => meal.userId === userId)
      .toArray();
  },
};
