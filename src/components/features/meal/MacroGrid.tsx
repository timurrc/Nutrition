import { Typography } from "../../ui/Typography";

type MacroGridProps = {
  protein: number;
  fat: number;
  carbs: number;
  calories: number;
};

export const MacroGrid = ({
  protein,
  fat,
  carbs,
  calories,
}: MacroGridProps) => (
  <div className="flex items-center justify-between gap-2">
    <div className="flex flex-col text-center">
      <Typography variant={"body"} className="text-sm text-text-secondary">
        Белки
      </Typography>
      <Typography variant={"body"} className="font-semibold text-protein">
        {protein}
      </Typography>
    </div>
    <div className="flex flex-col text-center">
      <Typography variant={"body"} className="text-sm text-text-secondary">
        Жиры
      </Typography>
      <Typography variant={"body"} className="font-semibold text-fat">
        {fat}
      </Typography>
    </div>
    <div className="flex flex-col text-center">
      <Typography variant={"body"} className="text-sm text-text-secondary">
        Углеводы
      </Typography>
      <Typography variant={"body"} className="font-semibold text-carbs">
        {carbs}
      </Typography>
    </div>
    <div className="flex flex-col text-center">
      <Typography variant={"body"} className="text-sm text-text-secondary">
        Калории
      </Typography>
      <Typography variant={"body"} className="font-semibold text-primary">
        {calories}
      </Typography>
    </div>
  </div>
);
