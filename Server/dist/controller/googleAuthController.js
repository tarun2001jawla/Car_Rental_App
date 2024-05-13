"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuthCallback = exports.googleAuth = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../model/User"));
dotenv_1.default.config();
// Configure Passport Google strategy
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: 'http://localhost:5000/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield User_1.default.findOne({ googleId: profile.id });
        if (!user) {
            user = new User_1.default({ googleId: profile.id, profile });
            yield user.save();
        }
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
})));
// Google authentication routes
const googleAuth = (req, res, next) => {
    passport_1.default.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
};
exports.googleAuth = googleAuth;
const googleAuthCallback = (req, res, next) => {
    passport_1.default.authenticate('google', {
        successRedirect: 'http://localhost:5173/',
        failureRedirect: '/',
    })(req, res, next);
};
exports.googleAuthCallback = googleAuthCallback;
//# sourceMappingURL=googleAuthController.js.map