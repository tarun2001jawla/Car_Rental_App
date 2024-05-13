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
const User_1 = __importDefault(require("../model/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Signup controller
const handleUserSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phone, role } = req.body;
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const newUser = new User_1.default({ name, email, password: hashedPassword, phone, role });
        yield newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (err) {
        console.error('Error in signup:', err);
        res.status(500).json({ message: 'Something went wrong while signing up' });
    }
});
exports.default = { handleUserSignUp };
//# sourceMappingURL=userController.js.map