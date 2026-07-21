import { Typography } from "../../ui/Typography";

type GramSliderProps = {
  grams: number;
  onChange: (grams: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

export const GramSlider = ({
  grams,
  onChange,
  min = 10,
  max = 500,
  step = 5,
}: GramSliderProps) => {
  const progress = ((grams - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Typography variant={"body"}>Граммовка</Typography>
        <Typography variant={"body"} className="font-semibold tabular-nums">
          {grams} г
        </Typography>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={grams}
        onChange={(e) => onChange(Number(e.target.value))}
        className="gram-slider h-2 w-full cursor-pointer appearance-none rounded-full bg-surface-secondary outline-none"
        style={{
          background: `linear-gradient(to right, var(--color-primary) ${progress}%, var(--color-surface-secondary) ${progress}%)`,
        }}
      />

      <div className="flex justify-between">
        <Typography variant={"caption"}>{min} г</Typography>
        <Typography variant={"caption"}>{max} г</Typography>
      </div>
    </div>
  );
};
