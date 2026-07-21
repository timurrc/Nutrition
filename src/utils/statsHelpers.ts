import { MealTotals } from "../repositories/mealRepository";

export type DayLevel = "none" | "partial" | "done";

export type HeatmapDay = {
  date: Date;
  key: string;
  level: DayLevel;
  calories: number;
  progress: number;
};

export type PeriodAverages = {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  waterMl: number;
  loggedDays: number;
  goalDays: number;
  partialDays: number;
};

export function getDayLevel(calories: number, goalCalories: number): DayLevel {
  if (calories <= 0 || goalCalories <= 0) return "none";
  const progress = calories / goalCalories;
  if (progress >= 1) return "done";
  if (progress >= 0.5) return "partial";
  return "none";
}

export function startOfDay(date: Date): Date {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function buildHeatmapDays(
  weeks: number,
  mealTotals: Map<string, MealTotals>,
  goalCalories: number,
  endDate = new Date(),
): HeatmapDay[] {
  const end = startOfDay(endDate);
  const dayOfWeek = (end.getDay() + 6) % 7;
  const gridEnd = addDays(end, 6 - dayOfWeek);
  const totalDays = weeks * 7;
  const gridStart = addDays(gridEnd, -(totalDays - 1));

  const days: HeatmapDay[] = [];

  for (let i = 0; i < totalDays; i++) {
    const date = addDays(gridStart, i);
    const key = date.toDateString();
    const totals = mealTotals.get(key);
    const calories = totals?.calories ?? 0;
    const progress =
      goalCalories > 0 ? Math.round((calories / goalCalories) * 100) : 0;

    days.push({
      date,
      key,
      level: getDayLevel(calories, goalCalories),
      calories: Math.round(calories),
      progress,
    });
  }

  return days;
}

export function calcPeriodAverages(
  mealTotals: Map<string, MealTotals>,
  waterTotals: Map<string, number>,
  goalCalories: number,
): PeriodAverages {
  const keys = new Set([...mealTotals.keys(), ...waterTotals.keys()]);
  let calories = 0;
  let protein = 0;
  let fat = 0;
  let carbs = 0;
  let waterMl = 0;
  let loggedDays = 0;
  let goalDays = 0;
  let partialDays = 0;

  for (const key of keys) {
    const meal = mealTotals.get(key);
    const water = waterTotals.get(key) ?? 0;
    const dayCalories = meal?.calories ?? 0;

    if (dayCalories <= 0 && water <= 0) continue;

    loggedDays += 1;
    calories += dayCalories;
    protein += meal?.protein ?? 0;
    fat += meal?.fat ?? 0;
    carbs += meal?.carbs ?? 0;
    waterMl += water;

    const level = getDayLevel(dayCalories, goalCalories);
    if (level === "done") goalDays += 1;
    if (level === "partial") partialDays += 1;
  }

  if (loggedDays === 0) {
    return {
      calories: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
      waterMl: 0,
      loggedDays: 0,
      goalDays: 0,
      partialDays: 0,
    };
  }

  return {
    calories: Math.round(calories / loggedDays),
    protein: Math.round(protein / loggedDays),
    fat: Math.round(fat / loggedDays),
    carbs: Math.round(carbs / loggedDays),
    waterMl: Math.round(waterMl / loggedDays),
    loggedDays,
    goalDays,
    partialDays,
  };
}
