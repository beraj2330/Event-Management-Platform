import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from './auth/roles.guard';
import { SetMetadata } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('admin')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['admin']) // Only accessible to admin users
  getAdminData() {
    return { message: 'This is admin-only data.' };
  }
}
