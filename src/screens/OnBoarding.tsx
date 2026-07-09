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
  const [step, setStep] = useState<Step>("Goal");
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
      {step === "Personal" ? (
        <div className="flex flex-col justify-center items-center gap-8 mt-20 ">
          <div className="flex flex-col gap-3 text-center">
            <h2 className="text-2xl font-semibold text-[#111827]">Расскажите о себе</h2>
            <p className="text-[#6b7280]">Эти данные помогут нам подобрать оптимальные рекомендации</p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p>Пол</p>
            <div className="flex gap-3 items-center justify-between">
              <Card
                className={`w-full rounded-lg border bg-white flex flex-col items-center py-6 px-2 ${formData.sex === "man" ? "border-[#1677ff] ring-2 ring-[#1677ff]/10 transition-all" : "border-[#e5e7eb]"} gap-2`}
                onClick={() => setFormData({ ...formData, sex: "man" })}
              >
                <Mars />
                <p>Мужской</p>
              </Card>
              <Card
                className={`w-full rounded-lg border bg-white flex flex-col items-center py-6 px-2 ${formData.sex === "woman" ? "border-[#1677ff] ring-2 ring-[#1677ff]/10 transition-all" : "border-[#e5e7eb]"} gap-2`}
                onClick={() => setFormData({ ...formData, sex: "woman" })}
              >
                <Venus />
                <p>Женский</p>
              </Card>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p>Рост</p>
            <div className="relative">
              <input
                type="text"
                className="h-11 w-full rounded-lg border border-[#e5e7eb] bg-white px-4 pr-11 outline-none transition-colors focus:border-[#1677ff] focus:ring-2 focus:ring-[#1677ff]/10"
                value={formData.height}
                onChange={(e) =>
                  setFormData({ ...formData, height: e.target.value })
                }
                placeholder="175 см"
              />
              <Ruler className="absolute top-1/2 -translate-y-1/2 right-4 size-4 text-[#6b7280]" />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p>Вес</p>
            <div className="relative">
              <input
                type="text"
                className="h-11 w-full rounded-lg border border-[#e5e7eb] bg-white px-4 pr-11 outline-none transition-colors focus:border-[#1677ff] focus:ring-2 focus:ring-[#1677ff]/10"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
                placeholder="70 кг"
              />
              <Weight className="absolute top-1/2 -translate-y-1/2 right-4 size-4 text-[#6b7280]" />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p>Возраст</p>
            <div className="relative">
              <input
                type="text"
                className="h-11 w-full rounded-lg border border-[#e5e7eb] bg-white px-4 pr-11 outline-none transition-colors focus:border-[#1677ff] focus:ring-2 focus:ring-[#1677ff]/10"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                placeholder="20 лет"
              />
              <LucideCalendarDays className="absolute top-1/2 -translate-y-1/2 right-4 size-4 text-[#6b7280]" />
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full items-center">
            <button
              className="h-11 w-full rounded-lg bg-[#1677ff] font-medium text-white shadow-sm transition-colors hover:bg-[#4096ff]"
              onClick={() => handleChangeStep("Goal")}
            >
              Продолжить
            </button>
            {isError && <p className="text-red-500">Заполните все данные</p>}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-8 mt-20 ">
          <div className="flex flex-col gap-3 text-center">
            <h2 className="text-2xl font-semibold text-[#111827]">Ваша цель</h2>
            <p className="text-[#6b7280]">Выберите цель, которая для вас сейчас приоритетна</p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p>Цель</p>
            <div className="flex flex-col gap-2">
              {targets.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Card
                    className={`w-full rounded-lg border bg-white py-3 px-5 flex items-center ${formData.target === item.target ? "border-[#1677ff] ring-2 ring-[#1677ff]/10 transition-all" : "border-[#e5e7eb]"} gap-4 `}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, target: item.target }))
                    }
                  >
                    <IconComponent
                      size={24}
                      className={`w-10 h-10 ${item.id === 1 ? "text-[#1677ff]" : item.id === 2 ? "text-[#d97706]" : "text-[#8b5cf6]"}`}
                    />
                    <div className="flex flex-col">
                      <p>{item.title}</p>
                      <p className="text-[#6b7280]">{item.description}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p>Уровень активности</p>
            <div className="flex flex-col gap-2">
              {activities.map((item) => (
                <Card
                  className={`w-full rounded-lg border bg-white py-3 px-5 flex justify-between items-center ${formData.activity === item.activity ? "border-[#1677ff] ring-2 ring-[#1677ff]/10 transition-all" : "border-[#e5e7eb]"}`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      activity: item.activity,
                    }))
                  }
                >
                  <div className="flex flex-col gap-1">
                    <p>{item.title}</p>
                    <p className="text-[#6b7280]">{item.description}</p>
                  </div>
                  <div
                    className={`${formData.activity === item.activity ? "bg-[#1677ff] transition-all" : "border border-[#e5e7eb]"} h-5 w-5 rounded-full`}
                  />
                </Card>
              ))}
            </div>
          </div>
          <button
            className="h-11 w-full rounded-lg bg-[#1677ff] font-medium text-white shadow-sm transition-colors hover:bg-[#4096ff]"
            onClick={() => handleFinishRegister()}
          >
            Продолжить
          </button>
        </div>
      )}
      <br />
      <br />
    </Container>
  );
};
