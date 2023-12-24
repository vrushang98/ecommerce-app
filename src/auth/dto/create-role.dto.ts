import { IsArray, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDTO {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  roleName: string;

  @IsArray()
  permissions: string[];
}
