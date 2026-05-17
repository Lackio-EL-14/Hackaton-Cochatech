//h2 y h3
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';
import { Business } from './entitites/business.entity';
import { Category } from './entitites/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Business, Category])],
  controllers: [BusinessController],
  providers: [BusinessService],
  exports: [TypeOrmModule],
})
export class BusinessModule {}
