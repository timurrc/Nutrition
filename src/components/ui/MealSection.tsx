import { FC } from "react";
import { Card } from "./Card";
import { EllipsisVertical, Plus } from "lucide-react";

import { MealEntry } from "../../db/db";
import { Typography } from "./Typography";

interface MealSectionProps {
  MealTitle: string;
  meals: MealEntry[];
  onAddMeal: () => void;
}

export const MealSection: FC<MealSectionProps> = ({
  MealTitle,
  meals,
  onAddMeal,
}) => {
  const calories = meals.reduce((sum, meal) => {
    return sum + meal.calories;
  }, 0);
  return (
    <Card className="bg-surface rounded-xl px-4 py-3">
      <div className="w-full flex justify-between mb-4">
        <Typography variant={"body"} className="text-semibold">
          {MealTitle}
        </Typography>
        <Typography variant={"body"}>{calories} ккал</Typography>
      </div>
      <div className="flex flex-col gap-2 mb-4">
        {meals.map((item) => (
          <div
            className="w-full flex justify-between items-center"
            key={item.id}
          >
            <div className="flex gap-2 items-center">
              <img src={item.image} width={54} height={54} alt="" />
              <div className="flex flex-col">
                <Typography variant={"body"}>{item.title}</Typography>
                <Typography variant={"body"}>
                  {item.per}г · {item.calories} ккал
                </Typography>
              </div>
            </div>
            <EllipsisVertical />
          </div>
        ))}
      </div>
      <div className="flex items-center" onClick={() => onAddMeal()}>
        <Plus />
        <Typography variant={"body"}>Добавить продукт</Typography>
      </div>
    </Card>
  );
};
