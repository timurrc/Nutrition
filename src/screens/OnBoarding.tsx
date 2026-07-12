import { Container } from "../components/ui/Container";
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
import { getCurrentUserId } from "../utils/currentUser";
import { calculateDailyGoals } from "../utils/nutritionGoals";

type OnBoardingForm = {
  sex: Sex | null;
  height: string;
  weight: string;
  age: string;
  target: Target | null;
  activity: Activity | null;
};

type TargetOption = {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  target: Target;
};

type ActivityOption = {
  id: number;
  title: string;
  description: string;
  activity: Activity;
};

type Sex = "man" | "woman";
type Target = "loseWeight" | "gainWeight" | "saveWeight";
type Activity = "low" | "medium" | "high";
type Step = "Personal" | "Goal";

export const OnBoarding = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [step, setStep] = useState<Step>("Personal");
  const targets: TargetOption[] = [
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
      id: 3,
      icon: CircleArrowDown,
      title: "Поддерживать",
      description: "Сохранить вес",
      target: "saveWeight",
    },
  ];
  const activities: ActivityOption[] = [
    {
      id: 1,
      title: "Низкий",
      description: "Мало движения в течение дня",
      activity: "low",
    },
    {
      id: 2,
      title: "Умеренный",
      description: "Тренировки 3-4 раза в неделю",
      activity: "medium",
    },
    {
      id: 3,
      title: "Высокий",
      description: "Интенсивные тренировки почти каждый день",
      activity: "high",
    },
  ];
  const [formData, setFormData] = useState<OnBoardingForm>({
    sex: null,
    height: "",
    weight: "",
    age: "",
    target: null,
    activity: null,
  });

  const handleChangeStep = (nextStep: Step) => {
    const isCompleted = formData.sex && formData.height && formData.age && formData.weight;
    if (isCompleted) {
      setStep(nextStep);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const handleFinishRegister = async () => {
    const userId = getCurrentUserId();
    if (!userId) return;

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

    const profile = {
      sex: formData.sex!,
      height: Number(formData.height),
      weight: Number(formData.weight),
      age: Number(formData.age),
      target: formData.target!,
      activity: formData.activity!,
    };

    const goals = calculateDailyGoals(profile);

    await OnBoardingRepository.upsert(userId, {
      userId,
      ...profile,
      dailyCalories: goals.calories,
      dailyProtein: goals.protein,
      dailyFat: goals.fat,
      dailyCarbs: goals.carbs,
      dailyWaterMl: goals.waterMl,
    });

    navigate("/");
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
              value={formData.weight}
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
            {isError && (
              <Typography variant={"body"} className="text-danger">
                Заполните все данные
              </Typography>
            )}
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
                    key={item.target}
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
                  key={item.activity}
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
          {isError && (
            <Typography variant={"body"} className="text-danger">
              Заполните все данные
            </Typography>
          )}
        </div>
      )}
      <br />
      <br />
    </Container>
  );
};
