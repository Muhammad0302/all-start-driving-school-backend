import express from 'express';
import verifyToken from '../middleware/verifyToken';

import {
    getAllInstructorPayments, createInstructorPayment, getInstructorPaymentById, updateInstructorPayment, deleteInstructorPayment
} from '../controllers/instructorPaymentController';

const router = express.Router();
router.get('/get', verifyToken, getAllInstructorPayments);
router.post('/add', verifyToken, createInstructorPayment);
router.get('/getInstructorPaymentById/:id', verifyToken, getInstructorPaymentById);
router.put('/update/:id', verifyToken, updateInstructorPayment);
router.delete('/delete/:id', verifyToken, deleteInstructorPayment);

export default router;