import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate } from "react-router-dom";
import { LogOut, Trash2 } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";
import { Typography } from "../components/ui/Typography";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { clearSession, getCurrentUserId } from "../utils/currentUser";
import { calculateDailyGoals, getDailyGoals } from "../utils/nutritionGoals";
import { UserRepository } from "../repositories/userRepository";
import { OnBoardingRepository } from "../repositories/onBoardingRepository";
import { CustomProductRepository } from "../repositories/customProductRepository";
import { WeightRepository } from "../repositories/weightRepository";

type Sex = "man" | "woman";
type Target = "loseWeight" | "gainWeight" | "saveWeight";
type Activity = "low" | "medium" | "high";

type ProfileForm = {
  sex: Sex;
  height: string;
  weight: string;
  age: string;
  target: Target;
  activity: Activity;
  waterMl: string;
};

const TARGETS: { value: Target; label: string }[] = [
  { value: "loseWeight", label: "Похудеть" },
  { value: "gainWeight", label: "Набрать" },
  { value: "saveWeight", label: "Поддерживать" },
];

const ACTIVITIES: { value: Activity; label: string }[] = [
  { value: "low", label: "Низкая" },
  { value: "medium", label: "Средняя" },
  { value: "high", label: "Высокая" },
];

export const Profile = () => {
  const navigate = useNavigate();
  const userId = getCurrentUserId();
  const [form, setForm] = useState<ProfileForm | null>(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const user = useLiveQuery(
    () => (userId !== null ? UserRepository.get(userId) : undefined),
    [userId],
  );

  const onboarding = useLiveQuery(
    () =>
      userId !== null ? OnBoardingRepository.findByUserId(userId) : undefined,
    [userId],
  );

  const customProducts = useLiveQuery(
    () => (userId !== null ? CustomProductRepository.getByUserId(userId) : []),
    [userId],
  );

  useEffect(() => {
    if (!onboarding) return;

    setForm({
      sex: (onboarding.sex as Sex) || "man",
      height: String(onboarding.height),
      weight: String(onboarding.weight),
      age: String(onboarding.age),
      target: (onboarding.target as Target) || "saveWeight",
      activity: (onboarding.activity as Activity) || "medium",
      waterMl: String(
        onboarding.dailyWaterMl ?? getDailyGoals(onboarding).waterMl,
      ),
    });
  }, [onboarding]);

  const goals = getDailyGoals(onboarding);

  const handleSave = async () => {
    if (userId === null || !form || !onboarding?.id) return;

    setError("");
    setSaved(false);

    const height = Number(form.height);
    const weight = Number(form.weight);
    const age = Number(form.age);
    const waterMl = Number(form.waterMl);

    if (
      ![height, weight, age, waterMl].every((n) => Number.isFinite(n)) ||
      height < 100 ||
      height > 250 ||
      weight < 30 ||
      weight > 300 ||
      age < 10 ||
      age > 120 ||
      waterMl < 500 ||
      waterMl > 6000
    ) {
      setError("Проверьте рост, вес, возраст и цель по воде");
      return;
    }

    const profile = {
      sex: form.sex,
      height,
      weight,
      age,
      target: form.target,
      activity: form.activity,
    };

    const calculated = calculateDailyGoals(profile);

    await OnBoardingRepository.update(onboarding.id, {
      ...profile,
      dailyCalories: calculated.calories,
      dailyProtein: calculated.protein,
      dailyFat: calculated.fat,
      dailyCarbs: calculated.carbs,
      dailyWaterMl: Math.round(waterMl),
    });

    if (weight !== onboarding.weight) {
      await WeightRepository.create({
        userId,
        weight,
        createdAt: Date.now(),
      });
    }

    setSaved(true);
  };

  const handleLogout = () => {
    clearSession();
    navigate("/auth", { replace: true });
  };

  const handleDeleteProduct = async (id: number) => {
    await CustomProductRepository.delete(id);
  };

  if (userId === null || !form) {
    return null;
  }

  return (
    <Container>
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <Typography variant={"caption"} className="uppercase tracking-wide">
            Аккаунт
          </Typography>
          <Typography variant={"h2"} className="mt-1">
            Профиль
          </Typography>
          <Typography variant={"body"} className="mt-1 text-text-secondary">
            {user?.email ?? "—"}
          </Typography>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-danger transition-colors hover:bg-danger/5"
        >
          <LogOut size={16} />
          Выйти
        </button>
      </div>

      <Card className="mb-4 rounded-2xl border border-border bg-surface p-4 shadow-sm">
        <Typography variant={"body"} className="mb-3 font-semibold">
          Параметры тела
        </Typography>

        <div className="mb-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            className={`h-11 rounded-lg border text-sm font-medium transition-all ${form.sex === "man" ? "border-primary bg-primary/5 text-primary ring-2 ring-primary/10" : "border-border text-text-secondary"}`}
            onClick={() => setForm({ ...form, sex: "man" })}
          >
            Мужской
          </button>
          <button
            type="button"
            className={`h-11 rounded-lg border text-sm font-medium transition-all ${form.sex === "woman" ? "border-primary bg-primary/5 text-primary ring-2 ring-primary/10" : "border-border text-text-secondary"}`}
            onClick={() => setForm({ ...form, sex: "woman" })}
          >
            Женский
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <Input
            type="number"
            placeholder="Рост, см"
            value={form.height}
            onChange={(e) => setForm({ ...form, height: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Вес, кг"
            value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Возраст"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
        </div>
      </Card>

      <Card className="mb-4 rounded-2xl border border-border bg-surface p-4 shadow-sm">
        <Typography variant={"body"} className="mb-3 font-semibold">
          Цель
        </Typography>
        <div className="mb-4 flex flex-col gap-2">
          {TARGETS.map((item) => (
            <button
              key={item.value}
              type="button"
              className={`h-11 rounded-lg border px-4 text-left text-sm font-medium transition-all ${form.target === item.value ? "border-primary bg-primary/5 text-primary ring-2 ring-primary/10" : "border-border"}`}
              onClick={() => setForm({ ...form, target: item.value })}
            >
              {item.label}
            </button>
          ))}
        </div>

        <Typography variant={"body"} className="mb-3 font-semibold">
          Активность
        </Typography>
        <div className="flex flex-col gap-2">
          {ACTIVITIES.map((item) => (
            <button
              key={item.value}
              type="button"
              className={`h-11 rounded-lg border px-4 text-left text-sm font-medium transition-all ${form.activity === item.value ? "border-primary bg-primary/5 text-primary ring-2 ring-primary/10" : "border-border"}`}
              onClick={() => setForm({ ...form, activity: item.value })}
            >
              {item.label}
            </button>
          ))}
        </div>
      </Card>

      <Card className="mb-4 rounded-2xl border border-border bg-surface p-4 shadow-sm">
        <Typography variant={"body"} className="mb-3 font-semibold">
          Дневные нормы
        </Typography>
        <div className="mb-4 flex justify-between gap-2 text-center">
          <Metric label="Ккал" value={goals.calories} />
          <Metric label="Белки" value={goals.protein} />
          <Metric label="Жиры" value={goals.fat} />
          <Metric label="Углев." value={goals.carbs} />
        </div>

        <Typography variant={"body"} className="mb-2 font-semibold">
          Цель по воде, мл
        </Typography>
        <Input
          type="number"
          placeholder="2500"
          value={form.waterMl}
          onChange={(e) => setForm({ ...form, waterMl: e.target.value })}
        />
        <Typography variant={"caption"} className="mt-2 block">
          После сохранения БЖУ пересчитаются по формуле Mifflin–St Jeor
        </Typography>
      </Card>

      <div className="mb-4">
        <Button variant="primary" onClick={handleSave}>
          Сохранить изменения
        </Button>
        {error && (
          <Typography variant={"body"} className="mt-2 text-sm text-danger">
            {error}
          </Typography>
        )}
        {saved && (
          <Typography variant={"body"} className="mt-2 text-sm text-success">
            Сохранено
          </Typography>
        )}
      </div>

      <Card className="mb-4 rounded-2xl border border-border bg-surface p-4 shadow-sm">
        <Typography variant={"body"} className="mb-3 font-semibold">
          Мои продукты
        </Typography>
        {(customProducts ?? []).length === 0 ? (
          <Typography variant={"body"} className="text-text-secondary">
            Пока нет своих продуктов
          </Typography>
        ) : (
          <div className="flex flex-col gap-2">
            {(customProducts ?? []).map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-3 border-b border-border py-2 last:border-0"
              >
                <div className="min-w-0">
                  <Typography variant={"body"} className="truncate font-medium">
                    {product.title}
                  </Typography>
                  <Typography variant={"caption"}>
                    {product.calories} ккал / 100 г
                  </Typography>
                </div>
                <button
                  type="button"
                  className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-danger/5 hover:text-danger"
                  onClick={() => product.id && handleDeleteProduct(product.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </Container>
  );
};

const Metric = ({ label, value }: { label: string; value: number }) => (
  <div className="min-w-0 flex-1">
    <Typography variant={"caption"} className="block">
      {label}
    </Typography>
    <Typography variant={"h3"} className="mt-1 tabular-nums">
      {value}
    </Typography>
  </div>
);
