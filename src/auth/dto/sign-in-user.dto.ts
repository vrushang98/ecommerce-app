import {
  IsAlphanumeric,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class SignInUserDTO {
  @IsString()
  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  emailAddress: string;

  @IsString()
  @IsAlphanumeric()
  @IsDefined()
  @IsNotEmpty()
  password: string;
}
