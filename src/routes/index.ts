import { Router } from 'express';
import { auth } from '../middlewares/auth';
import userRouter from './user';
import cardRouter from './card';
import { login, logout, createUser } from '../controllers/user';
import { validateCreateUser, validateLogin } from '../middlewares/validators';
import { NotFoundError } from '../errors';
import { ErrorMessages } from '../constants';

const router = Router();

// Public routes
router.post('/users/signup', validateCreateUser, createUser);
router.post('/users/signin', validateLogin, login);
router.post('/users/signout', logout);

// Protected routes
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError(ErrorMessages.PAGE_NOT_FOUND_ERROR));
});

export default router;
