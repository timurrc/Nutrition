import { db, CustomProduct } from "../db/db";

export const CustomProductRepository = {
  create(product: Omit<CustomProduct, "id">) {
    return db.customProducts.add(product);
  },

  getByUserId(userId: number) {
    return db.customProducts.where("userId").equals(userId).toArray();
  },

  delete(id: number) {
    return db.customProducts.delete(id);
  },
};
