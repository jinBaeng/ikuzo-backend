import { PickType } from '@nestjs/mapped-types';
import { IsObject } from 'class-validator';
import { BasicOutput } from 'src/common/dtos/output.dto';
import { Plan } from 'src/travels/entities/plan.entity';

export class CreatePlanInput extends PickType(Plan, [
  'title',
  'description',
  'start',
  'end',
  'city',
  'totalCost',
  'dayPerCost',
  'users',
]) {
  @IsObject()
  destination: object;
}

export class CreatePlanOutput extends BasicOutput {}
