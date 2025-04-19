import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user';
import cardRouter from './routes/card';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });

app.use((req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  req.user = {
    _id: '68035871ec0fe55b8498687c',
  };
  next();
});

app.use(userRouter);
app.use(cardRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
