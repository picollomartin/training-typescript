import { Application } from 'express';

import { healthCheck } from './controllers/healthCheck';
import { getAllCards, getInfo } from './controllers/cards';
import { createUser } from './controllers/users';
import { getTodos } from './controllers/todos';
import { validateSchemaAndFail } from './middlewares/schemas';
import userSchemas from './schemas/users';

export const init = (app: Application): void => {
  app.get('/health', healthCheck);
  app.get('/todos', getTodos);
  app.get('/info', getInfo);
  app.get('/cards', getAllCards);

  app.post('/users', validateSchemaAndFail(userSchemas.createUser), createUser);
};
