import { useEffect, useState } from "react";
import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";
import { Food, foods } from "../consts/dishes";
import { Plus, Search, Star } from "lucide-react";
import { MealRepository } from "../repositories/mealRepository";
import { MealType } from "../db/db";
import { Typography } from "../components/ui/Typography";
import { Button } from "../components/ui/Button";

export const Meal = () => {
  const [pickedId, setPickedId] = useState<number | null>(null);
  const [full, setFull] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const selectedFood = foods.find((item) => item.id === pickedId);
  const filtered = foods.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );
  const visibleFoods = full ? filtered : filtered.slice(0, 3);

  const [select, setSelect] = useState<MealType>("breakfast");

  const handleUpdateMeal = () => {
    if (selectedFood) {
      MealRepository.create({
        userId: 1,
        image: selectedFood?.image,
        title: selectedFood?.title,
        calories: selectedFood?.calories,
        protein: selectedFood?.protein,
        fat: selectedFood?.fat,
        carbs: selectedFood?.carbs,
        per: 100,
        mealType: select,
        createdAt: Date.now(),
      });
    } else {
      return;
    }
  };
  return (
    <Container>
      <Typography variant={"h2"} className="mb-4">
        Добавьте прием пищи
      </Typography>

      <div className="relative mb-4 rounded-lg border border-border bg-surface px-4 py-2">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-secondary" />
        <input
          type="text"
          placeholder="Поиск продуктов"
          className="h-9 w-full bg-transparent pl-8 outline-none placeholder:text-placeholder"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <div className="flex justify-between">
          <Typography variant={"body"} className="font-medium">
            Популярные
          </Typography>
          <Typography
            variant={"body"}
            className="cursor-pointer text-primary"
            onClick={() => {
              setFull(!full);
            }}
          >
            {full ? "Свернуть" : "Показать еще"}
          </Typography>
        </div>
        {visibleFoods.map((item: Food) => (
          <div
            onClick={() => setPickedId(item.id)}
            key={item.id}
            className={`flex w-full cursor-pointer items-center justify-between rounded-lg border px-3 py-3 transition-colors ${pickedId === item.id ? "border-primary bg-surface-secondary ring-2 ring-primary/10" : "border-border bg-surface hover:border-primary/40"}`}
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="h-14 w-14 rounded-lg object-cover"
                loading="lazy"
              />
              <div className="flex flex-col items-start">
                <Typography variant={"body"} className="font-medium">
                  {item.title}
                </Typography>

                <div className="flex items-center gap-1">
                  <Typography variant={"body"} className="text-text-secondary">
                    {item.per}г ⋅
                  </Typography>
                  <Typography variant={"body"} className="text-text-secondary">
                    {item.calories} ккал
                  </Typography>
                </div>
              </div>
            </div>
            <Plus className="text-primary" size={20} />
          </div>
        ))}
      </div>
      {selectedFood && (
        <Card className="flex flex-col gap-6 rounded-lg border border-border bg-surface px-4 py-4 shadow-sm">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={selectedFood.image}
                className="h-18 w-19 rounded-lg object-cover"
                alt={selectedFood.title}
                loading="lazy"
              />
              <div className="flex flex-col items-start">
                <Typography variant={"body"} className="font-medium">
                  {selectedFood.title}
                </Typography>

                <div className="flex items-center gap-1">
                  <Typography variant={"body"} className="text-text-secondary">
                    {selectedFood.per}г ⋅
                  </Typography>
                  <Typography variant={"body"} className="text-text-secondary">
                    {selectedFood.calories} ккал
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col text-center">
              <Typography variant={"body"} className="text-sm text-text-secondary">
                Белки
              </Typography>
              <Typography variant={"body"} className="font-semibold text-protein">
                {selectedFood.protein}
              </Typography>
            </div>
            <div className="flex flex-col text-center">
              <Typography variant={"body"} className="text-sm text-text-secondary">
                Жиры
              </Typography>
              <Typography variant={"body"} className="font-semibold text-fat">
                {selectedFood.protein}
              </Typography>
            </div>
            <div className="flex flex-col text-center">
              <Typography variant={"body"} className="text-sm text-text-secondary">
                Углеводы
              </Typography>
              <Typography variant={"body"} className="font-semibold text-carbs">
                {selectedFood.carbs}
              </Typography>
            </div>
            <div className="flex flex-col text-center">
              <Typography variant={"body"} className="text-sm text-text-secondary">
                Калории
              </Typography>
              <Typography variant={"body"} className="font-semibold text-primary">
                {selectedFood.calories}
              </Typography>
            </div>
          </div>
          <select
            name="mealType"
            id="mealTypeList"
            onChange={(e) => setSelect(e.target.value as MealType)}
            className="h-11 w-full min-w-full rounded-lg border border-border bg-surface px-4 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10"
          >
            <option value="breakfast">Завтрак</option>
            <option value="lunch">Обед</option>
            <option value="dinner">Ужин</option>
            <option value="snack">Перекус</option>
          </select>
          <Button variant="primary" onClick={() => handleUpdateMeal()}>
            Добавить в дневник
          </Button>
        </Card>
      )}
    </Container>
  );
};
