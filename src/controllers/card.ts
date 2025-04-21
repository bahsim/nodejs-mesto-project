import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import { NotFoundError, BadRequestError } from '../errors';
import { HttpStatus } from '../constants';

const USER_NOT_FOUND_ERROR = 'Необходима авторизация';
const BAD_REQUEST_ERROR = 'Необходимо заполнить все поля';
const CARD_NOT_FOUND_ERROR = 'Карточка не найдена';
const DELETE_CARD_RESPONSE = 'Карточка удалена';

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    next(err);
  }
};

export const createCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, link } = req.body;

    if (!name || !link) {
      throw new BadRequestError(BAD_REQUEST_ERROR);
    }

    // @ts-ignore
    if (!req.user) {
      throw new BadRequestError(USER_NOT_FOUND_ERROR);
    }

    // @ts-ignore
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(HttpStatus.CREATED).json(card);
  } catch (err) {
    if (err instanceof BadRequestError) {
      throw err;
    }
    next(err);
  }
};

export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);

    if (!card) {
      throw new NotFoundError(CARD_NOT_FOUND_ERROR);
    }

    res.status(HttpStatus.OK).json({ message: DELETE_CARD_RESPONSE });
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw err;
    }
    next(err);
  }
};

export const putLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;

    if (!cardId) {
      throw new BadRequestError(BAD_REQUEST_ERROR);
    }

    // @ts-ignore
    const { _id } = req.user;
    const card = await Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true });

    if (!card) {
      throw new NotFoundError(CARD_NOT_FOUND_ERROR);
    }

    res.json(card);
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw err;
    }
    next(err);
  }
};

export const deleteLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;

    if (!cardId) {
      throw new BadRequestError(BAD_REQUEST_ERROR);
    }

    // @ts-ignore
    const { _id } = req.user;
    const card = await Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true });

    if (!card) {
      throw new NotFoundError(CARD_NOT_FOUND_ERROR);
    }

    res.json(card);
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw err;
    }
    next(err);
  }
};
