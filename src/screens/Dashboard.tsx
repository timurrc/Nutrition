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

  return (
    <Container>
      <div className="flex flex-col w-full">
        <Typography variant={"h2"} className="items-start">
          Сегодня
        </Typography>

        <div className="flex justify-center items-center">
          <ProgressRing progress={42} color={"calories"} variant={"big"} />
        </div>
      </div>
      <div className="flex justify-between gap-2 mt-5">
        <Card
          className={
            "flex flex-col rounded-lg border border-border bg-surface shadow-sm gap-1 w-full items-center py-4"
          }
        >
          <Typography variant={"body"} className="font-semibold">
            Белки
          </Typography>
          <Typography variant={"body"}>120/180</Typography>

          <ProgressRing
            progress={34}
            color={"protein"}
            variant={"normal"}
          ></ProgressRing>
        </Card>
        <Card
          className={
            "flex flex-col rounded-lg border border-border bg-surface shadow-sm gap-1 w-full items-center py-4"
          }
        >
          <Typography variant={"body"} className="font-semibold">
            Жиры
          </Typography>
          <Typography variant={"body"}>120/180</Typography>

          <ProgressRing
            progress={34}
            color={"fat"}
            variant={"normal"}
          ></ProgressRing>
        </Card>
        <Card
          className={
            "flex flex-col rounded-lg border border-border bg-surface shadow-sm gap-1 w-full items-center py-4 px-2"
          }
        >
          <Typography variant={"body"} className="font-semibold">
            Углеводы
          </Typography>
          <Typography variant={"body"}>120/180</Typography>

          <ProgressRing
            progress={34}
            color={"carbs"}
            variant={"normal"}
          ></ProgressRing>
        </Card>
      </div>
      <div>
        <Card className="mt-5 flex w-full items-center justify-between rounded-lg border border-border bg-surface px-4 py-4 shadow-sm">
          <div className="flex flex-col gap-2 items-start">
            <Typography variant={"body"} className="font-semibold">
              Вода
            </Typography>

            <div className="flex items-center">
              <Typography variant={"body"} className="font-semibold">
                3.2
              </Typography>
              <Typography variant={"body"} className="ml-2 text-text-secondary">
                / 4,5 л
              </Typography>
            </div>
          </div>
          <div
            className="cursor-pointer rounded-full bg-primary/10 p-2 text-primary transition-colors hover:bg-primary/15"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Plus />
          </div>
        </Card>
      </div>
      {isOpen && (
        <div className="flex justify-center">
          <div className="fixed top-20 flex h-150 w-92 flex-col gap-4 rounded-lg border border-border bg-surface px-4 py-5 shadow-lg">
            <Typography variant={"h2"}>Добавить воду</Typography>

            <div className="flex flex-col gap-4">
              <Typography variant={"body"}>Количество</Typography>

              <div className="flex justify-between items-center w-full">
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

              <div className="grid grid-cols-2 gap-2 w-full">
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
      )}
    </Container>
  );
};
