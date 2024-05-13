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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const carRoutes_1 = __importDefault(require("./routes/carRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const User_1 = __importDefault(require("./model/User"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const fetchOrderRoute_1 = __importDefault(require("./routes/fetchOrderRoute"));
const passport_local_1 = require("passport-local");
const googleAuthController_1 = require("./controller/googleAuthController");
const githubAuthController_1 = require("./controller/githubAuthController");
dotenv_1.default.config();
// Initializing Express App
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Initialize Passport
app.use((0, express_session_1.default)({ secret: process.env.SESSION_SECRET || '', resave: false, saveUninitialized: false }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Database connection
const mongodb_1 = require("mongodb");
const uri = "mongodb+srv://TarunJawla:Tarunjawla%40123@atlascluster.7hp44bd.mongodb.net/car_rental_app?retryWrites=true&w=majority&appName=AtlasCluster";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            yield client.connect();
            // Send a ping to confirm a successful connection
            yield client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        }
        finally {
            // Ensures that the client will close when you finish/error
            yield client.close();
        }
    });
}
run().catch(console.dir);
module.exports = (req, res) => {
    res.status(200).json({ message: 'Hello from Vercel serverless function!' });
};
//middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
// Configure Passport local strategy
passport_1.default.use(new passport_local_1.Strategy({ usernameField: 'email' }, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'Invalid email or password' });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Invalid email or password' });
        }
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
})));
// Google authentication routes
app.get('/auth/google', googleAuthController_1.googleAuth);
app.get('/auth/google/callback', googleAuthController_1.googleAuthCallback);
// GitHub authentication routes
app.get('/auth/github', githubAuthController_1.githubAuth);
app.get('/auth/github/callback', githubAuthController_1.githubAuthCallback);
app.get('/auth/github/callback', passport_1.default.authenticate('github', {
    successRedirect: 'http://localhost:5173/',
    failureRedirect: '/',
}));
// Express route to fetch user data
app.get('/api/user', (req, res) => {
    if (req.user) {
        res.json({ user: req.user });
        console.log("user:", req.user);
    }
    else {
        res.json({ user: null });
    }
});
// Serialize and deserialize user
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(id).select('-password');
        done(null, user);
    }
    catch (err) {
        done(err);
    }
}));
//Routes 
app.use("/api/users", userRoute_1.default);
app.use("/api/cars", carRoutes_1.default);
app.use("/api/reserve", orderRoutes_1.default);
app.use("/api/orders", fetchOrderRoute_1.default);
// Default route
app.get("/", (req, res) => {
    res.send("Hello World,Welcome to Server");
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map