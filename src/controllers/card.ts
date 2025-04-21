import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import { NotFoundError, ForbiddenError } from '../errors';
import { ErrorMessages, HttpStatus } from '../constants';

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    next(error);
  }
};

export const createCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, link } = req.body;

    // @ts-ignore
    const card = await Card.create({ name, link, owner: req.user._id });

    res.status(HttpStatus.CREATED).json(card);
  } catch (error) {
    next(error);
  }
};

export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findById(cardId);

    if (!card) {
      throw new NotFoundError(ErrorMessages.CARD_NOT_FOUND_ERROR);
    }

    // @ts-ignore
    if (card.owner.toString() !== req.user._id) {
      throw new ForbiddenError(ErrorMessages.FORBIDDEN_ERROR);
    }

    await card.deleteOne();

    res.status(HttpStatus.OK).json({ message: ErrorMessages.DELETE_CARD_RESPONSE });
  } catch (error) {
    next(error);
  }
};

export const putLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;

    // @ts-ignore
    const { _id } = req.user;
    const card = await Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true });

    if (!card) {
      throw new NotFoundError(ErrorMessages.CARD_NOT_FOUND_ERROR);
    }

    res.json(card);
  } catch (error) {
    next(error);
  }
};

export const deleteLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;

    // @ts-ignore
    const { _id } = req.user;
    const card = await Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true });

    if (!card) {
      throw new NotFoundError(ErrorMessages.CARD_NOT_FOUND_ERROR);
    }

    res.json(card);
  } catch (error) {
    next(error);
  }
};
