import express from "express";
const router = express.Router();
import adminController from "../controller/adminController";
import carContoller from "../controller/carContoller";


// Admin signup/login Routes
router.post("/signup", adminController.handleAdminSignUp);
router.post("/login", adminController.handleAdminLogin);

//car routes 
router.post("/add",carContoller.createCar);
router.delete("/:id",carContoller.deleteCar);

//order routes 
router.get("/orders",adminController.handleOrderFetch);
export default router;