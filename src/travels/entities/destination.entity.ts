import { IsString } from 'class-validator';
import { BasicEntity } from 'src/common/entities/basic.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Destination extends BasicEntity {
  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  cordination: string;
}
