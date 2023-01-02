import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BasicEntity } from 'src/common/entities/basic.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

@Entity()
export class Plan extends BasicEntity {
  @Column()
  @IsDateString()
  start: Date;

  @Column()
  @IsDateString()
  end: Date;

  @Column()
  @IsBoolean()
  isOverseas: boolean;

  @Column()
  @IsString()
  city: string;

  @Column({ nullable: true })
  @IsNumber()
  totalCost: number;

  @Column({ type: 'json' })
  @IsArray()
  destination: object;

  @Column({ type: 'json', nullable: true })
  @IsArray()
  dayPerCost?: object;
}
