import express from 'express';
import verifyToken from '../middlewares/auth.middleware.js';
import { addExpense, getOverallExpenses } from '../controllers/expenseController.js';

const router = express.Router();

router.route("/").post(verifyToken, addExpense);
router.route("/all").get(verifyToken, getOverallExpenses);

export default router;
