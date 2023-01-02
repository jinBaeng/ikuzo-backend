import { Injectable } from '@nestjs/common';
import { planRepository } from './plan.repository';

@Injectable()
export class PlanService {
  constructor(private planRepository: planRepository) {}

  async createPlan(createPlanInput, user) {
    try {
      await this.planRepository.createPlan(createPlanInput, user);
      return {
        ok: true,
        message: 'create plan',
      };
    } catch (error) {
      return {
        ok: false,
        error: 'failed to create plan',
      };
    }
  }
}
