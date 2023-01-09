import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Destination } from '../entities/destination.entity';

@Injectable()
export class DestinationRepository {
  constructor(
    @InjectRepository(Destination)
    private readonly destinationRepository: Repository<Destination>,
  ) {}

  async createDestination(destinationName) {
    try {
      //좌표 구하거나 받아서 하기
      const destination = await this.destinationRepository.save(
        this.destinationRepository.create({
          name: destinationName,
          cordination: '일단아무렇게나',
        }),
      );
      return destination;
    } catch (error) {
      return null;
    }
  }

  async checkDestination(destinationName) {
    try {
      let destination = await this.destinationRepository.findOne({
        where: { name: destinationName },
      });
      if (!destination)
        destination = await this.createDestination(destinationName);
      return destination;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async showDestination(destinationNmae) {
    try {
      const destination = await this.destinationRepository.findOne({
        where: { name: destinationNmae },
      });
      if (!destination) return null;
      return destination;
    } catch (error) {
      return null;
    }
  }
}
