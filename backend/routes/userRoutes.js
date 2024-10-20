import express from 'express';
import verifyToken from '../middlewares/auth.middleware.js';
import { createUser, getUserDetails, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(loginUser);

//Secured routes
router.route('/:id').get(verifyToken, getUserDetails);
// router.route("/logout").post(verifyToken, logoutUser);

export default router;
