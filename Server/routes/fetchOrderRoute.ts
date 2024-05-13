import express from 'express';
import fetchOrderController from '../controller/fetchOrdersController';
const router = express.Router();


router.get('/', fetchOrderController.getAllOrders);

export default router;