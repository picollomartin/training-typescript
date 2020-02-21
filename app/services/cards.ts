import { getRepository, Repository, FindManyOptions } from 'typeorm';
import { databaseError } from '../errors';
import { Card } from '../models/card';

const cardRepository = (): Repository<Card> => getRepository(Card);

export function purchaseCard(card: Card): Promise<Card> {
  return cardRepository()
    .save(card)
    .catch((err: Error) => Promise.reject(databaseError(err.message)));
}

export function findCards(options: FindManyOptions<Card>): Promise<Card[]> {
  return cardRepository()
    .find(options)
    .catch((err: Error) => Promise.reject(databaseError(err.message)));
}

export default {
  purchaseCard,
  findCards
};
