import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from 'src/common/constants/roles.enum';
import { ROLE_DECORATOR_KEY } from 'src/common/decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<string[]>(
      ROLE_DECORATOR_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();

    /**
     * If Admin, then Allow By Default
     */
    if (request?.role === Roles.ADMIN) {
      return true;
    }

    /**
     * If Route is not allowed for that role
     */
    if (!roles?.includes(request?.user?.role)) {
      return false;
    }

    return request;
  }
}
