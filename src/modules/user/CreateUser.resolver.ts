import { Resolver, Mutation, Arg, ClassType } from "type-graphql"
import { User } from "../../entity/User";
import { RegisterInputs } from "./register/RegisterInput";

function createResolver<T extends ClassType, X extends ClassType>(
    suffix: string,
    returnType: T,
    inputType: X,
    entity: any
    ) {
  @Resolver()
  class BaseResolver {
    @Mutation(() => returnType, { name: `create${suffix}`})
      async create(@Arg("data", () => inputType) data: any
      ){
          return entity.create(data).save()
      }
  }
  return BaseResolver;
}

export const CreateUserBaseResolver = createResolver("User", User, RegisterInputs, User);

