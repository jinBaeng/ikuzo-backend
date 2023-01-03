import { PickType } from '@nestjs/mapped-types';
import { BasicOutput } from 'src/common/dtos/output.dto';
import { Plan } from 'src/travels/entities/plan.entity';

export class CreatePlanInput extends PickType(Plan, [
  'start',
  'end',
  'city',
  'totalCost',
  'destination',
  'dayPerCost',
]) {}

export class CreatePlanOutput extends BasicOutput {}
