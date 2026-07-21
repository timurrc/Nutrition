import { useEffect, useMemo, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Scale } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";
import { Typography } from "../components/ui/Typography";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { WeightChart } from "../components/features/stats/WeightChart";
import { CalorieHeatmap } from "../components/features/stats/CalorieHeatmap";
import { AverageMetrics } from "../components/features/stats/AverageMetrics";
import { getCurrentUserId } from "../utils/currentUser";
import { getDailyGoals } from "../utils/nutritionGoals";
import {
  addDays,
  buildHeatmapDays,
  calcPeriodAverages,
  startOfDay,
} from "../utils/statsHelpers";
import { OnBoardingRepository } from "../repositories/onBoardingRepository";
import { MealRepository } from "../repositories/mealRepository";
import { WaterRepository } from "../repositories/waterRepository";
import { WeightRepository } from "../repositories/weightRepository";

const HEATMAP_WEEKS = 12;
const AVERAGES_WEEKS = 4;

export const Stats = () => {
  const userId = getCurrentUserId();
  const [weightInput, setWeightInput] = useState("");
  const [error, setError] = useState("");

  const range = useMemo(() => {
    const end = startOfDay(new Date());
    const start = addDays(end, -(HEATMAP_WEEKS * 7 - 1));
    return { start, end, startMs: start.getTime(), endMs: end.getTime() };
  }, []);

  const onboarding = useLiveQuery(
    () =>
      userId !== null ? OnBoardingRepository.findByUserId(userId) : undefined,
    [userId],
  );

  const weightEntries = useLiveQuery(
    () => (userId !== null ? WeightRepository.getByUserId(userId) : []),
    [userId],
  );

  const mealTotals = useLiveQuery(
    () =>
      userId !== null
        ? MealRepository.getDailyTotalsMap(userId, range.start, range.end)
        : new Map(),
    [userId, range.startMs, range.endMs],
  );

  const waterTotals = useLiveQuery(
    () =>
      userId !== null
        ? WaterRepository.getDailyTotalsMap(userId, range.start, range.end)
        : new Map(),
    [userId, range.startMs, range.endMs],
  );

  useEffect(() => {
    if (userId === null || !onboarding || weightEntries === undefined) return;
    if (weightEntries.length > 0) return;

    WeightRepository.create({
      userId,
      weight: onboarding.weight,
      createdAt: Date.now(),
    });
  }, [userId, onboarding, weightEntries]);

  const goals = getDailyGoals(onboarding);

  const heatmapDays = useMemo(
    () =>
      buildHeatmapDays(
        HEATMAP_WEEKS,
        mealTotals ?? new Map(),
        goals.calories,
        range.end,
      ),
    [mealTotals, goals.calories, range.end],
  );

  const averages = useMemo(() => {
    const cutoff = addDays(range.end, -(AVERAGES_WEEKS * 7 - 1)).getTime();
    const meals = mealTotals ?? new Map();
    const water = waterTotals ?? new Map();

    const meals4w = new Map(
      [...meals.entries()].filter(([key]) => new Date(key).getTime() >= cutoff),
    );
    const water4w = new Map(
      [...water.entries()].filter(([key]) => new Date(key).getTime() >= cutoff),
    );

    return calcPeriodAverages(meals4w, water4w, goals.calories);
  }, [mealTotals, waterTotals, goals.calories, range.end]);

  const handleAddWeight = async () => {
    if (userId === null) return;

    setError("");
    const weight = Number(weightInput.replace(",", "."));

    if (!Number.isFinite(weight) || weight < 30 || weight > 300) {
      setError("Введите вес от 30 до 300 кг");
      return;
    }

    await WeightRepository.create({
      userId,
      weight,
      createdAt: Date.now(),
    });

    setWeightInput("");
  };

  if (userId === null) {
    return null;
  }

  return (
    <Container>
      <div className="mb-5">
        <Typography variant={"caption"} className="uppercase tracking-wide">
          Аналитика
        </Typography>
        <Typography variant={"h2"} className="mt-1">
          Статистика
        </Typography>
      </div>

      <Card className="mb-4 rounded-2xl border border-border bg-surface p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Scale size={18} />
          </div>
          <Typography variant={"body"} className="font-semibold">
            Динамика веса
          </Typography>
        </div>

        <WeightChart entries={weightEntries ?? []} />

        <div className="mt-4 flex flex-col gap-2">
          <Input
            type="number"
            placeholder="Вес, кг"
            value={weightInput}
            onChange={(e) => setWeightInput(e.target.value)}
          />
          <Button variant="primary" onClick={handleAddWeight}>
            Добавить вес
          </Button>
        </div>
        {error && (
          <Typography variant={"body"} className="mt-2 text-sm text-danger">
            {error}
          </Typography>
        )}
      </Card>

      <Card className="mb-4 rounded-2xl border border-border bg-surface p-4 shadow-sm">
        <CalorieHeatmap days={heatmapDays} weeks={HEATMAP_WEEKS} />
      </Card>

      <Card className="mb-4 rounded-2xl border border-border bg-surface p-4 shadow-sm">
        <AverageMetrics averages={averages} />
      </Card>
    </Container>
  );
};
