import { IsEmail, IsNotEmpty, IsString, Length} from "class-validator"
export class LoginDto {
@IsEmail()
@IsNotEmpty()
email: string
@IsString()

password: string
}