import { userRepository } from "@cashflow-ai/db";
import { redisCache } from "./cache.service";
import { USER_TTL, userRedisKey } from "../utils/constants";

class UserService {
  async getOrCreateUser(name: string, phone: string, nationality = "IN") {
    try {
      const userKey = userRedisKey(phone);
      const cached = await redisCache.get(userKey);

      if (cached) {
        return JSON.parse(cached);
      }

      const user = await userRepository.findByPhone(phone);

      if (user) {
        await redisCache.set(
          userKey,
          JSON.stringify({ id: user.id, name: user.name, currency: user.currency }),
          "EX",
          USER_TTL
        );
      }

      const createdUser = await userRepository.create({ name, phone, currency: "INR" });

      await redisCache.set(
        userKey,
        JSON.stringify({
          id: createdUser.id,
          name: createdUser.name,
          currency: createdUser.currency,
        }),
        "EX",
        USER_TTL
      );

      return { id: createdUser.id, name: createdUser.name, currency: createdUser.currency };
    } catch (error) {
      console.log("Something went wrong while getOrCreateUser", { name, phone }, error);
    }
  }
}

export const userService = new UserService();
