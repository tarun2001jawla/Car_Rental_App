import express from "express";
import carContoller from "../controller/carContoller";
import { checkForAdminRole } from "../middlwares/authMiddleware";
const router = express.Router();

router.get("/",carContoller.getAllCars);
router.post("/",checkForAdminRole,carContoller.createCar);
router.delete("/:id",carContoller.deleteCar);


router.use(express.json());



  


export default router;
