//h2 y h3
import { Controller, Get, Query } from '@nestjs/common';
import { BusinessService } from './business.service';
import { SearchBusinessDto } from './dto/search-business.dto';

@Controller('businesses')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get('search')
  async search(@Query() query: SearchBusinessDto) {
    return this.businessService.searchApproved(query);
  }

  @Get('map-pins')
  async getMapPins() {
    return this.businessService.getLightweightPins();
  }
}