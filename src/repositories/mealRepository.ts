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

  getInRange(userId: number, from: Date, to: Date) {
    const start = new Date(from);
    const end = new Date(to);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    return db.meals
      .where("createdAt")
      .between(start.getTime(), end.getTime())
      .filter((meal) => meal.userId === userId)
      .toArray();
  },

  async getDailyTotalsMap(
    userId: number,
    from: Date,
    to: Date,
  ): Promise<Map<string, MealTotals>> {
    const meals = await MealRepository.getInRange(userId, from, to);
    const map = new Map<string, MealTotals>();

    for (const meal of meals) {
      const key = new Date(meal.createdAt).toDateString();
      const current = map.get(key) ?? emptyTotals();
      current.calories += meal.calories;
      current.protein += meal.protein;
      current.fat += meal.fat;
      current.carbs += meal.carbs;
      map.set(key, current);
    }

    return map;
  },
};
