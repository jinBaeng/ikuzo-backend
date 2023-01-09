import { Injectable } from '@nestjs/common';
import {
  CreatePlanInput,
  CreatePlanOutput,
} from '../dtos/plan/create-plan.dto';
import { ShowPlanOutput } from '../dtos/plan/show-plan.dto';
import { ShowPlansOutput } from '../dtos/plan/show-plans.dto';
import { CreateTravelInput } from '../dtos/travel/create-travel.dto';
import { DestinationRepository } from '../repositories/destination.repository';
import { TravelRepository } from '../repositories/travel.repository';
import { planRepository } from './plan.repository';

@Injectable()
export class PlanService {
  constructor(
    private planRepository: planRepository,
    private destinationRepository: DestinationRepository,
    private travelRepositoy: TravelRepository,
  ) {}

  async createPlan(
    createPlanInput: CreatePlanInput,
  ): Promise<CreatePlanOutput> {
    try {
      const plan = await this.planRepository.createPlan(createPlanInput);
      if (!plan) return { ok: false, message: 'failed to create plan' };

      const travel = createPlanInput.destination;
      Object.keys(travel).forEach(async (day) => {
        const numberDay = Number(day);
        console.log(day);
        travel[day].forEach(async (destination) => {
          const order = +Object.keys(destination)[0];
          const checkDestination =
            await this.destinationRepository.checkDestination(
              Object.values(destination)[0],
            );
          if (!checkDestination)
            return { ok: false, error: 'failed to create plan' };
          const createTravelInput: CreateTravelInput = {
            day: numberDay,
            order,
            planId: plan.id,
            destinationId: checkDestination.id,
          };
          const travel = await this.travelRepositoy.creatTravel(
            createTravelInput,
          );
          if (!travel) return { ok: false, error: 'failed to create plan' };
        });
      });

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

  async showPlan(planId: number): Promise<ShowPlanOutput> {
    try {
      const plan = await this.planRepository.showPlan(planId);
      if (!plan) return { ok: false, message: 'failed to create plan' };
      return {
        ok: true,
        plan,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'not found any plan ',
      };
    }
  }

  async showPlans(page: number): Promise<ShowPlansOutput> {
    try {
      const { plans, pages } = await this.planRepository.showPlans(page);
      if (!plans[0]) return { ok: false, message: 'not found any plans' };
      return {
        ok: true,
        plans,
        pages,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'failed to sho plans',
      };
    }
  }
}
