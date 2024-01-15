// routes/index.ts
import { Router } from 'express';
import bookRoutes from './bookRoutes';

const router = Router();
//TODO fix routes
router.use('/books', bookRoutes);

export default router;
