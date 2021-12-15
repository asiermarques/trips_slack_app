import type {
  HttpFunction,
  Request,
  Response,
} from '@google-cloud/functions-framework/build/src/functions';
import CommandController from '../../controllers/CommandController';
import {queryHandler} from './queryHandler';
import {HttpError} from '../../errors';
import {fold, tryCatch, chain} from 'fp-ts/lib/Either';
import {pipe} from 'fp-ts/function';

export const processErrorResponse = (error: Error, res: Response) =>
  error instanceof HttpError
    ? res.sendStatus(error.code ? error.code : 500)
    : res.sendStatus(500);

export const executeController =
  (params?: string[]) => (controller: CommandController) =>
    tryCatch<Error, string>(
      () =>
        fold(
          (e: Error) => {
            throw e;
          },
          (_: string) => _
        )(controller(params)),
      e => (e instanceof Error ? e : Error('unexpected error'))
    );

export const tripsSlackAppEntrypoint: HttpFunction = (
  req: Request,
  res: Response
) =>
  fold(
    (_: Error) => processErrorResponse(_, res),
    (_: string) => res.status(200).send(_)
  )(pipe(queryHandler(req.query), chain(executeController([]))));
