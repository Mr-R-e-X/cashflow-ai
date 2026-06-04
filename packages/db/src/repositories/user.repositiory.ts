import { db } from "../client";
import { users } from "../schema";
import { eq } from "drizzle-orm";

class UserRepository {
  async findByPhone(phone: string) {
    return db.query.users.findFirst({
      where: eq(users.phone, phone),
    });
  }
  async create({
    name,
    phone,
    currency = "INR",
  }: {
    name: string;
    phone: string;
    currency: string;
  }) {
    const [user] = await db.insert(users).values({ name, phone, currency }).returning();
    if (!user) {
      throw new Error("Somethig went wrong while creating new user.");
    }
    return user;
  }
}

export const userRepository = new UserRepository();
