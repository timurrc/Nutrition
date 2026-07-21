import { PeriodAverages } from "../../../utils/statsHelpers";
import { Typography } from "../../ui/Typography";

type AverageMetricsProps = {
  averages: PeriodAverages;
};

export const AverageMetrics = ({ averages }: AverageMetricsProps) => {
  const items = [
    { label: "Калории", value: `${averages.calories}` },
    { label: "Белки", value: `${averages.protein}` },
    { label: "Жиры", value: `${averages.fat}` },
    { label: "Углеводы", value: `${averages.carbs}` },
    {
      label: "Вода",
      value: averages.waterMl > 0 ? (averages.waterMl / 1000).toFixed(1) : "0",
    },
  ];

  return (
    <div>
      <Typography variant={"body"} className="mb-4 font-semibold">
        За 4 недели
      </Typography>

      <div className="flex justify-between gap-2 overflow-x-auto">
        {items.map((item) => (
          <div key={item.label} className="min-w-0 flex-1 text-center">
            <Typography
              variant={"caption"}
              className="block text-text-secondary"
            >
              {item.label}
            </Typography>
            <Typography variant={"h3"} className="mt-1 tabular-nums">
              {item.value}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};
