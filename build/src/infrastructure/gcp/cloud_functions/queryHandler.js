"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryHandler = exports.COMMAND_PARAM = exports.RouteNotFoundError = void 0;
const query2CommandMap_1 = require("./query2CommandMap");
const Either_1 = require("fp-ts/lib/Either");
class RouteNotFoundError extends Error {
}
exports.RouteNotFoundError = RouteNotFoundError;
exports.COMMAND_PARAM = 'command';
function queryHandler(query) {
    var _a;
    const commandInQuery = (_a = query[exports.COMMAND_PARAM]) === null || _a === void 0 ? void 0 : _a.toString();
    if (commandInQuery) {
        const controller = query2CommandMap_1.default.get(commandInQuery);
        if (controller !== undefined)
            return (0, Either_1.right)(controller);
    }
    return (0, Either_1.left)(new RouteNotFoundError());
}
exports.queryHandler = queryHandler;
//# sourceMappingURL=queryHandler.js.map