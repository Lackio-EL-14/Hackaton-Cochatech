import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessController, BusinessesController } from './business.controller';
import { BusinessService } from './business.service';
import { Business } from './entitites/business.entity';
import { Category } from './entitites/category.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Business, Category]), AuthModule],
  controllers: [BusinessController, BusinessesController],
  providers: [BusinessService],
  exports: [TypeOrmModule],
})
export class BusinessModule {}

