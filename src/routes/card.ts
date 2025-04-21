import { Router } from 'express';
import {
  getCards, createCard, deleteCard, putLike, deleteLike,
} from '../controllers/card';
import { validateCardId, validateCreateCard } from '../middlewares/validators';

const router = Router();

router.get('/', getCards);
router.post('/', validateCreateCard, createCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/:cardId/likes', validateCardId, putLike);
router.delete('/:cardId/likes', validateCardId, deleteLike);

export default router;
