import { checkSchema, validationResult, Result, ValidationError, Schema } from 'express-validator';
import { RequestHandler, NextFunction, Request, Response } from 'express';

import { schemaError } from '../errors';

function formatValidationErrors(validationErrors: Result<ValidationError>): string[] {
  return validationErrors.array({ onlyFirstError: true }).map((e: ValidationError) => e.msg);
}

function throwValidationError(req: Request, _: Response, next: NextFunction): void {
  const validationErrors = validationResult(req);
  next(!validationErrors.isEmpty() && schemaError(formatValidationErrors(validationErrors)[0]));
}

export function validateSchemaAndFail(schema: Schema): RequestHandler[] {
  return [...checkSchema(schema), throwValidationError];
}
