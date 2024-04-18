import express from 'express';
import verifyToken from '../middleware/verifyToken';

import {
	getAllpackagesAssigToStuds,
	createPackageAssigToStud,
	getPackageAssigToStudById,
	updatePackageAssigToStud,
	getStudentsByInstructor,
	getInstructorsByStudent,
	deletePackageAssigToStud,
	getAssignPackageByStdId,
} from '../controllers/packageAssigToStudController';

const router = express.Router();
router.get('/get', verifyToken, getAllpackagesAssigToStuds);
router.post('/add', verifyToken, createPackageAssigToStud);
router.get(
	'/getPackageAssigToStudById/:id',
	verifyToken,
	getPackageAssigToStudById
);
router.get('/getPackageByStdId/:id', verifyToken, getAssignPackageByStdId);
router.put('/update/:id', verifyToken, updatePackageAssigToStud);
router.get(
	'/getStudentsByInstructor/:id',
	verifyToken,
	getStudentsByInstructor
);
router.get(
	'/getInstructorsByStudent/:id',
	verifyToken,
	getInstructorsByStudent
);
router.delete('/delete/:id', verifyToken, deletePackageAssigToStud);

export default router;
