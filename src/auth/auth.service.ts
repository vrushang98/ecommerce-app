import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDTO } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateRoleDTO } from './dto/create-role.dto';
import { Role } from './entities/role.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async registerUser(dto: RegisterUserDTO) {
    try {
      const _user = await this.userRepository.findOne({
        where: {
          emailAddress: dto?.emailAddress,
        },
      });
      if (_user) {
        throw new ConflictException('User Already Exists');
      }

      const _hashedPassword = bcrypt.hash(dto.password, 10);

      //   const _createUser = await this.userRepository.create({
      //     emailAddress: dto.emailAddress,
      //     password: _hashedPassword,
      //     role: null,
      //   });

      //   return this.userRepository.save(_createUser);

      return 'success';
    } catch (error) {
      throw error;
    }
  }

  async createRole(dto: CreateRoleDTO) {
    try {
      const _role = await this.roleRepository.create(dto);

      return this.roleRepository.save(_role);
    } catch (error) {
      throw error;
    }
  }
}
