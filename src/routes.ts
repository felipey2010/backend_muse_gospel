import { Router } from 'express';
import {
  createSong,
  deleteSong,
  getSongById,
  getSongs,
  updateSong,
} from './controllers';

export const router = Router();

router.get('/songs', getSongs);
router.get('/song/:id', getSongById);
router.post('/song', createSong);
router.put('/song/:id', updateSong);
router.delete('/song/:id', deleteSong);
