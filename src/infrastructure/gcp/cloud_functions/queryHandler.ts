import {ParsedQs} from 'qs';
import CommandController from '../../controllers/CommandController';
import commandMapping from './query2CommandMap';
import {Either, left, right} from 'fp-ts/lib/Either';

export class RouteNotFoundError extends Error {}

export const COMMAND_PARAM = 'command';

export function queryHandler(
  query: ParsedQs
): Either<RouteNotFoundError, CommandController> {
  const commandInQuery = query[COMMAND_PARAM]?.toString();
  if (commandInQuery) {
    const controller = commandMapping.get(commandInQuery);
    if (controller !== undefined) return right(controller);
  }
  return left(new RouteNotFoundError());
}
