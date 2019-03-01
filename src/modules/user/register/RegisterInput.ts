import { InputType, Field } from "type-graphql";
import { Length, IsEmail } from "class-validator";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExist";
import { PasswordMixin } from "../../shared/PasswordInput";

@InputType()
export class RegisterInputs extends PasswordMixin(class {}) {

    @Field()
    @Length(1, 30)
    firstname: string

    @Field() 
    @Length(1, 30)
    lastname: string
    
    @Field() 
    @IsEmail()
    @IsEmailAlreadyExist({ message: "Email already in use!"})
    email: string
}
