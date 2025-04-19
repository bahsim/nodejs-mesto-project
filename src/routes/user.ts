import { Router } from 'express';
import {
  findUsers, findUser, createUser, updateUserProfile, updateUserAvatar,
} from '../controllers/user';

const router = Router();

router.get('/users', findUsers);
router.get('/users/:userId', findUser);
router.post('/users', createUser);
router.patch('/users/me', updateUserProfile);
router.patch('/users/me/avatar', updateUserAvatar);

export default router;
