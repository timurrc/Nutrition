import { FC } from "react";
import { Card } from "./Card";
import { EllipsisVertical, Package, Plus } from "lucide-react";

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
    <Card className="rounded-lg border border-border bg-surface px-4 py-3 shadow-sm">
      <div className="mb-4 flex w-full justify-between">
        <Typography variant={"body"} className="font-semibold">
          {MealTitle}
        </Typography>
        <Typography variant={"body"} className="font-medium text-primary">
          {calories} ккал
        </Typography>
      </div>
      <div className="mb-4 flex flex-col gap-2">
        {meals.map((item) => (
          <div
            className="flex w-full items-center justify-between"
            key={item.id}
          >
            <div className="flex items-center gap-2">
              {item.image ? (
                <img
                  src={item.image}
                  width={54}
                  height={54}
                  alt=""
                  className="rounded-lg object-cover"
                />
              ) : (
                <div className="flex size-[54px] items-center justify-center rounded-lg bg-surface-secondary text-text-secondary">
                  <Package size={20} />
                </div>
              )}
              <div className="flex flex-col">
                <Typography variant={"body"}>{item.title}</Typography>
                <Typography variant={"body"} className="text-sm text-text-secondary">
                  {item.per}г · {item.calories} ккал
                </Typography>
              </div>
            </div>
            <EllipsisVertical className="text-text-secondary" size={18} />
          </div>
        ))}
      </div>
      <div
        className="flex cursor-pointer items-center gap-1 text-primary transition-colors hover:text-primary-hover"
        onClick={() => onAddMeal()}
      >
        <Plus size={18} />
        <Typography variant={"body"} className="text-sm font-medium">
          Добавить продукт
        </Typography>
      </div>
    </Card>
  );
};
