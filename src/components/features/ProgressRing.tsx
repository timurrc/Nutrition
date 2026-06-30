import { FC } from "react";

export type ProgressRingColor = "protein" | "carbs" | "fat" | "calories";
export type ProgressRingVariant = "big" | "normal";
interface IProgressRing {
  size?: number;
  strokeWidth?: number;
  progress: number;
  color: ProgressRingColor;
  variant: ProgressRingVariant;
}

const COLOR_MAP: Record<ProgressRingColor, string> = {
  protein: "#67E8A5",
  carbs: "#A78BFA",
  fat: "#FFB84D",
  calories: "#2ecc71",
};

const SIZE_MAP: Record<ProgressRingVariant, number> = {
  big: 250,
  normal: 80,
};
const STROKE_MAP: Record<ProgressRingVariant, number> = {
  big: 11,
  normal: 8,
};
export const ProgressRing: FC<IProgressRing> = ({
  size,
  strokeWidth,
  progress,
  color,
  variant,
}) => {
  const currentSize = size ?? SIZE_MAP[variant];
  const currentStrokeWidth = strokeWidth ?? STROKE_MAP[variant];
  const center = currentSize / 2;
  const radius = (currentSize - currentStrokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      style={{
        position: "relative",
        width: currentSize,
        height: currentSize,
        marginTop: "6px",
      }}
    >
      <svg width={currentSize} height={currentSize}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#eef2ef"
          strokeWidth={currentStrokeWidth}
          fill="none"
        />

        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={COLOR_MAP[color]}
          strokeWidth={currentStrokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
          style={{ transition: "stroke-dashoffset 0.5s ease 0s" }}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",

          color: "#f4f7f7",
          transform: "translate(-50%, -50%)",
        }}
      >
        {variant === "normal" ? (
          <p className="text-text">{progress}%</p>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-text ">Съедено</p>
            <h1 className="text-4xl text-text font-semibold ">1650</h1>
            <p className="text-gray-400 mb-1">/ 1950 ккал</p>
            <p className="text-gray-400">Осталось</p>
            <p className="text-[#2ecc71]">400</p>
          </div>
        )}
      </div>
    </div>
  );
};
