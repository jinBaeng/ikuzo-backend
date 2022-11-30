import { IsDate, IsNumber, IsString } from 'class-validator';
import { BasicEntity } from 'src/common/entities/basic.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Plan extends BasicEntity {
  @Column()
  @IsDate()
  start: Date;

  @Column()
  @IsDate()
  end: Date;

  @Column()
  isOverseas: boolean;

  @Column()
  @IsString()
  country: string;

  @Column({ nullable: true })
  @IsNumber()
  totalCost: number;

  @Column({ type: 'json' })
  destination: object;

  @Column({ type: 'json', nullable: true })
  dayPerCost?: object;

  @ManyToOne(() => User, (user) => user.id)
  user: number;
}
