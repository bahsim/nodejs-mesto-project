import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index';

const app = express();

app.use(express.json());
app.use(router);

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
