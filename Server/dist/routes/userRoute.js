"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = __importDefault(require("../controller/userController"));
const authController_1 = require("../controller/authController");
// User Routes
router.post('/signup', userController_1.default.handleUserSignUp);
router.post('/login', authController_1.handleUserLogin);
exports.default = router;
//# sourceMappingURL=userRoute.js.map