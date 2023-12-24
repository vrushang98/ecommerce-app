import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDTO } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from './entities/role.entity';
import { SignInUserDTO } from './dto/sign-in-user.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Register's User into the system
   * @param dto
   * @returns
   */
  async registerUser(dto: RegisterUserDTO) {
    try {
      /**
       * Find Existing User
       */
      const _user = await this.userRepository.findOne({
        where: {
          emailAddress: dto?.emailAddress,
        },
      });
      if (_user) {
        throw new ConflictException('User Already Exists');
      }

      /**
       * Find Existing Role
       */
      const _role = await this.roleRepository.findOne({
        where: { roleName: dto.role },
      });

      if (!_role) {
        throw new BadRequestException('Role does not exists at the moment');
      }

      /**
       * Hashing Password
       */
      const _hashedPassword = bcrypt.hashSync(dto.password, 10);

      /**
       * Creating User
       */
      const _createUser = await this.userRepository.create({
        emailAddress: dto.emailAddress,
        password: _hashedPassword,
        role: { id: _role.id },
      });

      return this.userRepository.save(_createUser);
    } catch (error) {
      throw error;
    }
  }

  async signInUser(dto: SignInUserDTO) {
    try {
      /**
       * Find Existing User
       */
      const _user = await this.userRepository.findOne({
        where: {
          emailAddress: dto?.emailAddress,
        },
        relations: {
          role: true,
        },
      });

      if (!_user) {
        throw new NotFoundException('User With This Email Not Found');
      }

      /**
       * Compare Password
       */
      const comparePassword = await _user.validatePassword(dto.password);
      if (!comparePassword) {
        throw new UnauthorizedException('Invalid Username/Password Provided');
      }

      /**
       * Generating Token
       */
      const _token = await this.jwtService.sign({
        id: _user.id,
        role: _user.role.roleName,
        permissions: _user.role.permissions,
      });

      return { accessToken: _token };
    } catch (error) {
      throw error;
    }
  }
}
