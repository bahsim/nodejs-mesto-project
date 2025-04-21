import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import { NotFoundError, BadRequestError } from '../errors';
import { HttpStatus } from '../constants';

const USER_NOT_FOUND_ERROR = 'Запрашиваемый пользователь не найден';
const BAD_REQUEST_ERROR = 'Необходимо заполнить все поля';

export const findUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
};

export const findUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError(USER_NOT_FOUND_ERROR);
    }
    return res.json(user);
  } catch (error) {
    return next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, about, avatar } = req.body;

    if (!name || !about || !avatar) {
      throw new BadRequestError(BAD_REQUEST_ERROR);
    }

    const user = await User.create({ name, about, avatar });
    return res.status(HttpStatus.CREATED).json(user);
  } catch (error) {
    return next(error);
  }
};

export const updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const { _id } = req.user;
    const { name, about } = req.body;

    if (!name || !about) {
      throw new BadRequestError(BAD_REQUEST_ERROR);
    }

    const user = await User.findByIdAndUpdate(_id, { name, about }, { new: true });

    if (!user) {
      throw new NotFoundError(USER_NOT_FOUND_ERROR);
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
      throw new BadRequestError(BAD_REQUEST_ERROR);
    }

    const user = await User.findByIdAndUpdate(_id, { avatar }, { new: true });

    if (!user) {
      throw new NotFoundError(USER_NOT_FOUND_ERROR);
    }

    return res.status(HttpStatus.OK).json(user);
  } catch (error) {
    return next(error);
  }
};
