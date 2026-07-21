import { WeightEntry } from "../../../db/db";
import { Typography } from "../../ui/Typography";

type WeightChartProps = {
  entries: WeightEntry[];
};

export const WeightChart = ({ entries }: WeightChartProps) => {
  if (entries.length === 0) {
    return (
      <div className="flex h-44 items-center justify-center rounded-xl bg-surface-secondary">
        <Typography variant={"body"} className="text-center text-text-secondary">
          Добавьте первый вес — появится график
        </Typography>
      </div>
    );
  }

  const values = entries.map((item) => item.weight);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(max - min, 1);
  const pad = span * 0.15 || 0.5;
  const yMin = min - pad;
  const yMax = max + pad;

  const width = 320;
  const height = 160;
  const left = 36;
  const right = 12;
  const top = 16;
  const bottom = 28;
  const chartW = width - left - right;
  const chartH = height - top - bottom;

  const points = entries.map((entry, index) => {
    const x =
      entries.length === 1
        ? left + chartW / 2
        : left + (index / (entries.length - 1)) * chartW;
    const y = top + ((yMax - entry.weight) / (yMax - yMin)) * chartH;
    return { x, y, entry };
  });

  const line = points.map((p) => `${p.x},${p.y}`).join(" ");
  const area =
    `${points[0].x},${top + chartH} ` +
    line +
    ` ${points[points.length - 1].x},${top + chartH}`;

  const first = entries[0];
  const last = entries[entries.length - 1];
  const delta = last.weight - first.weight;

  return (
    <div>
      <div className="mb-3 flex items-end justify-between">
        <div>
          <Typography variant={"caption"}>Текущий вес</Typography>
          <Typography variant={"h2"} className="leading-none">
            {last.weight.toFixed(1)} кг
          </Typography>
        </div>
        <Typography
          variant={"body"}
          className={`text-sm font-medium ${delta > 0 ? "text-warning" : delta < 0 ? "text-success" : "text-text-secondary"}`}
        >
          {delta > 0 ? "+" : ""}
          {delta.toFixed(1)} кг
        </Typography>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full">
        <defs>
          <linearGradient id="weightFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1677ff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1677ff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 0.5, 1].map((ratio) => {
          const y = top + chartH * ratio;
          const label = (yMax - (yMax - yMin) * ratio).toFixed(1);
          return (
            <g key={ratio}>
              <line
                x1={left}
                x2={width - right}
                y1={y}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              <text
                x={left - 6}
                y={y + 3}
                textAnchor="end"
                fontSize="9"
                fill="#9ca3af"
              >
                {label}
              </text>
            </g>
          );
        })}

        <polygon points={area} fill="url(#weightFill)" />
        <polyline
          points={line}
          fill="none"
          stroke="#1677ff"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {points.map((point) => (
          <circle
            key={point.entry.id ?? point.entry.createdAt}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#ffffff"
            stroke="#1677ff"
            strokeWidth="2"
          />
        ))}

        <text
          x={left}
          y={height - 8}
          fontSize="10"
          fill="#9ca3af"
        >
          {new Date(first.createdAt).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "short",
          })}
        </text>
        <text
          x={width - right}
          y={height - 8}
          textAnchor="end"
          fontSize="10"
          fill="#9ca3af"
        >
          {new Date(last.createdAt).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "short",
          })}
        </text>
      </svg>
    </div>
  );
};
