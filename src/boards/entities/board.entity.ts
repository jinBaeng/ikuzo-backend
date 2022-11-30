import { IsBoolean, IsString } from 'class-validator';
import { BasicEntity } from 'src/common/entities/basic.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Board extends BasicEntity {
  @ManyToOne(() => User, (user) => user.id)
  user: number;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  content: string;

  @Column()
  @IsBoolean()
  secret: boolean;

  @Column({ default: false })
  @IsBoolean()
  complete: boolean;
}
