import { Column, PrimaryGeneratedColumn, ManyToOne, Entity, Unique } from 'typeorm';
import { User } from './user';

@Entity({ name: 'Card' })
@Unique('Card_User', ['userId', 'cardId'])
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'card_id' })
  cardId: string;

  @Column({ type: 'integer' })
  userId: number;

  @ManyToOne(
    () => User,
    (user: User) => user.cards
  )
  user: User;
}
