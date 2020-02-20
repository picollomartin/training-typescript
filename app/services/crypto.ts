import bycrypt from 'bcryptjs';

import { defaultError } from '../errors';
import logger from '../logger';

function errorHandler<T>(err: Error): Promise<T> {
  logger.error(`Fail to encrypt string because of: ${err}`);
  return Promise.reject(defaultError('Fail crypto service'));
}

export function hash(someString: string): Promise<string> {
  return bycrypt.hash(someString, 3).catch((err: Error) => errorHandler<string>(err));
}

export function compare(originalHash: string, someString: string): Promise<boolean> {
  return bycrypt.compare(someString, originalHash).catch((err: Error) => errorHandler<boolean>(err));
}
