import { Plus } from "lucide-react";
import { ProgressRing } from "../components/features/ProgressRing";
import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";

export const Dashboard = () => {
  return (
    <Container>
      <div className="flex flex-col w-full">
        <h2 className=" items-start text-lg">Сегодня</h2>
        <div className="flex justify-center items-center">
          <ProgressRing progress={42} color={"calories"} variant={"big"} />
        </div>
      </div>
      <div className="flex justify-between gap-2 mt-5">
        <Card
          className={
            "flex flex-col rounded-xl bg-[#161B22] gap-1 w-full items-center py-4"
          }
        >
          <b>Белки</b>
          <p>120/180</p>
          <ProgressRing
            progress={34}
            color={"protein"}
            variant={"normal"}
          ></ProgressRing>
        </Card>
        <Card
          className={
            "flex flex-col rounded-xl bg-[#161B22] gap-1 w-full items-center py-4"
          }
        >
          <b>Жиры</b>
          <p>120/180</p>
          <ProgressRing
            progress={34}
            color={"fat"}
            variant={"normal"}
          ></ProgressRing>
        </Card>
        <Card
          className={
            "flex flex-col rounded-xl bg-[#161B22] gap-1 w-full items-center py-4 px-2"
          }
        >
          <b>Углеводы</b>
          <p>120/180</p>
          <ProgressRing
            progress={34}
            color={"carbs"}
            variant={"normal"}
          ></ProgressRing>
        </Card>
      </div>
      <div>
        <Card className="flex justify-between w-full items-center bg-[#161B22] mt-5 rounded-xl py-4 px-4">
          <div className="flex flex-col gap-2 items-start">
            <b>Вода</b>
            <div className="flex items-center">
              <b>3.2 </b> <p className="text-gray-500 ml-2"> / 4,5 л</p>
            </div>
          </div>
          <div
            className="bg-[#1C2128] p-2 rounded-full"
            onClick={() => console.log("12")}
          >
            <Plus />
          </div>
        </Card>
      </div>
    </Container>
  );
};
