import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";
import { foods } from "../consts/dishes";
import { Package, Plus, Search } from "lucide-react";
import { MealRepository } from "../repositories/mealRepository";
import { CustomProductRepository } from "../repositories/customProductRepository";
import { MealType } from "../db/db";
import { Typography } from "../components/ui/Typography";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { getCurrentUserId } from "../utils/currentUser";
import { scaleNutrition } from "../utils/scaleNutrition";
import { GramStepper } from "../components/features/meal/GramStepper";
import { MacroGrid } from "../components/features/meal/MacroGrid";

type FoodSource = "catalog" | "custom";

type MealFood = {
  key: string;
  source: FoodSource;
  id: number;
  image: string | null;
  title: string;
  protein: number;
  fat: number;
  carbs: number;
  calories: number;
};

type MealTab = "catalog" | "custom";

type CustomForm = {
  title: string;
  protein: string;
  fat: string;
  carbs: string;
};

const CUSTOM_PLACEHOLDER = "";

export const Meal = () => {
  const navigate = useNavigate();
  const userId = getCurrentUserId();
  const [tab, setTab] = useState<MealTab>("catalog");
  const [pickedKey, setPickedKey] = useState<string | null>(null);
  const [full, setFull] = useState(false);
  const [search, setSearch] = useState("");
  const [grams, setGrams] = useState(100);
  const [mealType, setMealType] = useState<MealType>("breakfast");
  const [customForm, setCustomForm] = useState<CustomForm>({
    title: "",
    protein: "",
    fat: "",
    carbs: "",
  });
  const [customError, setCustomError] = useState("");

  const customProducts = useLiveQuery(
    () => (userId !== null ? CustomProductRepository.getByUserId(userId) : []),
    [userId],
  );

  const catalogFoods: MealFood[] = useMemo(
    () =>
      foods.map((item) => ({
        key: `catalog-${item.id}`,
        source: "catalog",
        id: item.id,
        image: item.image,
        title: item.title,
        protein: item.protein,
        fat: item.fat,
        carbs: item.carbs,
        calories: item.calories,
      })),
    [],
  );

  const userFoods: MealFood[] = useMemo(
    () =>
      (customProducts ?? []).map((item) => ({
        key: `custom-${item.id}`,
        source: "custom",
        id: item.id!,
        image: null,
        title: item.title,
        protein: item.protein,
        fat: item.fat,
        carbs: item.carbs,
        calories: item.calories,
      })),
    [customProducts],
  );

  const allFoods = useMemo(
    () => [...catalogFoods, ...userFoods],
    [catalogFoods, userFoods],
  );

  const filtered = allFoods.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );
  const visibleFoods = full ? filtered : filtered.slice(0, 5);
  const selectedFood = allFoods.find((item) => item.key === pickedKey) ?? null;

  const scaled = selectedFood
    ? scaleNutrition(
        {
          protein: selectedFood.protein,
          fat: selectedFood.fat,
          carbs: selectedFood.carbs,
          calories: selectedFood.calories,
        },
        grams,
      )
    : null;

  const handleSaveCustomProduct = async () => {
    if (userId === null) return;

    setCustomError("");
    const title = customForm.title.trim();
    const protein = Number(customForm.protein);
    const fat = Number(customForm.fat);
    const carbs = Number(customForm.carbs);

    if (!title) {
      setCustomError("Введите название продукта");
      return;
    }

    if (![protein, fat, carbs].every((value) => Number.isFinite(value) && value >= 0)) {
      setCustomError("БЖУ должны быть числами от 0");
      return;
    }

    const calories = protein * 4 + fat * 9 + carbs * 4;
    const productId = await CustomProductRepository.create({
      userId,
      title,
      protein,
      fat,
      carbs,
      calories,
      createdAt: Date.now(),
    });

    setCustomForm({ title: "", protein: "", fat: "", carbs: "" });
    setTab("catalog");
    setPickedKey(`custom-${productId}`);
    setGrams(100);
  };

  const handleAddMeal = async () => {
    if (userId === null || !selectedFood || !scaled) return;

    await MealRepository.create({
      userId,
      image: selectedFood.image ?? CUSTOM_PLACEHOLDER,
      title: selectedFood.title,
      calories: scaled.calories,
      protein: scaled.protein,
      fat: scaled.fat,
      carbs: scaled.carbs,
      per: scaled.per,
      mealType,
      createdAt: Date.now(),
    });

    navigate("/log");
  };

  if (userId === null) {
    return null;
  }

  return (
    <Container>
      <Typography variant={"h2"} className="mb-4">
        Добавьте прием пищи
      </Typography>

      <div className="mb-4 grid grid-cols-2 gap-1 rounded-lg bg-surface-secondary p-1">
        <button
          type="button"
          className={`h-10 rounded-md text-sm font-medium transition-all ${tab === "catalog" ? "bg-surface text-text shadow-sm" : "text-text-secondary"}`}
          onClick={() => setTab("catalog")}
        >
          Каталог
        </button>
        <button
          type="button"
          className={`h-10 rounded-md text-sm font-medium transition-all ${tab === "custom" ? "bg-surface text-text shadow-sm" : "text-text-secondary"}`}
          onClick={() => setTab("custom")}
        >
          Свой продукт
        </button>
      </div>

      {tab === "catalog" ? (
        <>
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
                Продукты
              </Typography>
              {filtered.length > 5 && (
                <Typography
                  variant={"body"}
                  className="cursor-pointer text-primary"
                  onClick={() => setFull(!full)}
                >
                  {full ? "Свернуть" : "Показать еще"}
                </Typography>
              )}
            </div>
            {visibleFoods.map((item) => (
              <div
                onClick={() => {
                  setPickedKey(item.key);
                  setGrams(100);
                }}
                key={item.key}
                className={`flex w-full cursor-pointer items-center justify-between rounded-lg border px-3 py-3 transition-colors ${pickedKey === item.key ? "border-primary bg-surface-secondary ring-2 ring-primary/10" : "border-border bg-surface hover:border-primary/40"}`}
              >
                <div className="flex items-center gap-4">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-14 w-14 rounded-lg object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-surface-secondary text-text-secondary">
                      <Package size={24} />
                    </div>
                  )}
                  <div className="flex flex-col items-start">
                    <Typography variant={"body"} className="font-medium">
                      {item.title}
                    </Typography>
                    <div className="flex items-center gap-1">
                      <Typography variant={"body"} className="text-text-secondary">
                        100г ⋅
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
        </>
      ) : (
        <Card className="mb-4 flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 shadow-sm">
          <Typography variant={"body"} className="font-medium">
            Новый продукт на 100 г
          </Typography>
          <Input
            placeholder="Название"
            type="text"
            value={customForm.title}
            onChange={(e) =>
              setCustomForm({ ...customForm, title: e.target.value })
            }
          />
          <Input
            placeholder="Белки"
            type="number"
            value={customForm.protein}
            onChange={(e) =>
              setCustomForm({ ...customForm, protein: e.target.value })
            }
          />
          <Input
            placeholder="Жиры"
            type="number"
            value={customForm.fat}
            onChange={(e) =>
              setCustomForm({ ...customForm, fat: e.target.value })
            }
          />
          <Input
            placeholder="Углеводы"
            type="number"
            value={customForm.carbs}
            onChange={(e) =>
              setCustomForm({ ...customForm, carbs: e.target.value })
            }
          />
          {customError && (
            <Typography variant={"body"} className="text-sm text-danger">
              {customError}
            </Typography>
          )}
          <Button variant="primary" onClick={handleSaveCustomProduct}>
            Сохранить продукт
          </Button>
        </Card>
      )}

      {selectedFood && scaled && tab === "catalog" && (
        <Card className="flex flex-col gap-6 rounded-lg border border-border bg-surface px-4 py-4 shadow-sm">
          <div className="flex w-full items-center gap-4">
            {selectedFood.image ? (
              <img
                src={selectedFood.image}
                className="h-18 w-19 rounded-lg object-cover"
                alt={selectedFood.title}
                loading="lazy"
              />
            ) : (
              <div className="flex h-18 w-19 items-center justify-center rounded-lg bg-surface-secondary text-text-secondary">
                <Package size={28} />
              </div>
            )}
            <div className="flex flex-col items-start">
              <Typography variant={"body"} className="font-medium">
                {selectedFood.title}
              </Typography>
              <Typography variant={"body"} className="text-text-secondary">
                {scaled.per}г ⋅ {scaled.calories} ккал
              </Typography>
            </div>
          </div>

          <GramStepper grams={grams} onChange={setGrams} />

          <MacroGrid
            protein={scaled.protein}
            fat={scaled.fat}
            carbs={scaled.carbs}
            calories={scaled.calories}
          />

          <select
            name="mealType"
            id="mealTypeList"
            value={mealType}
            onChange={(e) => setMealType(e.target.value as MealType)}
            className="h-11 w-full min-w-full rounded-lg border border-border bg-surface px-4 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10"
          >
            <option value="breakfast">Завтрак</option>
            <option value="lunch">Обед</option>
            <option value="dinner">Ужин</option>
            <option value="snack">Перекус</option>
          </select>
          <Button variant="primary" onClick={handleAddMeal}>
            Добавить в дневник
          </Button>
        </Card>
      )}
    </Container>
  );
};
