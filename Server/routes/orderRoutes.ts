import express from 'express';
import orderController from '../controller/orderController';

const router = express.Router();

router.post('/', orderController.reserveCar);



export default router;