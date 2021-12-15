export abstract class HttpError extends Error {
  abstract readonly code: number;
}

export class BadRequestError extends HttpError {
  code = 400;
}

export class NotFoundError extends HttpError {
  code = 404;
}
