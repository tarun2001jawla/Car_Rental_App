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
exports.githubAuthCallback = exports.githubAuth = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_github2_1 = require("passport-github2");
const User_1 = __importDefault(require("../model/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Configure Passport GitHub strategy
passport_1.default.use(new passport_github2_1.Strategy({
    clientID: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    callbackURL: 'http://localhost:5000/auth/github/callback',
    scope: ['user:email'],
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract email from the profile
        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
        // Find or create user based on GitHub ID
        let user = yield User_1.default.findOne({ githubId: profile.id });
        if (!user) {
            // Create a new user with GitHub profile and email
            user = new User_1.default({
                githubId: profile.id,
                email: email,
                name: profile.displayName,
                password: 'password', // Default password
                phone: '123456789', // Default phone
            });
            yield user.save();
        }
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
})));
// GitHub authentication routes
const githubAuth = (req, res, next) => {
    passport_1.default.authenticate('github')(req, res, next);
};
exports.githubAuth = githubAuth;
const githubAuthCallback = (req, res, next) => {
    passport_1.default.authenticate('github', {
        successRedirect: 'http://localhost:5173/',
        failureRedirect: '/',
    })(req, res, next);
};
exports.githubAuthCallback = githubAuthCallback;
//# sourceMappingURL=githubAuthController.js.map