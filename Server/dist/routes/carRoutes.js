"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const carContoller_1 = __importDefault(require("../controller/carContoller"));
const router = express_1.default.Router();
router.get("/", carContoller_1.default.getAllCars);
router.post("/", carContoller_1.default.createCar);
router.use(express_1.default.json());
exports.default = router;
//# sourceMappingURL=carRoutes.js.map