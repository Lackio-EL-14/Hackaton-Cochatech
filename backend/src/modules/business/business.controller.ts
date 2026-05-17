import { Body, Controller, Get, Post, Query, Put, UseGuards, Req, ForbiddenException, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BusinessService } from './business.service';
import { SearchBusinessDto } from './dto/search-business.dto';
import { CreateBusinessDto } from './dto/create-business.dto';

@Controller('businesses')
export class BusinessesController {
  constructor(private readonly businessService: BusinessService) {}

  @Post('profile')
  async upsertProfile(
    @Body() createBusinessDto: CreateBusinessDto,
    @Query('userId') userId: string
  ) {
    return this.businessService.upsertBusinessProfile(userId, createBusinessDto);
  }
  
  @Get('search')
  async search(@Query() query: SearchBusinessDto) {
    return this.businessService.searchApproved(query);
  }

  @Get('map-pins')
  async getMapPins() {
    return this.businessService.getLightweightPins();
  }
}

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get()
  async findAll() {
    return this.businessService.findAllPublic();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my-profile')
  async getMyProfile(@Req() req: any) {
    if (req.user.role !== 'ENTREPRENEUR') {
      throw new ForbiddenException('Solo Emprendedores pueden ver su perfil de negocio');
    }
    return this.businessService.findByUserId(req.user.id);
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

