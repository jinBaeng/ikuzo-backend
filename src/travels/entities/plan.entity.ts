import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BasicEntity } from 'src/common/entities/basic.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Plan extends BasicEntity {
  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  @IsOptional()
  description: string;

  @Column()
  @IsDateString()
  start: Date;

  @Column()
  @IsDateString()
  end: Date;

  @Column()
  @IsString()
  city: string;

  @Column({ nullable: true })
  @IsNumber()
  @IsOptional()
  totalCost: number;

  @Column({ type: 'json', nullable: true })
  @IsArray()
  @IsOptional()
  dayPerCost: object;

  @ManyToMany(() => User, { nullable: true })
  @JoinTable()
  @IsOptional()
  users: User[];
}
