import { Response, NextFunction, Request } from 'express';
import { In } from 'typeorm';
import hearthstoneService, { AllCardsResponse, InfoResponse, Card } from '../services/hearthstone';
import deckService from '../services/decks';
import cardService, { findCards } from '../services/cards';
import { notFound } from '../errors';
import { Deck } from '../models/deck';

export function getAllCards(_: Request, res: Response, next: NextFunction): Promise<Response | void> {
  return hearthstoneService
    .getAllCards()
    .then((response: AllCardsResponse) => res.send(response))
    .catch(next);
}

export async function createDeck(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    // Hardcoded userId because auth is not implemented
    const deck = {
      class: req.body.class,
      userId: 3
    } as Deck;

    const hearstoneInfo = await hearthstoneService.getInfo();
    if (!hearstoneInfo.classes.includes(deck.class)) throw notFound('Class not found');
    const newDeck = await deckService.createDeck(deck);
    res.status(201).send({ deck: newDeck });
  } catch (err) {
    next(err);
  }
}

export async function addCardsInDeck(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const newCards = req.body.card_ids;
    // Hardcoded userId because auth is not implemented
    const deck = await deckService.findDeck({ id: parseInt(req.params.deck_id), userId: 3 });
    if (!deck) throw notFound('Deck not found');

    const purchasedCards = await cardService.findCards({ where: { userId: 3, cardId: In(newCards) } });
    if (purchasedCards.length !== newCards.length) throw notFound('Some cards not purchased by user');

    if (deck.class !== 'Neutral') {
      const newCardsData: Card[] = await Promise.all(
        newCards.map((cardId: string) => hearthstoneService.getCardById(cardId))
      );
      const nonDeckClass: Card[] = newCardsData.filter(
        (card: Card) => card.faction !== 'Neutral' || card.faction !== deck.class
      );

      if (nonDeckClass.length > 0) {
        throw notFound(
          `Some cards: [${nonDeckClass
            .map((card: Card) => card.cardId)
            .join()}] are non from deck class or neutral`
        );
      }
    }
    await deckService.addCardsInDeck(deck, purchasedCards);
    res.status(201).end();
  } catch (err) {
    next(err);
  }
}

export function getInfo(_: Request, res: Response, next: NextFunction): Promise<Response | void> {
  return hearthstoneService
    .getInfo()
    .then((response: InfoResponse) => res.send(response))
    .catch(next);
}
