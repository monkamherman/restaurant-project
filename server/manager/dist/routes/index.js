"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = registerRoutes;
const route_1 = __importDefault(require("./route"));
// const app = express();
function registerRoutes(app) {
    app.use('/api/user', route_1.default);
}
//# sourceMappingURL=index.js.map