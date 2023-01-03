import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRepository } from 'src/repositories/custom-repository.decorater';
import { Raw, Repository } from 'typeorm';
import { Plan } from '../entities/plan.entity';

@Injectable()
@CustomRepository(Plan)
export class planRepository {
  constructor(
    @InjectRepository(Plan) private readonly planRepository: Repository<Plan>, //  imports: [TypeOrmModule.forFeature([Plan])],
  ) {}

  async createPlan(createPlanInput) {
    try {
      const plan = await this.planRepository.save(
        this.planRepository.create({
          ...createPlanInput,
        }),
      );
      return plan;
    } catch (error) {
      return null;
    }
  }

  async showPlan(planId) {
    try {
      const plan = await this.planRepository.findOne({ where: { id: planId } });
      return plan;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async showPlans(page) {
    try {
      const [plans, pages] = await this.planRepository.findAndCount({
        skip: (page - 1) * 6,
        take: 6,
      });
      return {
        plans,
        pages,
      };
    } catch (error) {
      return null;
    }
  }

  async updatePlan(palnId, updatePlanInput) {
    try {
      await this.planRepository.save([
        {
          id: palnId,
          ...updatePlanInput,
        },
      ]);
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteBaord(palnId) {
    try {
      await this.planRepository.softDelete({ id: palnId });
      return true;
    } catch (error) {
      return false;
    }
  }

  // async searchedPlan(searchedItem, page) {
  //   try {
  //     const [searchedPlan, totalResults] =
  //       await this.planRepository.findAndCount({
  //         where: {
  //           title: Raw((title) => `${title} ILIKE '%${searchedItem}%'`),
  //         },
  //         skip: (page - 1) * 25,
  //         take: 25,
  //       });
  //   } catch (error) {}
  // }
}
