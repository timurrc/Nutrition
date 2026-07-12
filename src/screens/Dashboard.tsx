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
import { ProgressRing } from "../components/features/ProgressRing";
import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";
import { useState } from "react";
import { WaterRepository } from "../repositories/waterRepository";
import { Typography } from "../components/ui/Typography";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

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
        {current}
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

export const Dashboard = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const waterVolume: IWaterVolume[] = [
    { id: 1, icon: Coffee, title: 250 },
    { id: 2, icon: Beaker, title: 500 },
    { id: 3, icon: PillBottle, title: 750 },
    { id: 4, icon: Milk, title: 1000 },
  ];
  const [formData, setFormData] = useState<IWater>({
    addWater: 250,
    description: "",
  });
  const handleSelectVolume = (volume: number) => {
    setFormData({ ...formData, addWater: volume });
  };
  const handleChangeVolume = (difference: string) => {
    if (difference === "increment") {
      setFormData({ ...formData, addWater: formData.addWater + 50 });
    } else {
      if (formData.addWater > 0) {
        setFormData({ ...formData, addWater: formData.addWater - 50 });
      }
    }
  };
  const handleUpdateWater = async () => {
    await WaterRepository.create({
      userId: 1,
      amount: Number(formData.addWater),
      description: formData.description,
      createdAt: Date.now(),
    });
  };

  const todayLabel = new Date().toLocaleDateString("ru-RU", {
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
            День 12
          </Typography>
        </div>
      </div>

      <Card className="relative mb-4 overflow-hidden rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary-hover to-secondary" />
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
          <div className="shrink-0 scale-90 sm:scale-100">
            <ProgressRing
              progress={42}
              color={"calories"}
              variant={"big"}
              size={190}
              strokeWidth={10}
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div>
              <Typography variant={"caption"}>Калории сегодня</Typography>
              <Typography variant={"h1"} className="leading-none">
                1650
              </Typography>
              <Typography variant={"body"} className="text-text-secondary">
                из 1950 ккал
              </Typography>
            </div>
            <div>
              <div className="mb-1 flex justify-between">
                <Typography variant={"caption"}>Прогресс дня</Typography>
                <Typography variant={"caption"} className="text-primary">
                  42%
                </Typography>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-surface-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: "42%" }}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="rounded-lg bg-success/10 px-3 py-2">
                <Typography variant={"caption"}>Осталось</Typography>
                <Typography variant={"body"} className="font-semibold text-success">
                  400 ккал
                </Typography>
              </div>
              <div className="rounded-lg bg-primary/10 px-3 py-2">
                <Typography variant={"caption"}>Съедено</Typography>
                <Typography variant={"body"} className="font-semibold text-primary">
                  1650
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
          current={120}
          goal={180}
          progress={34}
          colorClass="text-protein"
          barClass="bg-protein"
        />
        <MacroStat
          label="Жиры"
          current={120}
          goal={180}
          progress={34}
          colorClass="text-fat"
          barClass="bg-fat"
        />
        <MacroStat
          label="Углеводы"
          current={120}
          goal={180}
          progress={34}
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
                Цель на сегодня 4,5 л
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
          <Typography variant={"h2"}>3.2 л</Typography>
          <Typography variant={"body"} className="text-text-secondary">
            71% выполнено
          </Typography>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-surface-secondary">
          <div
            className="h-full rounded-full bg-gradient-to-r from-water to-primary transition-all"
            style={{ width: "71%" }}
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
                  <Typography variant={"h1"}> {formData.addWater} мл</Typography>

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
                <Typography variant={"body"}>Цель на сегодня 2 500мл</Typography>
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};
