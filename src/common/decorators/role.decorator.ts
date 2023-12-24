import { SetMetadata } from '@nestjs/common';

export const ROLE_DECORATOR_KEY = 'role';

export const RoleDecorator = (data: any) =>
  SetMetadata(ROLE_DECORATOR_KEY, data);
