import {Either} from 'fp-ts/lib/Either';
export default interface CommandController {
  (params?: string[]): Either<Error, string>;
}
