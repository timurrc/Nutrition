import { db, OnBoarding } from "../db/db";

export const OnBoardingRepository = {
  create(onBoarding: OnBoarding) {
    return db.onBoarding.add(onBoarding);
  },
  get(id: number) {
    return db.onBoarding.get(id);
  },
  update(id: number, onBoarding: Partial<OnBoarding>) {
    return db.onBoarding.update(id, onBoarding);
  },
};
