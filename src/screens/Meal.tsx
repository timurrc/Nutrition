import { useState } from "react";
import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";
import { Food, foods } from "../consts/dishes";
import { Plus, Search, Star } from "lucide-react";

export const Meal = () => {
  const [pickedId, setPickedId] = useState<number | null>(null);
  const [full, setFull] = useState<boolean>(false);
  const selectedFood = foods.find((item) => item.id === pickedId);
  const visibleFoods = full ? foods : foods.slice(0, 3);
  return (
    <Container>
      <h2 className="text-xl mb-4">Добавьте прием пищи</h2>
      <div className="mb-4 bg-[#1C2128] px-4 py-3 rounded-xl relative">
        <Search className="w-8 absolute top-3 ml-2 left-0" />
        <input
          type="text"
          placeholder="Поиск продуктов"
          className="w-full ml-7 outline-none"
        />
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex justify-between">
          <p>Популярные</p>
          <p
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
            className={`px-2 py-3 w-full rounded-xl flex justify-between items-center ${pickedId === item.id ? "border-2 border-[#2A313C] bg-[#1C2128]" : "border-2 border-[#161B22] bg-[#161B22]"}`}
          >
            <div className="flex gap-4 items-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-14 h-14"
                loading="lazy"
              />
              <div className="flex flex-col items-start">
                <p>{item.title}</p>
                <div className="flex items-center gap-1">
                  <p>{item.per}г ⋅</p>
                  <p className="">{item.calories} ккал</p>
                </div>
              </div>
            </div>
            <Plus />
          </div>
        ))}
      </div>
      {selectedFood && (
        <Card className="flex flex-col gap-6 bg-[#161B22] px-2 py-3 rounded-xl">
          <div className="flex justify-between w-full items-center">
            <div className="flex gap-4 items-center">
              <img
                src={selectedFood.image}
                className="w-19 h-18"
                alt={selectedFood.title}
                loading="lazy"
              />
              <div className="flex flex-col items-start">
                <p>{selectedFood.title}</p>
                <div className="flex items-center gap-1">
                  <p>{selectedFood.per}г ⋅</p>
                  <p className="">{selectedFood.calories} ккал</p>
                </div>
              </div>
            </div>
            <Star className="text-gray-300 w-14" />
          </div>
          <div className="flex justify-between items-center gap-2">
            <div className="flex flex-col text-center">
              <p>Белки</p>
              <p className="text-[#67E8A5]">{selectedFood.protein}</p>
            </div>
            <div className="flex flex-col text-center">
              <p>Жиры</p> <p className="text-[#FFB84D]">{selectedFood.fat}</p>
            </div>
            <div className="flex flex-col text-center">
              <p>Углеводы</p>
              <p className="text-[#A78BFA]">{selectedFood.carbs}</p>
            </div>
            <div className="flex flex-col text-center">
              <p>Калории</p>
              <p className="text-[#2ecc71]">{selectedFood.calories} ккал</p>
            </div>
          </div>
          <button className="bg-[#7FE35B] text-black text-center py-4 rounded-xl ">
            Добавить в дневник
          </button>
        </Card>
      )}
    </Container>
  );
};
