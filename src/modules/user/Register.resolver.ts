import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import bcrypt from 'bcryptjs'
import { User } from "../../entity/User";
import { RegisterInputs } from "./register/RegisterInput";
import { isAuth } from "../middleware/isAuth";
import { logger } from "../middleware/logger";
import { sendEmail } from "../utils/sendEmail";
import { createConfirmationUrl } from "../utils/createConfirmationUrl";

@Resolver(User)
export class RegisterResolver {
  @UseMiddleware(isAuth, logger)
  @Query(() => String)
  async hello() {
      return  "Hello World"
  }

  @Mutation(() => User)
  async register(
     @Arg("data") {email, firstname, lastname, password} :RegisterInputs
  ): Promise<User> {
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await User.create({firstname, lastname, email, password: hashedPassword}).save()
      await sendEmail(email, await createConfirmationUrl(user.id))
      return  user
  }
}