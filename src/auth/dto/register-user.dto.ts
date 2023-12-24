import {
  IsAlphanumeric,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class RegisterUserDTO {
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

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  role: string;
}
