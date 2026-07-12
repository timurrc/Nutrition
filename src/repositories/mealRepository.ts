import { db, MealEntry } from "../db/db";
import { getDayRange } from "../utils/dateRange";

export interface MealTotals {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

const emptyTotals = (): MealTotals => ({
  calories: 0,
  protein: 0,
  fat: 0,
  carbs: 0,
});

export const MealRepository = {
  create(meal: MealEntry) {
    return db.meals.add(meal);
  },

  getByDate(userId: number, date: Date) {
    const { start, end } = getDayRange(date);
    return db.meals
      .where("createdAt")
      .between(start, end)
      .filter((meal) => meal.userId === userId)
      .toArray();
  },

  async getDailyTotals(userId: number, date: Date): Promise<MealTotals> {
    const meals = await MealRepository.getByDate(userId, date);
    return meals.reduce((acc, meal) => {
      acc.calories += meal.calories;
      acc.protein += meal.protein;
      acc.fat += meal.fat;
      acc.carbs += meal.carbs;
      return acc;
    }, emptyTotals());
  },
};
