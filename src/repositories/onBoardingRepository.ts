import { db, OnBoarding } from "../db/db";

export const OnBoardingRepository = {
  create(onBoarding: OnBoarding) {
    return db.onBoarding.add(onBoarding);
  },

  findByUserId(userId: number) {
    return db.onBoarding.where("userId").equals(userId).first();
  },

  update(id: number, onBoarding: Partial<OnBoarding>) {
    return db.onBoarding.update(id, onBoarding);
  },

  async upsert(userId: number, onBoarding: Omit<OnBoarding, "id">) {
    const existing = await OnBoardingRepository.findByUserId(userId);

    if (existing?.id) {
      await OnBoardingRepository.update(existing.id, { ...onBoarding, userId });
      return existing.id;
    }

    return OnBoardingRepository.create({ ...onBoarding, userId });
  },
};
