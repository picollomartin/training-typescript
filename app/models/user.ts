import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Card } from './card';
import { Deck } from './deck';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column({ type: 'varchar', name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column('varchar')
  password: string;

  @OneToMany(
    () => Card,
    (card: Card) => card.user
  )
  cards: Card[];

  @OneToMany(
    () => Deck,
    (deck: Deck) => deck.user
  )
  decks: Deck[];
}
