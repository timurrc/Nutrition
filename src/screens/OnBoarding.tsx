import { Container } from "../components/ui/Container";
import logo from "/nutrition.png";
import {
  Mars,
  Venus,
  Ruler,
  LucideCalendarDays,
  Weight,
  PersonStanding,
  Salad,
  CircleArrowDown,
  LucideIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card } from "../components/ui/Card";
import { OnBoardingRepository } from "../repositories/onBoardingRepository";
import { Typography } from "../components/ui/Typography";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

interface IOnBoarding {
  sex: Sex | null;
  height: number | null;
  weight: number | null;
  age: number | null;
  target: Target | null;
  activity: Activity | null;
}
interface ITarget {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  target: Target;
}
interface IActivity {
  id: number;
  title: string;
  description: string;
  activity: Activity;
}
type Sex = "man" | "woman";
type Target = "loseWeight" | "gainWeight" | "saveWeight";
type Activity = "low" | "medium" | "high";
type Step = "Personal" | "Goal";

export const OnBoarding = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState<boolean>(false);
  const [step, setStep] = useState<Step>("Personal");
  const targets: ITarget[] = [
    {
      id: 1,
      icon: PersonStanding,
      title: "Похудеть",
      description: "Снизить вес",
      target: "loseWeight",
    },
    {
      id: 2,
      icon: Salad,
      title: "Набрать массу",
      description: "Увеличить вес",
      target: "gainWeight",
    },
    {
      id: 1,
      icon: CircleArrowDown,
      title: "Поддерживать",
      description: "Сохранить вес",
      target: "saveWeight",
    },
  ];
  const activities: IActivity[] = [
    {
      id: 1,
      title: "Низкий",
      description: "Снизить вес",
      activity: "low",
    },
    {
      id: 2,
      title: "Умеренный",
      description: "Увеличить вес",
      activity: "medium",
    },
    {
      id: 3,
      title: "Высокий",
      description: "Сохранить вес",
      activity: "high",
    },
  ];
  const [formData, setFormData] = useState<IOnBoarding>({
    sex: null,
    height: null,
    weight: null,
    age: null,
    target: null,
    activity: null,
  });
  const handleChangeStep = (step: Step) => {
    const isCompleted = formData.sex && formData.height && formData.age;
    if (isCompleted) {
      setStep(step);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };
  const handleFinishRegister = async () => {
    const isCompleted =
      formData.sex &&
      formData.height &&
      formData.age &&
      formData.activity &&
      formData.target &&
      formData.weight;
    if (!isCompleted) {
      setIsError(true);
      return;
    }
    try {
      const currentUserId = Number(localStorage.getItem("currentUserId"));
      const onBoardingId = await OnBoardingRepository.create({
        userId: currentUserId,
        sex: formData.sex!,
        height: Number(formData.height),
        weight: Number(formData.weight),
        age: Number(formData.age),
        target: formData.target!,
        activity: formData.activity!,
      });
      if (onBoardingId) {
        navigate("/home");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
      <div className="mx-auto mb-8 mt-6 flex max-w-md items-center gap-3">
        <div
          className={`h-1.5 flex-1 rounded-full ${step === "Personal" ? "bg-primary" : "bg-primary/30"}`}
        />
        <div
          className={`h-1.5 flex-1 rounded-full ${step === "Goal" ? "bg-primary" : "bg-surface-secondary"}`}
        />
      </div>
      {step === "Personal" ? (
        <div className="flex flex-col justify-center items-center gap-8">
          <div className="flex flex-col gap-3 text-center">
            <Typography variant={"h2"}>Расскажите о себе</Typography>
            <Typography variant={"body"} className="text-text-secondary">
              Эти данные помогут нам подобрать оптимальные рекомендации
            </Typography>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Typography variant={"body"}>Пол</Typography>
            <div className="flex gap-3 items-center justify-between">
              <Card
                className={`w-full bg-surface rounded-lg border flex flex-col items-center py-6 px-2 ${formData.sex === "man" ? "border-primary ring-2 ring-primary/10 transition-all" : "border-border"} gap-2`}
                onClick={() => setFormData({ ...formData, sex: "man" })}
              >
                <Mars />
                <Typography variant={"body"}>Мужской</Typography>
              </Card>
              <Card
                className={`w-full bg-surface rounded-lg border flex flex-col items-center py-6 px-2 ${formData.sex === "woman" ? "border-primary ring-2 ring-primary/10 transition-all" : "border-border"} gap-2`}
                onClick={() => setFormData({ ...formData, sex: "woman" })}
              >
                <Venus />
                <Typography variant={"body"}>Женский</Typography>
              </Card>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Typography variant={"body"}>Рост</Typography>
            <Input
              placeholder={"175 см"}
              type={"text"}
              value={formData.height}
              onChange={(e) =>
                setFormData({ ...formData, height: e.target.value })
              }
              icon={Ruler}
              iconSide="right"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Typography variant={"body"}>Вес</Typography>
            <Input
              placeholder={"70 кг"}
              type={"text"}
              value={String(formData.weight)}
              onChange={(e) =>
                setFormData({ ...formData, weight: e.target.value })
              }
              icon={Weight}
              iconSide="right"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Typography variant={"body"}>Возраст</Typography>
            <Input
              placeholder={"20 лет"}
              type={"text"}
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
              icon={LucideCalendarDays}
              iconSide="right"
            />
          </div>
          <div className="flex flex-col gap-1 w-full items-center">
            <Button variant="primary" onClick={() => handleChangeStep("Goal")}>
              Продолжить
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-8">
          <div className="flex flex-col gap-3 text-center">
            <Typography variant={"h2"}>Ваша цель</Typography>
            <Typography variant={"body"} className="text-text-secondary">
              Выберите цель, которая для вас сейчас приоритетна
            </Typography>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Typography variant={"body"}>Цель</Typography>

            <div className="flex flex-col gap-2">
              {targets.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Card
                    className={`w-full bg-surface rounded-lg border py-3 px-5 flex items-center ${formData.target === item.target ? "border-primary ring-2 ring-primary/10 transition-all" : "border-border"} gap-4 `}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, target: item.target }))
                    }
                  >
                    <IconComponent
                      size={24}
                      className={`w-10 h-10 ${item.id === 1 ? "text-primary" : item.id === 2 ? "text-warning" : "text-secondary"}`}
                    />
                    <div className="flex flex-col">
                      <Typography variant={"body"}>{item.title}</Typography>
                      <Typography
                        variant={"body"}
                        className="text-text-secondary"
                      >
                        {item.description}
                      </Typography>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Typography variant={"body"}>Уровень активности</Typography>
            <div className="flex flex-col gap-2">
              {activities.map((item) => (
                <Card
                  className={`w-full bg-surface rounded-lg border py-3 px-5 flex justify-between items-center ${formData.activity === item.activity ? "border-primary ring-2 ring-primary/10 transition-all" : "border-border"}`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      activity: item.activity,
                    }))
                  }
                >
                  <div className="flex flex-col gap-1">
                    <Typography variant={"body"}>{item.title}</Typography>
                    <Typography
                      variant={"body"}
                      className="text-text-secondary"
                    >
                      {item.description}
                    </Typography>
                  </div>
                  <div
                    className={`${formData.activity === item.activity ? "bg-primary transition-all" : "border border-border"} h-5 w-5 rounded-full`}
                  />
                </Card>
              ))}
            </div>
          </div>
          <Button variant="primary" onClick={() => handleFinishRegister()}>
            Продолжить
          </Button>
        </div>
      )}
      <br />
      <br />
    </Container>
  );
};
