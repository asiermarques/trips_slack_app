import { ParsedQs } from 'qs';
import CommandController from '../../controllers/CommandController';
import { Either } from 'fp-ts/lib/Either';
export declare class RouteNotFoundError extends Error {
}
export declare const COMMAND_PARAM = "command";
export declare function queryHandler(query: ParsedQs): Either<RouteNotFoundError, CommandController>;
