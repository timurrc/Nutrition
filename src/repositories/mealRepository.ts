import { db, MealEntry } from "../db/db";

export const MealRepository = {
  create(meal: MealEntry) {
    return db.meals.add(meal);
  },

  getToday(id: number) {
    const start = new Date();
    const end = new Date();
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    return db.meals
      .where("createdAt")
      .between(start, end)
      .filter((meal) => meal.userId === id).toArray;
  },
};
