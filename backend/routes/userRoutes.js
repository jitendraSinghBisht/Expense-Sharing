import express from 'express';
import { createUser, getUserDetails } from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/:id', getUserDetails);

export default router;
