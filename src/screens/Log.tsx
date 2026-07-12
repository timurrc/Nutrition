import { Container } from "../components/ui/Container";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { MealRepository } from "../repositories/mealRepository";
import { MealEntry } from "../db/db";
import { useNavigate } from "react-router-dom";
import { MealSection } from "../components/ui/MealSection";
import { Typography } from "../components/ui/Typography";
import { getCurrentUserId } from "../utils/currentUser";
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
  const userId = getCurrentUserId();

  const isToday = selectedDate.toDateString() === today.toDateString();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId === null) return;

    const fetchMeals = async () => {
      const response = await MealRepository.getByDate(userId, selectedDate);
      setMeals(response);
    };

    fetchMeals();
  }, [selectedDate, userId]);

  if (userId === null) {
    return null;
  }

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

  return (
    <Container>
      <Typography variant={"h2"} className="mb-4">
        Дневник
      </Typography>

      <div className="mb-4 flex w-full items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 shadow-sm">
        <ChevronLeft
          className="cursor-pointer text-text-secondary transition-colors hover:text-primary"
          onClick={() =>
            setSelectedDate((prev) => {
              const next = new Date(prev);
              next.setDate(next.getDate() - 1);
              return next;
            })
          }
        />
        <Typography variant={"h2"}>
          {isToday
            ? "Сегодня"
            : selectedDate.toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
              })}
        </Typography>

        <ChevronRight
          className="cursor-pointer text-text-secondary transition-colors hover:text-primary"
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
          onAddMeal={() => navigate("/meal")}
        />
        <MealSection
          MealTitle={"Обед"}
          meals={groupedMeals.lunch.items}
          onAddMeal={() => navigate("/meal")}
        />
        <MealSection
          MealTitle={"Ужин"}
          meals={groupedMeals.dinner.items}
          onAddMeal={() => navigate("/meal")}
        />
        <MealSection
          MealTitle={"Снеки"}
          meals={groupedMeals.snack.items}
          onAddMeal={() => navigate("/meal")}
        />
      </div>
    </Container>
  );
};
