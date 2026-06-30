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

      <div className="mb-4 bg-surface px-4 py-3 rounded-xl relative">
        <Search className="w-8 absolute top-3 ml-2 left-0" />
        <input
          type="text"
          placeholder="Поиск продуктов"
          className="w-full ml-7 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex justify-between">
          <Typography variant={"body"}>Популярные</Typography>
          <Typography
            variant={"body"}
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
            className={`px-2 py-3 w-full rounded-xl flex justify-between items-center ${pickedId === item.id ? "border-2 border-border-secondary bg-surface-secondary" : "border-2 border-border bg-surface"}`}
          >
            <div className="flex gap-4 items-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-14 h-14"
                loading="lazy"
              />
              <div className="flex flex-col items-start">
                <Typography variant={"body"}>{item.title}</Typography>

                <div className="flex items-center gap-1">
                  <Typography variant={"body"}>{item.per}г ⋅</Typography>
                  <Typography variant={"body"}>{item.calories} ккал</Typography>
                </div>
              </div>
            </div>
            <Plus />
          </div>
        ))}
      </div>
      {selectedFood && (
        <Card className="flex flex-col gap-6 bg-surface px-2 py-3 rounded-xl">
          <div className="flex justify-between w-full items-center">
            <div className="flex gap-4 items-center">
              <img
                src={selectedFood.image}
                className="w-19 h-18"
                alt={selectedFood.title}
                loading="lazy"
              />
              <div className="flex flex-col items-start">
                <Typography variant={"body"}>{selectedFood.title}</Typography>

                <div className="flex items-center gap-1">
                  <Typography variant={"body"}>
                    {selectedFood.per}г ⋅
                  </Typography>
                  <Typography variant={"body"}>
                    {selectedFood.calories} ккал
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center gap-2">
            <div className="flex flex-col text-center">
              <Typography variant={"body"}>Белки</Typography>
              <Typography variant={"body"}>{selectedFood.protein}</Typography>
            </div>
            <div className="flex flex-col text-center">
              <Typography variant={"body"}>Жиры</Typography>
              <Typography variant={"body"} className="text-fat">
                {selectedFood.protein}
              </Typography>
            </div>
            <div className="flex flex-col text-center">
              <Typography variant={"body"}>Углеводы</Typography>
              <Typography variant={"body"} className="text-carbs">
                {selectedFood.carbs}
              </Typography>
            </div>
            <div className="flex flex-col text-center">
              <Typography variant={"body"}>Калории</Typography>
              <Typography variant={"body"} className="text-primary">
                {selectedFood.calories}
              </Typography>
            </div>
          </div>
          <select
            name="mealType"
            id="mealTypeList"
            onChange={(e) => setSelect(e.target.value as MealType)}
            className="w-full min-w-full bg-surface px-4 py-4 rounded-xl outline-none border border-[#2A313C]"
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
