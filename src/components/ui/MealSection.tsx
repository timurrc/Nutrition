import React, { FC } from "react";
import { Card } from "./Card";
import { EllipsisVertical, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MealEntry } from "../../db/db";

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
    <Card className="rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 shadow-sm">
      <div className="mb-4 flex w-full justify-between">
        <b className="text-[#111827]">{MealTitle}</b>
        <p className="font-medium text-[#1677ff]">{calories} ккал</p>
      </div>
      <div className="mb-4 flex flex-col gap-2">
        {meals.map((item) => (
          <div
            className="flex w-full items-center justify-between"
            key={item.id}
          >
            <div className="flex items-center gap-2">
              <img
                src={item.image}
                width={54}
                height={54}
                alt=""
                className="rounded-lg object-cover"
              />
              <div className="flex flex-col">
                <p className="font-medium text-[#111827]">{item.title}</p>
                <p className="text-sm text-[#6b7280]">
                  {item.per}г · {item.calories} ккал
                </p>
              </div>
            </div>
            <EllipsisVertical className="text-[#6b7280]" size={18} />
          </div>
        ))}
      </div>
      <div
        className="flex cursor-pointer items-center gap-1 text-[#1677ff] transition-colors hover:text-[#4096ff]"
        onClick={() => onAddMeal()}
      >
        <Plus size={18} />
        <p className="text-sm font-medium">Добавить продукт</p>
      </div>
    </Card>
  );
};
