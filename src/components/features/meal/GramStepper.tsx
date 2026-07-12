import { Minus, Plus } from "lucide-react";
import { Typography } from "../../ui/Typography";

type GramStepperProps = {
  grams: number;
  onChange: (grams: number) => void;
  step?: number;
  min?: number;
};

export const GramStepper = ({
  grams,
  onChange,
  step = 10,
  min = 1,
}: GramStepperProps) => {
  const decrement = () => onChange(Math.max(min, grams - step));
  const increment = () => onChange(grams + step);

  return (
    <div className="flex flex-col gap-2">
      <Typography variant={"body"}>Граммовка</Typography>
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full bg-surface-secondary transition-colors hover:bg-border"
          onClick={decrement}
        >
          <Minus size={18} />
        </button>
        <input
          type="number"
          min={min}
          value={grams}
          onChange={(e) => {
            const next = Number(e.target.value);
            if (Number.isFinite(next) && next >= min) {
              onChange(Math.round(next));
            }
          }}
          className="h-11 w-24 rounded-lg border border-border bg-surface text-center outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
        />
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full bg-surface-secondary transition-colors hover:bg-border"
          onClick={increment}
        >
          <Plus size={18} />
        </button>
        <Typography variant={"body"} className="text-text-secondary">
          г
        </Typography>
      </div>
    </div>
  );
};
