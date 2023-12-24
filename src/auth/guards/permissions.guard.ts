import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PERMISSION_DECORATOR_KEY } from 'src/common/decorators/permission.decorator';
import { Permissions } from 'src/common/constants/permissions.enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const permission = this.reflector.getAllAndOverride<string>(
      PERMISSION_DECORATOR_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();

    /**
     * If Contails ALL Permission, then Allow By Default
     */
    if (request?.user?.permissions?.includes(Permissions.ALL)) {
      return true;
    }

    /**
     * If Matching Permission Not Found
     */
    const isAnyPermissionNotIncluded =
      !request?.user?.permissions?.includes(permission);

    if (isAnyPermissionNotIncluded) {
      return false;
    }

    return request;
  }
}
