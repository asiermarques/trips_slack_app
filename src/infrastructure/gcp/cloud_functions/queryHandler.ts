import {ParsedQs} from 'qs';
import commandMapping from './query2CommandMap';
import {NotFoundError} from '../../errors';
import {left, right} from 'fp-ts/lib/Either';

export const COMMAND_PARAM = 'command';

export const queryHandler = (query: ParsedQs) => {
  const commandInQuery = query[COMMAND_PARAM]?.toString();
  if (commandInQuery) {
    const controller = commandMapping.get(commandInQuery);
    if (controller !== undefined) return right(controller);
  }
  return left(new NotFoundError());
};
