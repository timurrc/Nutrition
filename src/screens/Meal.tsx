import { useEffect, useState } from "react";
import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";
import { Food, foods } from "../consts/dishes";
import { Plus, Search, Star } from "lucide-react";
import { MealRepository } from "../repositories/mealRepository";
import { MealType } from "../db/db";

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
      <h2 className="mb-4 text-2xl font-semibold text-[#111827]">
        Добавьте прием пищи
      </h2>
      <div className="relative mb-4 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#6b7280]" />
        <input
          type="text"
          placeholder="Поиск продуктов"
          className="h-9 w-full bg-transparent pl-8 outline-none placeholder:text-[#9ca3af]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="font-medium text-[#111827]">Популярные</p>
          <p
            className="cursor-pointer text-[#1677ff]"
            onClick={() => {
              setFull(!full);
            }}
          >
            {full ? "Свернуть" : "Показать еще"}
          </p>
        </div>
        {visibleFoods.map((item: Food) => (
          <div
            onClick={() => setPickedId(item.id)}
            key={item.id}
            className={`flex w-full cursor-pointer items-center justify-between rounded-lg border px-3 py-3 transition-colors ${pickedId === item.id ? "border-[#1677ff] bg-[#fafafa] ring-2 ring-[#1677ff]/10" : "border-[#e5e7eb] bg-white hover:border-[#1677ff]/40"}`}
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="h-14 w-14 rounded-lg object-cover"
                loading="lazy"
              />
              <div className="flex flex-col items-start">
                <p className="font-medium text-[#111827]">{item.title}</p>
                <div className="flex items-center gap-1 text-[#6b7280]">
                  <p>{item.per}г ⋅</p>
                  <p>{item.calories} ккал</p>
                </div>
              </div>
            </div>
            <Plus className="text-[#1677ff]" size={20} />
          </div>
        ))}
      </div>
      {selectedFood && (
        <Card className="flex flex-col gap-6 rounded-lg border border-[#e5e7eb] bg-white px-4 py-4 shadow-sm">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={selectedFood.image}
                className="h-18 w-19 rounded-lg object-cover"
                alt={selectedFood.title}
                loading="lazy"
              />
              <div className="flex flex-col items-start">
                <p className="font-medium text-[#111827]">{selectedFood.title}</p>
                <div className="flex items-center gap-1 text-[#6b7280]">
                  <p>{selectedFood.per}г ⋅</p>
                  <p>{selectedFood.calories} ккал</p>
                </div>
              </div>
            </div>
            {/* <Star className="text-gray-300 w-14" /> */}
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col text-center">
              <p className="text-sm text-[#6b7280]">Белки</p>
              <p className="font-semibold text-[#1677ff]">{selectedFood.protein}</p>
            </div>
            <div className="flex flex-col text-center">
              <p className="text-sm text-[#6b7280]">Жиры</p>
              <p className="font-semibold text-[#d97706]">{selectedFood.fat}</p>
            </div>
            <div className="flex flex-col text-center">
              <p className="text-sm text-[#6b7280]">Углеводы</p>
              <p className="font-semibold text-[#8b5cf6]">{selectedFood.carbs}</p>
            </div>
            <div className="flex flex-col text-center">
              <p className="text-sm text-[#6b7280]">Калории</p>
              <p className="font-semibold text-[#1677ff]">
                {selectedFood.calories} ккал
              </p>
            </div>
          </div>
          <select
            name="mealType"
            id="mealTypeList"
            onChange={(e) => setSelect(e.target.value as MealType)}
            className="h-11 w-full min-w-full rounded-lg border border-[#e5e7eb] bg-white px-4 outline-none transition-colors focus:border-[#1677ff] focus:ring-2 focus:ring-[#1677ff]/10"
          >
            <option value="breakfast">Завтрак</option>
            <option value="lunch">Обед</option>
            <option value="dinner">Ужин</option>
            <option value="snack">Перекус</option>
          </select>
          <button
            className="h-11 rounded-lg bg-[#1677ff] py-2 text-center font-medium text-white shadow-sm transition-colors hover:bg-[#4096ff]"
            onClick={() => handleUpdateMeal()}
          >
            Добавить в дневник
          </button>
        </Card>
      )}
    </Container>
  );
};
