import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length} from "class-validator";
export class RegisterUserDto {

@IsString()
@ApiProperty()
@Length(2,20)
name: string
@IsString()
@ApiProperty()
@Length (2,20)
password: string
@ApiProperty()
@IsEmail()
email: string
}