import { OnBoarding } from "../db/db";

export interface DailyGoals {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  waterMl: number;
}

type ProfileInput = Pick<
  OnBoarding,
  "sex" | "weight" | "height" | "age" | "activity" | "target"
>;

const DEFAULT_GOALS: DailyGoals = {
  calories: 1950,
  protein: 120,
  fat: 70,
  carbs: 220,
  waterMl: 2500,
};

const ACTIVITY_MULTIPLIER: Record<string, number> = {
  low: 1.2,
  medium: 1.55,
  high: 1.75,
};

export function calculateDailyGoals(profile: ProfileInput): DailyGoals {
  const { sex, weight, height, age, activity, target } = profile;
  const bmr =
    sex === "man"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  let calories = Math.round(bmr * (ACTIVITY_MULTIPLIER[activity] ?? 1.2));

  if (target === "loseWeight") calories -= 300;
  if (target === "gainWeight") calories += 300;

  calories = Math.max(1200, calories);

  const protein = Math.round((weight * 1.8) / 5) * 5;
  const fat = Math.round((calories * 0.25) / 9);
  const carbs = Math.round((calories - protein * 4 - fat * 9) / 4);

  return {
    calories,
    protein,
    fat,
    carbs: Math.max(carbs, 0),
    waterMl: 2500,
  };
}

function hasStoredGoals(onboarding: OnBoarding): boolean {
  return (
    onboarding.dailyCalories != null &&
    onboarding.dailyProtein != null &&
    onboarding.dailyFat != null &&
    onboarding.dailyCarbs != null &&
    onboarding.dailyWaterMl != null
  );
}

export function getDailyGoals(onboarding?: OnBoarding | null): DailyGoals {
  if (!onboarding) return DEFAULT_GOALS;

  if (hasStoredGoals(onboarding)) {
    return {
      calories: onboarding.dailyCalories!,
      protein: onboarding.dailyProtein!,
      fat: onboarding.dailyFat!,
      carbs: onboarding.dailyCarbs!,
      waterMl: onboarding.dailyWaterMl!,
    };
  }

  return calculateDailyGoals(onboarding);
}

export function calcProgress(current: number, goal: number): number {
  if (goal <= 0) return 0;
  return Math.min(100, Math.round((current / goal) * 100));
}
