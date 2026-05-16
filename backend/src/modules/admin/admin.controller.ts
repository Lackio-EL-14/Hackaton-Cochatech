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