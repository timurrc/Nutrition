import { db, OnBoarding } from "../db/db";

export const OnBoardingRepository = {
  create(onBoarding: OnBoarding) {
    return db.onBoarding.add(onBoarding);
  },
  get(id: number) {
    const start = new Date();
    const end = new Date();
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    return db.onBoarding
      .where("createdAt")
      .between(start, end)
      .filter((onBoarding) => onBoarding.userId === id).toArray;
  },
  update(id: number, onBoarding: Partial<OnBoarding>) {
    return db.onBoarding.update(id, onBoarding);
  },
};
