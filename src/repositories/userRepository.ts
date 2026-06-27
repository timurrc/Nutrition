import { db, User } from "../db/db";

export const UserRepository = {
  create(user: User) {
    return db.users.add(user);
  },
  async findByEmail(email: string) {
    return db.users.where("email").equalsIgnoreCase(email).first();
  },
  get(id: string) {
    return db.users.get(id);
  },
  update(id: string, user: Partial<User>) {
    return db.users.update(id, user);
  },

  delete(id: string) {
    return db.users.delete(id);
  },
};
