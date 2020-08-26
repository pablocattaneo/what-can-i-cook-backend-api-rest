import { Router } from 'express';

import { getUserById, updateUserById } from '../controllers/user';

import { IsAuth } from '../middleware/is-auth';

const router = Router();

router.get('/user/:userId', IsAuth, getUserById);

router.post('/user/update/:userId', IsAuth, updateUserById);

export default router;
