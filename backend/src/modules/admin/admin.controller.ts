import { Controller, Patch, Param, Body, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(AuthGuard('jwt'))
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Patch('business/:id/status')
  async changeBusinessStatus(
    @Param('id') businessId: string,
    @Body('status') status: string,
    @Body('rejectionReason') rejectionReason: string,
    @Req() req: any,
  ) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Acceso denegado: Se requiere rol de ADMIN');
    }
    
    return this.adminService.updateBusinessStatus(businessId, status, rejectionReason);
  }
}
