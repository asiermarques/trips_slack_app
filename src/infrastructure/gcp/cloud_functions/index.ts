import type {
  HttpFunction,
  Request,
  Response,
} from '@google-cloud/functions-framework/build/src/functions';
import CommandController from '../../controllers/CommandController';
import {queryHandler, RouteNotFoundError} from './queryHandler';
import {fold, tryCatch, chain} from 'fp-ts/lib/Either';
import {pipe} from 'fp-ts/function';

const processErrorResponse = (e: Error, res: Response) => {
  if (e instanceof RouteNotFoundError) {
    res.status(404).send('Not found');
    return;
  }
  res.status(500).send('Internal Error');
};

const executeController = (controller: CommandController) =>
  tryCatch<Error, string>(
    () => controller(),
    e => (e instanceof Error ? e : Error('unexpected error'))
  );

export const tripsSlackAppEntrypoint: HttpFunction = (
  req: Request,
  res: Response
) =>
  fold(
    (_: Error) => processErrorResponse(_, res),
    (_: string) => res.status(200).send(_)
  )(pipe(queryHandler(req.query), chain(executeController)));
