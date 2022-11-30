import { BasicEntity } from 'src/common/entities/basic.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Board } from './board.entity';

@Entity()
export class Comment extends BasicEntity {
  @ManyToOne(() => User, (user) => user.id)
  user: number;

  @ManyToOne(() => Board, (board) => board.id)
  board: number;

  @ManyToOne(() => Comment, (comment) => comment.id)
  group: number;

  @ManyToOne(() => User, (user) => user.id)
  target: number;

  @Column()
  content: string;
}
