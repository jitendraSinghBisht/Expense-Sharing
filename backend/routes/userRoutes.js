import express from 'express';
import verifyToken from '../middlewares/auth.middleware.js';
import { createUser, getUserDetails, loginUser, getAllExpensesIdsOfUser } from '../controllers/userController.js';

const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(loginUser);

//Secured routes
router.route("/").get(verifyToken, getUserDetails);
router.route("/expenses").get(verifyToken, getAllExpensesIdsOfUser)

export default router;
