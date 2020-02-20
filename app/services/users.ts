import { getRepository, Repository } from 'typeorm';
import { User } from '../models/user';
import { databaseError } from '../errors';

const userRepository = (): Repository<User> => getRepository(User);

export function createUser(user: User): Promise<User> {
  return userRepository()
    .save(user)
    .catch((err: Error) => Promise.reject(databaseError(err.message)));
}

export default {
  createUser
};
