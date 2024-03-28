// routes/index.ts
import express from 'express';
import userRoutes from './userRoutes';
import instructorRoutes from './instructorRoutes';
import studentRoutes from './studentRoute';
import packageRoutes from './packageRoutes';


const router = express.Router();

// Mount user routes under '/user'
router.use('/user', userRoutes);
// Mount room routes under '/room'
router.use('/instructor', instructorRoutes);
// Mount reservation routes under '/room'
router.use('/student', studentRoutes);

router.use('/package', packageRoutes);



export default router;
