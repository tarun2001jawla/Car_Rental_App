import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from 'cookie-parser';
import path from "path";
import fs from 'fs';
import { checkForAuthentication } from "./middlwares/authMiddleware";
import userRoutes from './routes/userRoute';
import carRoutes from './routes/carRoutes';

dotenv.config();

// Initializing Express App
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Database connection
mongoose
  .connect(process.env.MONGODB_URL || "mongodb://localhost:27017/car_rental_DB", {})
  .then(() => console.log("MongoDB connection established"))
  .catch((err) => console.error("MongoDB connection error:", err));


//middlewares
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true 
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(checkForAuthentication);

//Routes 
app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);

// Route to get JSON Data
// app.get('/api/cars', (req, res) => {
//     const filePath = path.join(__dirname, 'model', 'CarData.json');
//     fs.readFile(filePath, (err, data) => {
//       if (err) {
//         console.log('Current directory:', __dirname);
//         console.error(err);
//         res.status(500).json({ message: 'Error reading file' });
//       } else {
//         const carsData = JSON.parse(data.toString());
//         res.json(carsData);
//       }
//     });
// });



app.get("/", (req: Request, res: Response) => {
    res.send("Hello World,Welcome to Server");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
