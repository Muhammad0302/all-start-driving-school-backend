import express from 'express';
import verifyToken from '../middleware/verifyToken';

import {
	addStudent,
	updateStudent,
	deleteStudent,
	getAllStudents,
} from '../controllers/studentController';

const router = express.Router();

//Room routes
router.post('/addStudent', verifyToken, addStudent);
router.put('/updateStudent/:id', verifyToken, updateStudent);
router.delete('/deleteStudent/:id', verifyToken, deleteStudent);
router.get('/getAllStudents', verifyToken, getAllStudents);
export default router;
