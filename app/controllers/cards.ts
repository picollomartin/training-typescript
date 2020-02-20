import { Response, NextFunction, Request } from 'express';
import hearthstoneService, { AllCardsResponse, InfoResponse } from '../services/hearthstone';

export function getAllCards(_: Request, res: Response, next: NextFunction): Promise<Response | void> {
  return hearthstoneService
    .getAllCards()
    .then((response: AllCardsResponse) => res.send(response))
    .catch(next);
}

export function getInfo(_: Request, res: Response, next: NextFunction): Promise<Response | void> {
  return hearthstoneService
    .getInfo()
    .then((response: InfoResponse) => res.send(response))
    .catch(next);
}
