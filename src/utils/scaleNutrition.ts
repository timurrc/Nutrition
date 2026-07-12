export type NutritionBase = {
  protein: number;
  fat: number;
  carbs: number;
  calories?: number;
};

export type ScaledNutrition = {
  protein: number;
  fat: number;
  carbs: number;
  calories: number;
  per: number;
};

function roundMacro(value: number): number {
  return Math.round(value * 10) / 10;
}

export function scaleNutrition(
  basePer100g: NutritionBase,
  grams: number,
): ScaledNutrition {
  const safeGrams = Math.max(1, grams);
  const factor = safeGrams / 100;
  const caloriesPer100 =
    basePer100g.calories ??
    basePer100g.protein * 4 + basePer100g.fat * 9 + basePer100g.carbs * 4;

  return {
    protein: roundMacro(basePer100g.protein * factor),
    fat: roundMacro(basePer100g.fat * factor),
    carbs: roundMacro(basePer100g.carbs * factor),
    calories: Math.round(caloriesPer100 * factor),
    per: safeGrams,
  };
}
