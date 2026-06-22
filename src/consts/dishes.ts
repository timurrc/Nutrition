import cottageCheese from "../assets/dishes/cottageCheese.png";
import greekYogurt from "../assets/dishes/greekYogurt.png";
import rawChicken from "../assets/dishes/rawChicken.png";
import oatmeal from "../assets/dishes/oatmeal.png";
import bread from "../assets/dishes/bread.png";
import whiteRice from "../assets/dishes/whiteRice.png";
import grecha from "../assets/dishes/grecha.png";
import eggs from "../assets/dishes/eggs.png";
import protein from "../assets/dishes/protein.png";

export interface Food {
  id: number;
  image: string;
  title: string;
  protein: number;
  fat: number;
  carbs: number;
  calories: number;
  per: number;
}

export const foods: Food[] = [
  {
    id: 1,
    image: cottageCheese,
    title: "Творог 5%",
    protein: 16,
    fat: 5,
    carbs: 3,
    calories: 121,
    per: 100,
  },
  {
    id: 2,
    image: greekYogurt,
    title: "Греческий йогурт 2%",
    protein: 8,
    fat: 2,
    carbs: 5,
    calories: 68,
    per: 100,
  },
  {
    id: 3,
    image: rawChicken,
    title: "Куриная грудка",
    protein: 23,
    fat: 1.5,
    carbs: 0,
    calories: 110,
    per: 100,
  },
  // {
  //   id: 4,
  //   image: ,
  //   title: "Филе бедра куриного",
  //   protein: 18,
  //   fat: 8,
  //   carbs: 0,
  //   calories: 150,
  //   per: 100,
  // },
  {
    id: 4,
    image: bread,
    title: "Хлеб цельнозерновой",
    protein: 8,
    fat: 2,
    carbs: 45,
    calories: 230,
    per: 100,
  },
  {
    id: 5,
    image: oatmeal,
    title: "Овсянка (сухая)",
    protein: 12,
    fat: 6,
    carbs: 65,
    calories: 370,
    per: 100,
  },
  {
    id: 6,
    image: whiteRice,
    title: "Рис варёный",
    protein: 2.7,
    fat: 0.3,
    carbs: 28,
    calories: 130,
    per: 100,
  },
  {
    id: 7,
    image: grecha,
    title: "Гречка варёная",
    protein: 3.4,
    fat: 0.6,
    carbs: 19,
    calories: 92,
    per: 100,
  },
  {
    id: 8,
    image: eggs,
    title: "Яйцо куриное",
    protein: 13,
    fat: 11,
    carbs: 1,
    calories: 155,
    per: 100,
  },
  // {
  //   id: 10,
  //   image: ,
  //   title: "Тунец в собственном соку",
  //   protein: 25,
  //   fat: 1,
  //   carbs: 0,
  //   calories: 100,
  //   per: 100,
  // },
  // {
  //   id: 11,
  //   image: ,
  //   title: "Банан",
  //   protein: 1.1,
  //   fat: 0.3,
  //   carbs: 23,
  //   calories: 90,
  //   per: 100,
  // },
  {
    id: 12,
    image: protein,
    title: "Сывороточный протеин",
    protein: 75,
    fat: 3,
    carbs: 7,
    calories: 370,
    per: 100,
  },
];
