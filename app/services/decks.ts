import { getRepository, Repository } from 'typeorm';
import { DeepPartial } from 'utils';
import { databaseError } from '../errors';
import { Deck } from '../models/deck';
import { Card } from '../models/card';

const deckRepository = (): Repository<Deck> => getRepository(Deck);

export function createDeck(deck: Deck): Promise<Deck> {
  return deckRepository()
    .save(deck)
    .catch((err: Error) => Promise.reject(databaseError(err.message)));
}

export function findDeck(deck: DeepPartial<Deck>): Promise<Deck | undefined> {
  return deckRepository()
    .findOne(deck.id, { where: { userId: deck.userId } })
    .catch((err: Error) => Promise.reject(databaseError(err.message)));
}

export function addCardsInDeck(deck: Deck, cards: Card[]): Promise<void> {
  return deckRepository()
    .createQueryBuilder()
    .relation(Deck, 'cards')
    .of(deck)
    .add(cards)
    .catch((err: Error) => Promise.reject(databaseError(err.message)));
}

export default {
  createDeck,
  findDeck,
  addCardsInDeck
};
