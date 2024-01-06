import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAPIResults,
  sendFavData,
  getUserFavs,
  deleteFav,
} from '../controllers/userController.js';

import { protect } from '../middleware/authMiddleware.js';

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.post('/search', getAPIResults);
router.post('/addFav', sendFavData);
router.post('/getFavs', getUserFavs);
router.post('/deleteFav', deleteFav);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
