import rp from 'request-promise';

import logger from '../logger';
import config from '../../config';
import { hearthstoneApi } from '../errors';

export interface AllCardsResponse {
  [key: string]: Card[] | unknown[];
}

export interface Card {
  cardId: string;
  dbfId: string;
  name: string;
  cardSet: string;
  type: string;
  text?: string;
  playerClass?: string;
  locale: string;
  mechanics?: { name: string }[];
  faction?: string;
  rarity?: string;
  health?: number;
  collectible?: boolean;
  img?: string;
  imgGold?: string;
  attack?: number;
  race?: string;
  cost?: number;
  flavor?: string;
  artist?: string;
  howToGet?: string;
  howToGetGold?: string;
  durability?: number;
  elite?: boolean;
  armor?: string;
  multiClassGroup?: string;
  classes?: string[];
}

export interface InfoResponse {
  patch: string;
  classes: string[];
  sets: string[];
  types: string[];
  factions: string[];
  qualities: string[];
  races: string[];
  locales: string[];
}

interface RequestHearthstone {
  path: string;
}

const requestHearthstone = <T>(requestParams: RequestHearthstone): Promise<T> =>
  rp(`${config.hearthstone.baseUrl}/${requestParams.path}`, {
    json: true,
    headers: {
      'x-rapidapi-key': config.hearthstone.apiKey
    }
  }).catch((err: Error) => {
    logger.error('Fail calling hearthstone api because: ', err);
    throw hearthstoneApi(err.message);
  });

export function getAllCards(): Promise<AllCardsResponse> {
  return requestHearthstone({ path: 'cards' });
}

export function getInfo(): Promise<InfoResponse> {
  return requestHearthstone({ path: 'info' });
}

/* function isCard(something: unknown): something is Card {
  return (something as Card).cardId !== undefined;
} */

export default { getAllCards, getInfo };
