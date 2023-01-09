import { PickType } from '@nestjs/mapped-types';
import { Travel } from 'src/travels/entities/travel.entity';

export class CreateTravelInput extends PickType(Travel, [
  'day',
  'order',
  'planId',
  'destinationId',
]) {}
