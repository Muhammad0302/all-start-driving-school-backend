import express from 'express';
import verifyToken from '../middleware/verifyToken';

import {
    getAllpackagesAssigToStuds, createPackageAssigToStud, getPackageAssigToStudById, updatePackageAssigToStud, deletePackageAssigToStud
} from '../controllers/packageAssigToStudController';

const router = express.Router();
router.get('/get', verifyToken, getAllpackagesAssigToStuds);
router.post('/add', verifyToken, createPackageAssigToStud);
router.get('/getPackageAssigToStudById/:id', verifyToken, getPackageAssigToStudById);
router.put('/update/:id', verifyToken, updatePackageAssigToStud);
router.delete('/delete/:id', verifyToken, deletePackageAssigToStud);

export default router;