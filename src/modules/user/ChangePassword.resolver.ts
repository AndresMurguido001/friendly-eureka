
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import { redis } from "../../redis";
import bcrypt from 'bcryptjs'
import { forgotPasswordPrefix } from "../constants/redisPrefixes";
import { ChangePasswordInputs } from "./changePassword/changePasswordInputs";
import { MyContext } from "src/types/MyContext";

@Resolver(User)
export class ChangePasswordresolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
     @Arg("data") { token, password}: ChangePasswordInputs,
     @Ctx() ctx: MyContext
  ): Promise<User | null > {
      const userId = await redis.get(forgotPasswordPrefix + token)

      if (!userId) {
          return null
      }

      await redis.del(forgotPasswordPrefix + token)

      const user = await User.findOne(userId)

      if (!user) {
          return null
      }
      
      user.password = await bcrypt.hash(password, 10)
      await user.save()
      ctx.req.session!.userId = user.id;
      return user
    }
}