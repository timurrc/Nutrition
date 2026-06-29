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
    <Card className="bg-[#161B22] rounded-xl px-4 py-3">
      <div className="w-full flex justify-between mb-4">
        <b>{MealTitle}</b>
        <p className="text-gray-500">{calories} ккал</p>
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
                <p>{item.title}</p>
                <p>
                  {item.per}г · {item.calories} ккал
                </p>
              </div>
            </div>
            <EllipsisVertical />
          </div>
        ))}
      </div>
      <div className="flex items-center" onClick={() => onAddMeal()}>
        <Plus />
        <p>Добавить продукт</p>
      </div>
    </Card>
  );
};
