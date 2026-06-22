import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";
import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Plus,
} from "lucide-react";
import oatmeal from "../assets/dishes/oatmeal.png";
export const Log = () => {
  return (
    <Container>
      <div className="flex justify-between w-full bg-[#161B22] rounded-lg px-4 py-3 mb-4">
        <ChevronLeft />
        <h2 className="text-xl">Сегодня</h2>
        <ChevronRight />
      </div>

      <Card className="bg-[#161B22] rounded-xl px-4 py-3">
        <div className="w-full flex justify-between mb-4">
          <b>Завтрак</b>
          <p className="text-gray-500">450 ккал</p>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <img src={oatmeal} width={54} height={54} alt="" />
              <div className="flex flex-col">
                <p>Овсянка</p>
                <p>100г· 165 ккал</p>
              </div>
            </div>
            <EllipsisVertical />
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <img src={oatmeal} width={54} height={54} alt="" />
              <div className="flex flex-col">
                <p>Овсянка</p>
                <p>100г· 165 ккал</p>
              </div>
            </div>
            <EllipsisVertical />
          </div>
        </div>
        <div className="flex items-center">
          <Plus />
          <p>Добавить продукт</p>
        </div>
      </Card>
    </Container>
    // <div className="fixed bottom-30 bg-[#161B22] w-full rounded-2xl">
    //   <div className="flex justify-between gap-2 px-4">
    //     <div className="flex flex-col items-center">
    //       <p>Каллории</p>
    //       <p>330/ 1900</p>
    //     </div>
    //     <div className="flex flex-col items-center">
    //       <p>Каллории</p>
    //       <p>330/ 1900</p>
    //     </div>
    //     <div className="flex flex-col items-center">
    //       <p>Каллории</p>
    //       <p>330/ 1900</p>
    //     </div>
    //     <div className="flex flex-col items-center">
    //       <p>Каллории</p>
    //       <p>330/ 1900</p>
    //     </div>
    //   </div>
    // </div>
  );
};
