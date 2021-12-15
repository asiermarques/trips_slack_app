import {
  queryHandler,
  COMMAND_PARAM,
} from '../../../../src/infrastructure/gcp/cloud_functions/queryHandler';
import {NotFoundError} from '../../../../src/infrastructure/errors';
import CommandController from '../../../../src/infrastructure/controllers/CommandController';
import {Either, right, isLeft, isRight, getOrElse} from 'fp-ts/lib/Either';
import {pipe} from 'fp-ts/function';
import commandMap from '../../../../src/infrastructure/gcp/cloud_functions/query2CommandMap';

jest.mock(
  '../../../../src/infrastructure/gcp/cloud_functions/query2CommandMap'
);
const mockRoutes = commandMap as jest.Mocked<typeof commandMap>;

const StubController = () => {
  return right('Hello World');
};
const StubQuery = {};

describe('the queryHandler process the request to get the right controller', () => {
  it('should result in a RouteNotFoundError if the command query param is not present', () => {
    mockRoutes.set('hello', StubController);
    const result: Either<NotFoundError, CommandController> =
      queryHandler(StubQuery);
    expect(isLeft(result)).toBe(true);
  });

  it('should result in a RouteNotFoundError if the controller is not present', () => {
    mockRoutes.clear();
    StubQuery[COMMAND_PARAM] = 'hello';
    const result: Either<NotFoundError, CommandController> =
      queryHandler(StubQuery);
    expect(isLeft(result)).toBe(true);
  });

  it('should result with the right controller', () => {
    mockRoutes.set('hello', StubController);
    StubQuery[COMMAND_PARAM] = 'hello';
    const result: Either<NotFoundError, CommandController> =
      queryHandler(StubQuery);
    expect(isRight(result)).toBe(true);
    expect(pipe(result, getOrElse(undefined))).toBe(StubController);
  });
});
