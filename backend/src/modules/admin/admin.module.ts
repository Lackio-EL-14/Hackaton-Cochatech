import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController, AdminBusinessesController } from './admin.controller';
import { Business } from '../business/entitites/business.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Business]),
    AuthModule,
  ],
  controllers: [AdminController, AdminBusinessesController],
  providers: [AdminService],
})
export class AdminModule {}

