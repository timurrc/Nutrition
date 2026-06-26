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
            <h2 className="text-2xl font-semibold">Расскажите о себе</h2>
            <p>Эти данные помогут нам подобрать оптимальные рекомендации</p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p>Пол</p>
            <div className="flex gap-3 items-center justify-between">
              <Card
                className={`w-full bg-[#1C2128] rounded-xl flex flex-col items-center py-6 px-2 ${formData.sex === "man" ? "border border-[#75d253] transition-all" : "border border-[#1c2128]"} gap-2`}
                onClick={() => setFormData({ ...formData, sex: "man" })}
              >
                <Mars />
                <p>Мужской</p>
              </Card>
              <Card
                className={`w-full bg-[#1C2128] rounded-xl flex flex-col items-center py-6 px-2 ${formData.sex === "woman" ? "border border-[#75d253] transition-all" : "border border-[#1c2128]"} gap-2`}
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
                className="w-full bg-[#1C2128] px-4 py-4 rounded-xl outline-none"
                value={formData.height}
                onChange={(e) =>
                  setFormData({ ...formData, height: e.target.value })
                }
                placeholder="175 см"
              />
              <Ruler className="absolute top-4 right-4 text-gray-500" />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p>Вес</p>
            <div className="relative">
              <input
                type="text"
                className="w-full bg-[#1C2128] px-4 py-4 rounded-xl outline-none"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
                placeholder="70 кг"
              />
              <Weight className="absolute top-4 right-4 text-gray-500" />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p>Возраст</p>
            <div className="relative">
              <input
                type="text"
                className="w-full bg-[#1C2128] px-4 py-4 rounded-xl outline-none"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                placeholder="20 лет"
              />
              <LucideCalendarDays className="absolute top-4 right-4 text-gray-500" />
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full items-center">
            <button
              className="py-4 bg-[#7FE35B] text-black w-full rounded-xl font-semibold"
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
            <h2 className="text-2xl font-semibold">Ваша цель</h2>
            <p>Выберите цель, которая для вас сейчас приоритетна</p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p>Цель</p>
            <div className="flex flex-col gap-2">
              {targets.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Card
                    className={`w-full bg-[#1C2128] rounded-xl py-3 px-5 flex items-center ${formData.target === item.target ? "border border-[#75d253] transition-all" : "border border-[#1c2128]"} gap-4 `}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, target: item.target }))
                    }
                  >
                    <IconComponent
                      size={24}
                      className={`w-10 h-10 ${item.id === 1 ? "text-[#7FE35B]" : item.id === 2 ? "text-[#FFB84D] " : "text-[#d54dff]"}`}
                    />
                    <div className="flex flex-col">
                      <p>{item.title}</p>
                      <p className="text-gray-500">{item.description}</p>
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
                  className={`w-full bg-[#1C2128] rounded-xl py-3 px-5 flex justify-between items-center ${formData.activity === item.activity ? "border border-[#75d253] transition-all" : "border border-[#1c2128]"}`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      activity: item.activity,
                    }))
                  }
                >
                  <div className="flex flex-col gap-1">
                    <p>{item.title}</p>
                    <p className="text-gray-500">{item.description}</p>
                  </div>
                  <div
                    className={`${formData.activity === item.activity ? "bg-[#75d253] transition-all" : "border border-[#353f4c]"} h-5 w-5 rounded-full`}
                  />
                </Card>
              ))}
            </div>
          </div>
          <button
            className="py-4 bg-[#7FE35B] text-black w-full rounded-xl font-semibold"
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
