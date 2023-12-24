import { SetMetadata } from '@nestjs/common';

export const PERMISSION_DECORATOR_KEY = 'permission';

export const PermissionDecorator = (data: string) =>
  SetMetadata(PERMISSION_DECORATOR_KEY, data);
