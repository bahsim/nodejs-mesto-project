import { Router } from 'express';
import {
  findUsers,
  findUser,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUser,
} from '../controllers/user';
import {
  validateUpdateAvatar,
  validateUpdateUser,
  validateUserId,
} from '../middlewares/validators';

const router = Router();

router.get('/', findUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateUserId, findUser);
router.patch('/me', validateUpdateUser, updateUserProfile);
router.patch('/me/avatar', validateUpdateAvatar, updateUserAvatar);

export default router;
