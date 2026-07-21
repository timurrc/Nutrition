import { HeatmapDay, startOfDay } from "../../../utils/statsHelpers";
import { Typography } from "../../ui/Typography";

type CalorieHeatmapProps = {
  days: HeatmapDay[];
  weeks: number;
};

const LEVEL_CLASS: Record<HeatmapDay["level"], string> = {
  none: "bg-[#ebedf0]",
  partial: "bg-warning",
  done: "bg-success",
};

const WEEKDAY_LABELS = ["Пн", "", "Ср", "", "Пт", "", ""];

export const CalorieHeatmap = ({ days, weeks }: CalorieHeatmapProps) => {
  const columns = Array.from({ length: weeks }, (_, weekIndex) =>
    days.slice(weekIndex * 7, weekIndex * 7 + 7),
  );

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <Typography variant={"body"} className="font-semibold">
          Активность по калориям
        </Typography>
        <Typography variant={"caption"}>последние {weeks} нед.</Typography>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-flex gap-1">
          <div className="mr-1 flex flex-col gap-1 pt-0">
            {WEEKDAY_LABELS.map((label, index) => (
              <div
                key={index}
                className="flex h-3 w-4 items-center text-[9px] text-text-secondary"
              >
                {label}
              </div>
            ))}
          </div>

          {columns.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day) => {
                const today = startOfDay(new Date());
                const isFuture = day.date.getTime() > today.getTime();
                return (
                  <div
                    key={day.key}
                    title={`${day.date.toLocaleDateString("ru-RU")}: ${
                      day.calories > 0
                        ? `${day.calories} ккал (${day.progress}%)`
                        : "нет записи"
                    }`}
                    className={`size-3 rounded-[3px] ${
                      isFuture ? "bg-transparent" : LEVEL_CLASS[day.level]
                    }`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Legend swatch="bg-[#ebedf0]" label="Нет / <50%" />
        <Legend swatch="bg-warning" label="Частично" />
        <Legend swatch="bg-success" label="Цель" />
      </div>
    </div>
  );
};

const Legend = ({ swatch, label }: { swatch: string; label: string }) => (
  <div className="flex items-center gap-1.5">
    <div className={`size-3 rounded-[3px] ${swatch}`} />
    <Typography variant={"caption"}>{label}</Typography>
  </div>
);
