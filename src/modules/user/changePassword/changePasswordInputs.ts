import { InputType, Field } from "type-graphql";
import { PasswordMixin } from "../../shared/PasswordInput";

@InputType()
export class ChangePasswordInputs extends PasswordMixin(class {}) {
    @Field()
    token: string
}
