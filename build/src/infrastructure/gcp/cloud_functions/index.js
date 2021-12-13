"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripsSlackAppEntrypoint = void 0;
const queryHandler_1 = require("./queryHandler");
const Either_1 = require("fp-ts/lib/Either");
const function_1 = require("fp-ts/function");
function processErrorResponse(e, res) {
    if (e instanceof queryHandler_1.RouteNotFoundError) {
        res.status(404).send('Not found');
        return;
    }
    res.status(500).send('Internal Error');
}
function executeController(controller) {
    return (0, Either_1.tryCatch)(() => controller(), e => (e instanceof Error ? e : Error('unexpected error')));
}
const tripsSlackAppEntrypoint = (req, res) => (0, Either_1.fold)((_) => processErrorResponse(_, res), (_) => res.status(200).send(_))((0, function_1.pipe)((0, queryHandler_1.queryHandler)(req.query), (0, Either_1.chain)(executeController)));
exports.tripsSlackAppEntrypoint = tripsSlackAppEntrypoint;
//# sourceMappingURL=index.js.map