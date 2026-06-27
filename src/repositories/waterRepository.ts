import { db, WaterEntry } from "../db/db";

export const WaterRepository = {
  create(waterEntry: WaterEntry) {
    return db.waterEntry.add(waterEntry);
  },
  get(id: string) {
    return db.waterEntry.get(id);
  },
};
