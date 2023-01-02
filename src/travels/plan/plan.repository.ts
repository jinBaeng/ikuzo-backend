import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRepository } from 'src/repositories/custom-repository.decorater';
import { Repository } from 'typeorm';
import { Plan } from '../entities/plan.entity';

@Injectable()
@CustomRepository(Plan)
export class planRepository {
  constructor(
    @InjectRepository(Plan) private readonly planRepository: Repository<Plan>, //  imports: [TypeOrmModule.forFeature([Plan])],
  ) {}

  async createPlan(createPlanInput, userId) {
    try {
      console.log(createPlanInput);
    } catch (error) {}
  }
}
