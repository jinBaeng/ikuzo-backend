import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import {
  CreatePlanInput,
  CreatePlanOutput,
} from '../dtos/plan/create-plan.dto';
import { PlanService } from './plan.service';

@Controller('plan')
export class PlanController {
  constructor(private planService: PlanService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  createPlan(
    @Body() createPlanInput: CreatePlanInput,
    @Req() req: Request,
  ): Promise<CreatePlanOutput> {
    return this.planService.createPlan(createPlanInput, req.user);
  }
}
