import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, Unique, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user';
import { Card } from './card';

@Entity({ name: 'Deck' })
@Unique('Deck_User', ['class', 'userId'])
export class Deck {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  class: string;

  @Column({ type: 'integer' })
  userId: number;

  @ManyToOne(
    () => User,
    (user: User) => user.decks
  )
  user: User;

  @ManyToMany(() => Card)
  @JoinTable()
  cards: Card[];
}
