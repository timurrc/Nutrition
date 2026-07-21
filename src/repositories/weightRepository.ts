import { db, WeightEntry } from "../db/db";

export const WeightRepository = {
  create(entry: Omit<WeightEntry, "id">) {
    return db.weightEntries.add(entry);
  },

  getByUserId(userId: number) {
    return db.weightEntries.where("userId").equals(userId).sortBy("createdAt");
  },

  async getLatest(userId: number) {
    const entries = await WeightRepository.getByUserId(userId);
    return entries[entries.length - 1] ?? null;
  },
};
