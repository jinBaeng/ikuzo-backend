import { Module } from '@nestjs/common';
import { TravelService } from './travel.service';
import { TravelController } from './travel.controller';
import { PlanController } from './plan/plan.controller';
import { PlanService } from './plan/plan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { planRepository } from './plan/plan.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  controllers: [TravelController, PlanController],
  providers: [TravelService, PlanService, planRepository],
})
export class TravelModule {}
