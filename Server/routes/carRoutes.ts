import express from "express";
import carContoller from "../controller/carContoller";
const router = express.Router();

router.get("/",carContoller.getAllCars);
router.post("/",carContoller.createCar);



router.use(express.json());



  


export default router;
