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

  getInRange(userId: number, from: Date, to: Date) {
    const start = new Date(from);
    const end = new Date(to);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    return db.waterEntry
      .where("createdAt")
      .between(start.getTime(), end.getTime())
      .filter((entry) => entry.userId === userId)
      .toArray();
  },

  async getDailyTotalsMap(
    userId: number,
    from: Date,
    to: Date,
  ): Promise<Map<string, number>> {
    const entries = await WaterRepository.getInRange(userId, from, to);
    const map = new Map<string, number>();

    for (const entry of entries) {
      const key = new Date(entry.createdAt).toDateString();
      map.set(key, (map.get(key) ?? 0) + entry.amount);
    }

    return map;
  },
};
