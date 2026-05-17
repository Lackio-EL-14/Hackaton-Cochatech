//1
import { Controller, Get, Patch, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateBusinessStatusDto } from './dto/update-business-status.dto';

@Controller('admin/businesses')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('pending')
  async listPending() {
    return this.adminService.getPendingBusinesses();
  }

  @Patch(':id/status')
  async evaluateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStatusDto: UpdateBusinessStatusDto,
  ) {
    return this.adminService.updateStatus(id, updateStatusDto);
  }
}
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
