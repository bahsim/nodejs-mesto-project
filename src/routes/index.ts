import {
  Router, Request, Response, NextFunction,
} from 'express';
import userRouter from './user';
import cardRouter from './card';
import { errorHandler } from '../middlewares/error-handler';

const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  req.user = {
    _id: '68035871ec0fe55b8498687c',
  };
  next();
});

router.use(userRouter);
router.use(cardRouter);

router.use(errorHandler);

export default router;
