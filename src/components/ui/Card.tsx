import { Star } from "lucide-react";
import { FC } from "react";

// type cardVariant = "modified" | "add" | "recent" | "base" | "change";

interface ICard {
  children?: React.ReactNode;
  classname: string;
  //   variant: cardVariant;
  //   onClick: () => void;
  //   title: string;
  //   description: string;
  //   protein: string;
  //   carbs: string;
  //   fat: string;
  //   calories: number;
}

export const Card: FC<ICard> = ({
  children,
  classname,
  //   variant,
  //   onClick,
  //   title,
  //   description,
  //   protein,
  //   carbs,
  //   fat,
  //   calories,
}) => {
  //   const renderCard = (currentStatus: any) => {
  //     switch (currentStatus) {
  //       case variant == "modified":
  //         return <div>{children}</div>;
  //       //   case variant == "add":
  //       //     return (
  //       //       <div className="py-2 px-4 rounded-2xl">
  //       //         <div className="flex items-top gap-2">
  //       //           <img src="" className="rounded-2xl w-6" alt="" />
  //       //           <div className="flex flex-col items-start">
  //       //             <b>{title}</b>
  //       //             <p>{description}</p>
  //       //           </div>
  //       //           <Star width={2} className="justify-end" />
  //       //         </div>
  //       //         <div className="flex justify-between gap-2">
  //       //           <div className="flex flex-col gap-1 items-center">
  //       //             <p>Белки</p>
  //       //             <p>{protein} г</p>
  //       //           </div>
  //       //           <div className="flex flex-col gap-1 items-center">
  //       //             <p>Жиры</p>
  //       //             <p>{fat} г</p>
  //       //           </div>
  //       //           <div className="flex flex-col gap-1 items-center">
  //       //             <p>Углеводы </p>
  //       //             <p>{carbs} г</p>
  //       //           </div>
  //       //           <div className="flex flex-col gap-1 items-center">
  //       //             <p>Каллории</p>
  //       //             <p>{calories} ккал</p>
  //       //           </div>
  //       //         </div>
  //       //         <div></div>
  //       //         <div></div>
  //       //         <div></div>
  //       //       </div>
  //       //     );
  //       //   case variant == "recent":
  //       //     return <div></div>;
  //       default:
  //         return null;
  //     }
  //   };
  return (
    // <div className="rounded-2xl w-full flex flex-col gap-0 px-3 py-3 bg-[#161B22] items-center">
    <div className={`${classname}`}>{children}</div>
  );
};
