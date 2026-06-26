import { db, User } from "../db/db";

export const UserRepository = {
  create(user: User) {
    return db.users.add(user);
  },
  get(id: number) {
    return db.users.get(id);
  },
  update(id: number, user: Partial<User>) {
    return db.users.update(id, user);
  },

  delete(id: number) {
    return db.users.delete(id);
  },
};
