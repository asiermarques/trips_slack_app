import type {Response} from '@google-cloud/functions-framework/build/src/functions';
import {
  NotFoundError,
  BadRequestError,
} from '../../../../src/infrastructure/errors';
import {processErrorResponse} from '../../../../src/infrastructure/gcp/cloud_functions/index';
import {mock} from 'jest-mock-extended';

describe('the processErrorResponse sends the right error response', () => {
  it('should send a Internal Server error when Error object is passed', () => {
    const mockResponse = mock<Response>();
    processErrorResponse(new Error(), mockResponse);
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(500);
  });
  it('should send the specific http error when HttpError object is passed', () => {
    const mockResponseNotFound = mock<Response>();
    processErrorResponse(new NotFoundError(), mockResponseNotFound);
    expect(mockResponseNotFound.sendStatus).toHaveBeenCalledWith(404);

    const mockResponseBadRequest = mock<Response>();
    processErrorResponse(new BadRequestError(), mockResponseBadRequest);
    expect(mockResponseBadRequest.sendStatus).toHaveBeenCalledWith(400);
  });
});
