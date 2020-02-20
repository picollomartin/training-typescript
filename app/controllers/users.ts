import { Response, NextFunction, Request } from 'express';
import { User } from '../models/user';
import userService from '../services/users';
import { hash } from '../services/crypto';

export function createUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  return hash(req.body.password)
    .then((hashedPassword: string) => {
      const user = {
        name: req.body.name,
        lastName: req.body.last_name,
        email: req.body.email,
        password: hashedPassword
      } as User;
      return userService.createUser(user).then((newUser: User) => res.status(201).send(newUser));
    })
    .catch(next);
}
