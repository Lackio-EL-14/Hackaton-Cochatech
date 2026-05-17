//h2 y h3
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BusinessService } from './business.service';
import { SearchBusinessDto } from './dto/search-business.dto';
import { CreateBusinessDto } from './dto/create-business.dto';

@Controller('businesses')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post('profile')
  async upsertProfile(
    @Body() createBusinessDto: CreateBusinessDto,
    // @Req() req: any si tuvieramos autenticacion
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