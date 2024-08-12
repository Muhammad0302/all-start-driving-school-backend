import express from 'express';
import verifyToken from '../middleware/verifyToken';
import {
	addInstructor,
	updateInstructor,
	deleteInstructor,
	getAllInstructors,
	getInstructorById,
	getAllUnassignedInstructor,
	getAllSoftInstructors,
	getAllInstructors1,
} from '../controllers/instructorController';

const router = express.Router();

//Room routes
router.post('/addinstructor', verifyToken, addInstructor);
router.put('/updateinstructor/:id', verifyToken, updateInstructor);
router.get('/getsingleinstructor/:id', verifyToken, getInstructorById);
router.delete('/deleteinstructor/:id', verifyToken, deleteInstructor);
router.get('/getallinstructors', verifyToken, getAllInstructors);
router.get('/getallinstructors1', verifyToken, getAllInstructors1);
router.get('/getallsoftinstructors', verifyToken, getAllSoftInstructors);
router.get(
	'/getAllUnassignedInstructor',
	verifyToken,
	getAllUnassignedInstructor
);
export default router;
