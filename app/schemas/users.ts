import { Schema } from 'express-validator';

const createUser: Schema = {
  name: {
    in: ['body'],
    isString: true,
    trim: true,
    errorMessage: 'Name is required'
  },
  last_name: {
    in: ['body'],
    isString: true,
    trim: true,
    errorMessage: 'lastName is required'
  },
  email: {
    in: ['body'],
    isEmail: true,
    trim: true,
    custom: {
      options: (email: string): boolean => email.endsWith('@wolox.com.ar')
    },
    errorMessage: 'email is required'
  },
  password: {
    in: ['body'],
    isAlphanumeric: true,
    isLength: {
      options: {
        min: 8
      }
    },
    trim: true,
    errorMessage: 'password is required'
  }
};

export default {
  createUser
};
