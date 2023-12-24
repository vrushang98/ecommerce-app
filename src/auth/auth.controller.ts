import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { RegisterUserDTO } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { successResponse } from 'src/common/helpers/successResponse';
import { SignInUserDTO } from './dto/sign-in-user.dto';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async registerUser(@Body() dto: RegisterUserDTO) {
    const response = await this.authService.registerUser(dto);

    return successResponse(response, HttpStatus.CREATED);
  }

  @Post('sign-in')
  async signInUser(@Body() dto: SignInUserDTO) {
    const response = await this.authService.signInUser(dto);

    return successResponse(response, HttpStatus.CREATED);
  }
}
