import { model, Schema } from 'mongoose';
import validator from 'validator';
import { urlPattern, UserDefaults } from '../constants';

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: UserDefaults.DEFAULT_NAME,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: UserDefaults.DEFAULT_ABOUT,
  },
  avatar: {
    type: String,
    default: UserDefaults.DEFAULT_AVATAR,
    validate: {
      validator: (v: string) => urlPattern.test(v),
      message: 'Invalid avatar URL format',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: UserDefaults.EMAIL_ERROR_MESSAGE,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  toJSON: {
    transform: (doc, ret) => ({
      name: ret.name,
      about: ret.about,
      avatar: ret.avatar,
      email: ret.email,
      _id: ret._id,
    }),
  },
});

export default model<IUser>('user', userSchema);
