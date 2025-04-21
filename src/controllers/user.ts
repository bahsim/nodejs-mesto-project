import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import {
  NotFoundError, BadRequestError, UnauthorizedError, ConflictError,
} from '../errors';
import { HttpStatus, JWT_SECRET, ErrorMessages } from '../constants';

export const findUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
};

export const findUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError(ErrorMessages.USER_NOT_FOUND_ERROR);
    }
    return res.json(user);
  } catch (error) {
    return next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;

    if (!name || !about || !avatar || !email || !password) {
      throw new BadRequestError(ErrorMessages.BAD_REQUEST_ERROR);
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name, about, avatar, email, password: hash,
    });

    return res.status(HttpStatus.CREATED).json(user);
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 11000) {
      return next(new ConflictError(ErrorMessages.USER_ALREADY_EXISTS_ERROR));
    }

    return next(error);
  }
};

export const updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const { _id } = req.user;
    const { name, about } = req.body;

    if (!name || !about) {
      throw new BadRequestError(ErrorMessages.BAD_REQUEST_ERROR);
    }

    const user = await User.findByIdAndUpdate(_id, { name, about }, { new: true });

    if (!user) {
      throw new NotFoundError(ErrorMessages.USER_NOT_FOUND_ERROR);
    }

    return res.status(HttpStatus.OK).json(user);
  } catch (error) {
    return next(error);
  }
};

export const updateUserAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const { _id } = req.user;
    const { avatar } = req.body;

    if (!avatar) {
      throw new BadRequestError(ErrorMessages.BAD_REQUEST_ERROR);
    }

    const user = await User.findByIdAndUpdate(_id, { avatar }, { new: true });

    if (!user) {
      throw new NotFoundError(ErrorMessages.USER_NOT_FOUND_ERROR);
    }

    return res.status(HttpStatus.OK).json(user);
  } catch (error) {
    return next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new UnauthorizedError(ErrorMessages.USER_NOT_FOUND_ERROR);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError(ErrorMessages.USER_NOT_FOUND_ERROR);
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.cookie('jwt', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'strict',
    });

    return res.status(HttpStatus.OK).send({ message: ErrorMessages.LOGIN_SUCCESS_MESSAGE });
  } catch (error) {
    return next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('jwt');
    return res.status(HttpStatus.OK).send({ message: ErrorMessages.LOGOUT_SUCCESS_MESSAGE });
  } catch (error) {
    return next(error);
  }
};

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const { _id } = req.user;

    const user = await User.findById(_id);

    if (!user) {
      throw new NotFoundError(ErrorMessages.USER_NOT_FOUND_ERROR);
    }

    return res.status(HttpStatus.OK).json(user);
  } catch (error) {
    return next(error);
  }
};
