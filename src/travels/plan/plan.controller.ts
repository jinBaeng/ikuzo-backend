import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import {
  CreatePlanInput,
  CreatePlanOutput,
} from '../dtos/plan/create-plan.dto';
import { ShowPlanOutput } from '../dtos/plan/show-plan.dto';
import { ShowPlansOutput } from '../dtos/plan/show-plans.dto';
import { PlanService } from './plan.service';

@Controller('plan')
export class PlanController {
  constructor(private planService: PlanService) {}

  // @UseGuards(AccessTokenGuard)
  @Post()
  createPlan(
    @Body() createPlanInput: CreatePlanInput,
    // @Req() req: Request,
  ): Promise<CreatePlanOutput> {
    return this.planService.createPlan(createPlanInput);
  }

  @Get('/:id')
  showPlan(@Param('id') planId: number): Promise<ShowPlanOutput> {
    return this.planService.showPlan(planId);
  }

  @Get('/all/:page')
  showPlans(@Param('page') page: number): Promise<ShowPlansOutput> {
    return this.planService.showPlans(page);
  }
}
