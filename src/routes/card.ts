import { Router } from 'express';
import {
  getCards, createCard, deleteCard, putLike, deleteLike,
} from '../controllers/card';

const router = Router();

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', putLike);
router.delete('/cards/:cardId/likes', deleteLike);

export default router;
