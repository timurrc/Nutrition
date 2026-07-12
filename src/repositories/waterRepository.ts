import { db, WaterEntry } from "../db/db";
import { getDayRange } from "../utils/dateRange";

export const WaterRepository = {
  create(waterEntry: WaterEntry) {
    return db.waterEntry.add(waterEntry);
  },

  get(id: number) {
    return db.waterEntry.get(id);
  },

  getByDate(userId: number, date: Date) {
    const { start, end } = getDayRange(date);
    return db.waterEntry
      .where("createdAt")
      .between(start, end)
      .filter((entry) => entry.userId === userId)
      .toArray();
  },

  async getTotalByDate(userId: number, date: Date): Promise<number> {
    const entries = await WaterRepository.getByDate(userId, date);
    return entries.reduce((sum, entry) => sum + entry.amount, 0);
  },
};
