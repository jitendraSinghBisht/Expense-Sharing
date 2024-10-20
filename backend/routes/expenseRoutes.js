import express from 'express';
import { addExpense, getUserExpenses, getOverallExpenses } from '../controllers/expenseController.js';

const router = express.Router();

router.post('/', addExpense);
router.get('/user/:id', getUserExpenses);
router.get('/all', getOverallExpenses);

export default router;
