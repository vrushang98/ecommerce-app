import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUserDTO } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { CreateRoleDTO } from './dto/create-role.dto';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up')
  async registerUser(@Body() dto: RegisterUserDTO) {
    const response = await this.authService.registerUser(dto);

    return response;
  }

  @Post('create-role')
  async addRole(@Body() dto: CreateRoleDTO) {
    const response = await this.authService.createRole(dto);

    return response;
  }
}
