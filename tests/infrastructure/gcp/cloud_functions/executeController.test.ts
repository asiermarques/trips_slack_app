import {NotFoundError} from '../../../../src/infrastructure/errors';
import {executeController} from '../../../../src/infrastructure/gcp/cloud_functions/index';
import {left, isLeft} from 'fp-ts/lib/Either';

describe('the executeController should result with the right result or an error', () => {
  it('should result with an error when it throw an uncontrolled error', () => {
    const controllerStub = () => {
      throw new Error();
    };
    const result = executeController()(controllerStub);
    expect(isLeft(result)).toBe(true);
  });
  it('should result with an error when result in an HttpError', () => {
    const controllerStub = () => {
      return left(new NotFoundError());
    };
    const result = executeController()(controllerStub);
    expect(isLeft(result)).toBe(true);
  });
});
