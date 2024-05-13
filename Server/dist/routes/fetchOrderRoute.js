"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fetchOrdersController_1 = __importDefault(require("../controller/fetchOrdersController"));
const router = express_1.default.Router();
router.get('/', fetchOrdersController_1.default.getAllOrders);
exports.default = router;
//# sourceMappingURL=fetchOrderRoute.js.map