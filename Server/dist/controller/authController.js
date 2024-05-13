"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserLogin = void 0;
const passport_1 = __importDefault(require("passport"));
const handleUserLogin = (req, res, next) => {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).json({ message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            console.log('user data', user);
            return res.json({ message: 'Login successful', user });
        });
    })(req, res, next);
};
exports.handleUserLogin = handleUserLogin;
//# sourceMappingURL=authController.js.map