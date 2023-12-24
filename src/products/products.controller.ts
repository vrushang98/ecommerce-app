import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { successResponse } from 'src/common/helpers/successResponse';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RoleDecorator } from 'src/common/decorators/role.decorator';
import { Roles } from 'src/common/constants/roles.enum';
import { PermissionDecorator } from 'src/common/decorators/permission.decorator';
import { Permissions } from 'src/common/constants/permissions.enum';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';

@Controller({ path: 'products', version: '1' })
@UseGuards(JWTGuard, RolesGuard, PermissionsGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  @RoleDecorator([Roles.ADMIN, Roles.CUSTOMER, Roles.SELLER, Roles.SUPPORTER])
  @PermissionDecorator(Permissions.FETCH)
  async getAllProducts() {
    const response = await this.productsService.getProducts();
    return successResponse(response);
  }

  @Post('/create-product')
  @RoleDecorator([Roles.ADMIN, Roles.CUSTOMER, Roles.SELLER, Roles.SUPPORTER])
  @PermissionDecorator(Permissions.CREATE)
  async createNewProducts() {
    return successResponse({}, HttpStatus.CREATED, 'Product Created');
  }

  @Put('/update-product/:productId')
  @RoleDecorator([Roles.ADMIN, Roles.CUSTOMER, Roles.SELLER, Roles.SUPPORTER])
  @PermissionDecorator(Permissions.UPDATE)
  async updateNewProducts(@Param('productId') productId: string) {
    return successResponse({}, HttpStatus.OK, `Product ${productId} Updated`);
  }

  @Delete('/edit-product/:productId')
  @RoleDecorator([Roles.ADMIN, Roles.CUSTOMER, Roles.SELLER, Roles.SUPPORTER])
  @PermissionDecorator(Permissions.DELETE)
  async deleteNewProducts(@Param('productId') productId: string) {
    return successResponse({}, HttpStatus.OK, `Product ${productId} Deleted`);
  }
}
