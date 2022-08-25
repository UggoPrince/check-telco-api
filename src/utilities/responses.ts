import { Logger } from '@nestjs/common';
import { Response } from 'express';

export const success = (
  res: Response,
  statusCode = 200,
  message = 'Success',
  data = {},
): object => {
  const successObject = {
    statusCode,
    message,
    data,
  };
  Logger.verbose(message, data);
  return res.status(statusCode).send(successObject);
};
