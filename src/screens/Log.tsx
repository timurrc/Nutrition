import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";
import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Plus,
} from "lucide-react";
import oatmeal from "../assets/dishes/oatmeal.png";
import { useEffect, useState } from "react";
import { MealRepository } from "../repositories/mealRepository";
import { MealEntry } from "../db/db";
import { useNavigate } from "react-router-dom";
import { MealSection } from "../components/ui/MealSection";
type GroupedMeals = {
  breakfast: {
    items: MealEntry[];
    calories: number;
  };
  lunch: {
    items: MealEntry[];
    calories: number;
  };
  dinner: {
    items: MealEntry[];
    calories: number;
  };
  snack: {
    items: MealEntry[];
    calories: number;
  };
};

export const Log = () => {
  const [meals, setMeals] = useState<MealEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = new Date();

  const isToday = selectedDate.toDateString() === today.toDateString();
  const navigate = useNavigate();
  const groupedMeals = meals.reduce<GroupedMeals>(
    (acc, meal) => {
      acc[meal.mealType].items.push(meal);

      acc[meal.mealType].calories += meal.calories;

      return acc;
    },
    {
      breakfast: {
        items: [],
        calories: 0,
      },

      lunch: {
        items: [],
        calories: 0,
      },

      dinner: {
        items: [],
        calories: 0,
      },

      snack: {
        items: [],
        calories: 0,
      },
    },
  );

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await MealRepository.getByDate(1, selectedDate);
      setMeals(response);
    };

    fetchMeals();
  }, [selectedDate]);

  return (
    <Container>
      <h2 className="text-xl mb-4">Дневник</h2>
      <div className="flex justify-between w-full bg-[#161B22] rounded-lg px-4 py-3 mb-4">
        <ChevronLeft
          onClick={() =>
            setSelectedDate((prev) => {
              const next = new Date(prev);
              next.setDate(next.getDate() - 1);
              return next;
            })
          }
        />
        <h2 className="text-xl text-semibold">
          {isToday
            ? "Сегодня"
            : selectedDate.toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
              })}
        </h2>
        <ChevronRight
          onClick={() =>
            setSelectedDate((prev) => {
              const next = new Date(prev);
              next.setDate(next.getDate() + 1);
              return next;
            })
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <MealSection
          MealTitle={"Завтрак"}
          meals={groupedMeals.breakfast.items}
          onAddMeal={() => navigate("/add-meal")}
        />
        <MealSection
          MealTitle={"Обед"}
          meals={groupedMeals.lunch.items}
          onAddMeal={() => navigate("/add-meal")}
        />
        <MealSection
          MealTitle={"Ужин"}
          meals={groupedMeals.dinner.items}
          onAddMeal={() => navigate("/add-meal")}
        />
        <MealSection
          MealTitle={"Снеки"}
          meals={groupedMeals.snack.items}
          onAddMeal={() => navigate("/add-meal")}
        />
      </div>
    </Container>
  );
};
