import {
  Beaker,
  Coffee,
  Droplet,
  LucideIcon,
  Milk,
  Minus,
  PillBottle,
  Plus,
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";
import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { WaterRepository } from "../repositories/waterRepository";
import { MealRepository } from "../repositories/mealRepository";
import { OnBoardingRepository } from "../repositories/onBoardingRepository";
import { Typography } from "../components/ui/Typography";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { getCurrentUserId } from "../utils/currentUser";
import { calcProgress, getDailyGoals } from "../utils/nutritionGoals";

interface IWaterVolume {
  id: number;
  icon: LucideIcon;
  title: number;
}
interface IWater {
  addWater: number;
  description: string;
}

interface MacroStatProps {
  label: string;
  current: number;
  goal: number;
  progress: number;
  colorClass: string;
  barClass: string;
}

const MacroStat = ({
  label,
  current,
  goal,
  progress,
  colorClass,
  barClass,
}: MacroStatProps) => (
  <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
    <div className="mb-3 flex items-center justify-between">
      <Typography variant={"body"} className="font-semibold">
        {label}
      </Typography>
      <Typography variant={"body"} className={`font-semibold ${colorClass}`}>
        {Math.round(current)}
        <span className="font-normal text-text-secondary">/{goal} г</span>
      </Typography>
    </div>
    <div className="h-2 overflow-hidden rounded-full bg-surface-secondary">
      <div
        className={`h-full rounded-full transition-all ${barClass}`}
        style={{ width: `${progress}%` }}
      />
    </div>
    <Typography variant={"caption"} className="mt-2">
      {progress}% от дневной нормы
    </Typography>
  </div>
);

const formatLiters = (ml: number) => (ml / 1000).toFixed(1);

export const Dashboard = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<IWater>({
    addWater: 250,
    description: "",
  });
  const userId = getCurrentUserId();
  const today = new Date();

  const onboarding = useLiveQuery(
    () =>
      userId !== null ? OnBoardingRepository.findByUserId(userId) : undefined,
    [userId],
  );
  const mealTotals = useLiveQuery(
    () =>
      userId !== null
        ? MealRepository.getDailyTotals(userId, today)
        : undefined,
    [userId],
  );
  const waterMl = useLiveQuery(
    () =>
      userId !== null
        ? WaterRepository.getTotalByDate(userId, today)
        : undefined,
    [userId],
  );

  if (userId === null) {
    return null;
  }

  const goals = getDailyGoals(onboarding);
  const totals = mealTotals ?? {
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
  };
  const waterTotal = waterMl ?? 0;

  const calorieProgress = calcProgress(totals.calories, goals.calories);
  const remainingCalories = Math.max(0, goals.calories - totals.calories);
  const waterProgress = calcProgress(waterTotal, goals.waterMl);

  const waterVolume: IWaterVolume[] = [
    { id: 1, icon: Coffee, title: 250 },
    { id: 2, icon: Beaker, title: 500 },
    { id: 3, icon: PillBottle, title: 750 },
    { id: 4, icon: Milk, title: 1000 },
  ];

  const handleSelectVolume = (volume: number) => {
    setFormData({ ...formData, addWater: volume });
  };
  const handleChangeVolume = (difference: string) => {
    if (difference === "increment") {
      setFormData({ ...formData, addWater: formData.addWater + 50 });
    } else if (formData.addWater > 0) {
      setFormData({ ...formData, addWater: formData.addWater - 50 });
    }
  };
  const handleUpdateWater = async () => {
    await WaterRepository.create({
      userId,
      amount: Number(formData.addWater),
      description: formData.description || null,
      createdAt: Date.now(),
    });
    setFormData({ addWater: 250, description: "" });
    setIsOpen(false);
  };

  const todayLabel = today.toLocaleDateString("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <Container>
      <div className="mb-5 flex items-end justify-between">
        <div>
          <Typography variant={"caption"} className="uppercase tracking-wide">
            Главная
          </Typography>
          <Typography variant={"h2"} className="mt-1 capitalize">
            {todayLabel}
          </Typography>
        </div>
        <div className="rounded-full bg-primary/10 px-3 py-1">
          <Typography variant={"caption"} className="font-medium text-primary">
            Цель {goals.calories} ккал
          </Typography>
        </div>
      </div>

      <Card className="relative mb-4 overflow-hidden rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary-hover to-secondary" />
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div>
              <Typography variant={"caption"}>Калории сегодня</Typography>
              <Typography variant={"h1"} className="leading-none">
                {Math.round(totals.calories)}
              </Typography>
              <Typography variant={"body"} className="text-text-secondary">
                из {goals.calories} ккал
              </Typography>
            </div>
            <div>
              <div className="mb-1 flex justify-between gap-2">
                <Typography variant={"caption"}>Прогресс дня</Typography>
                <Typography variant={"caption"} className="text-primary">
                  {calorieProgress}%
                </Typography>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-surface-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${calorieProgress}%` }}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="rounded-lg bg-success/10 px-3 py-2">
                <Typography variant={"caption"}>Осталось</Typography>
                <Typography variant={"body"} className="font-semibold text-success">
                  {remainingCalories} ккал
                </Typography>
              </div>
              <div className="rounded-lg bg-primary/10 px-3 py-2">
                <Typography variant={"caption"}>Съедено</Typography>
                <Typography variant={"body"} className="font-semibold text-primary">
                  {Math.round(totals.calories)}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="mb-2 flex items-center justify-between">
        <Typography variant={"h3"}>БЖУ</Typography>
        <Typography variant={"caption"}>Баланс макросов</Typography>
      </div>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <MacroStat
          label="Белки"
          current={totals.protein}
          goal={goals.protein}
          progress={calcProgress(totals.protein, goals.protein)}
          colorClass="text-protein"
          barClass="bg-protein"
        />
        <MacroStat
          label="Жиры"
          current={totals.fat}
          goal={goals.fat}
          progress={calcProgress(totals.fat, goals.fat)}
          colorClass="text-fat"
          barClass="bg-fat"
        />
        <MacroStat
          label="Углеводы"
          current={totals.carbs}
          goal={goals.carbs}
          progress={calcProgress(totals.carbs, goals.carbs)}
          colorClass="text-carbs"
          barClass="bg-carbs"
        />
      </div>

      <Card className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-water/10 text-water">
              <Droplet size={22} />
            </div>
            <div>
              <Typography variant={"body"} className="font-semibold">
                Вода
              </Typography>
              <Typography variant={"body"} className="text-text-secondary">
                Цель на сегодня {formatLiters(goals.waterMl)} л
              </Typography>
            </div>
          </div>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full bg-primary text-text-button shadow-sm transition-colors hover:bg-primary-hover"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="mb-2 flex items-end justify-between">
          <Typography variant={"h2"}>{formatLiters(waterTotal)} л</Typography>
          <Typography variant={"body"} className="text-text-secondary">
            {waterProgress}% выполнено
          </Typography>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-surface-secondary">
          <div
            className="h-full rounded-full bg-gradient-to-r from-water to-primary transition-all"
            style={{ width: `${waterProgress}%` }}
          />
        </div>
      </Card>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/35" />
          <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-20">
            <div className="flex h-150 w-full max-w-md flex-col gap-4 rounded-2xl border border-border bg-surface px-4 py-5 shadow-xl">
              <div className="flex items-center justify-between">
                <Typography variant={"h2"}>Добавить воду</Typography>
                <button
                  type="button"
                  className="rounded-lg px-2 py-1 text-sm text-text-secondary hover:bg-surface-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  Закрыть
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <Typography variant={"body"}>Количество</Typography>
                <div className="flex w-full items-center justify-between">
                  <div
                    className="cursor-pointer rounded-full bg-surface-secondary p-3 transition-colors hover:bg-border"
                    onClick={() => handleChangeVolume("decrement")}
                  >
                    <Minus />
                  </div>
                  <Typography variant={"h1"}>{formData.addWater} мл</Typography>
                  <div
                    className="cursor-pointer rounded-full bg-surface-secondary p-3 transition-colors hover:bg-border"
                    onClick={() => handleChangeVolume("increment")}
                  >
                    <Plus />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Typography variant={"body"}>Быстрый выбор</Typography>
                <div className="grid w-full grid-cols-2 gap-2">
                  {waterVolume.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Card
                        className={`flex items-center gap-2 rounded-lg border bg-surface-secondary px-4 py-3 ${formData.addWater === item.title ? "border-primary ring-2 ring-primary/10" : "border-border"}`}
                        onClick={() => handleSelectVolume(item.title)}
                        key={item.id}
                      >
                        <IconComponent size={24} />
                        <div className="flex flex-col">
                          <Typography variant={"body"}>{item.title}</Typography>
                          <Typography variant={"body"}>мл</Typography>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Typography variant={"body"}>Заметка (необязательно)</Typography>
                <Input
                  type={"text"}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Например: после тренировки"
                />
              </div>

              <Button variant="secondary" onClick={() => handleUpdateWater()}>
                Добавить {formData.addWater} мл воды
              </Button>

              <div className="flex items-center justify-center gap-2 text-text-secondary">
                <Droplet />
                <Typography variant={"body"}>
                  Цель на сегодня {goals.waterMl} мл
                </Typography>
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};
