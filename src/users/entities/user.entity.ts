import { Exclude } from 'class-transformer';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { BasicEntity } from 'src/common/entities/basic.entity';
import { Plan } from 'src/travel/entities/plan.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum UserRole {
  Client = 'Client',
  Manager = 'Manager',
}

@Entity()
export class User extends BasicEntity {
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ nullable: true })
  @Exclude()
  refreshToken?: string;

  @ManyToOne(() => Plan, (plan) => plan.id)
  plan: number;
}
