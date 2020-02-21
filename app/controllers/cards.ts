import { Response, NextFunction, Request } from 'express';
import hearthstoneService, { AllCardsResponse, InfoResponse } from '../services/hearthstone';
import cardService from '../services/cards';
import { Card } from '../models/card';

export function getAllCards(_: Request, res: Response, next: NextFunction): Promise<Response | void> {
  return hearthstoneService
    .getAllCards()
    .then((response: AllCardsResponse) => res.send(response))
    .catch(next);
}

export async function purchaseCard(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    // Hardcoded userId because auth is not implemented
    const card = {
      userId: 3,
      cardId: req.params.cardId
    } as Card;

    await hearthstoneService.getCardById(req.params.cardId);
    const newCard = await cardService.purchaseCard(card);
    res.status(201).send({ purchasedId: newCard.id });
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
