import express from 'express';
import verifyToken from '../middleware/verifyToken';

import {
	addStudent,
	updateStudent,
	deleteStudent,
	getAllStudents,
	stdAssignToInstructor,
	editStdAssignToInstructor,
	updateStdAssignToInstructor,
	getAllStdAssignToInstructor,
	deleteStdAssignToInstructor,
	getStudentById,
	getAllUnAssignedStudents,
} from '../controllers/studentController';

const router = express.Router();

//Room routes
router.post('/addStudent', verifyToken, addStudent);
router.put('/updateStudent/:id', verifyToken, updateStudent);
router.delete('/deleteStudent/:id', verifyToken, deleteStudent);
router.get('/getAllStudents', verifyToken, getAllStudents);
router.get('/getAllUnAssignStudents', verifyToken, getAllUnAssignedStudents);

router.post('/stdAssignToInstructor', verifyToken, stdAssignToInstructor);
router.get(
	'/editStdAssignToInstructor/:id',
	verifyToken,
	editStdAssignToInstructor
);
router.get('/getStudentById/:id', verifyToken, getStudentById);
router.post(
	'/updateStdAssignToInstructor/:id',
	verifyToken,
	updateStdAssignToInstructor
);
router.get(
	'/getAllStdAssignToInstructor',
	verifyToken,
	getAllStdAssignToInstructor
);
router.delete(
	'/deleteStdAssignToInstructor/:id',
	verifyToken,
	deleteStdAssignToInstructor
);

export default router;
