import { Application } from 'express';

import { healthCheck } from './controllers/healthCheck';
import { getAllCards, getInfo, purchaseCard } from './controllers/cards';
import { createUser } from './controllers/users';
import { createDeck, addCardsInDeck } from './controllers/decks';
import { validateSchemaAndFail } from './middlewares/schemas';
import userSchemas from './schemas/users';

export const init = (app: Application): void => {
  app.get('/health', healthCheck);

  app.post('/users', validateSchemaAndFail(userSchemas.createUser), createUser);

  app.get('/info', getInfo);
  app.get('/cards', getAllCards);
  app.post('/cards/:cardId', purchaseCard);

  app.post('/decks', createDeck);
  app.post('/decks/:deck_id/cards', addCardsInDeck);
};
