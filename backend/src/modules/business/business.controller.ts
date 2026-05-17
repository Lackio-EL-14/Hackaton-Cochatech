import { Controller, Post, Put, Get, Body, UseGuards, Req, ForbiddenException, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get()
  async findAll() {
    return this.businessService.findAllPublic();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createBusinessDto: CreateBusinessDto, @Req() req: any) {
    if (req.user.role !== 'ENTREPRENEUR') {
      throw new ForbiddenException('Solo Emprendedores pueden registrar un negocio');
    }
    return this.businessService.create(createBusinessDto, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async update(@Body() updateBusinessDto: CreateBusinessDto, @Req() req: any) {
    if (req.user.role !== 'ENTREPRENEUR') {
      throw new ForbiddenException('Solo Emprendedores pueden editar su negocio');
    }
    return this.businessService.update(updateBusinessDto, req.user.id);
  }

  @Get('categories')
  async getCategories() {
    return this.businessService.findAllCategories();
  }

  @Get(':id/products')
  async getBusinessProducts(@Param('id') businessId: string) {
    return this.businessService.findProductsByBusiness(businessId);
  }

}
