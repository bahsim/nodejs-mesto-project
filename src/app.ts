import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import routes from './routes/index';
import { requestLogger } from './middlewares/request-logger';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());
app.use(routes);
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });
