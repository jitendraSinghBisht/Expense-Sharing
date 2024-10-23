import Expense from '../models/expenseModel.js';

export const addExpense = async (req, res) => {
    const { description, amount, participantsInfo, splitMethod } = req.body;   // paritcipantsInfo = {id,amountOwed,percentageOwed,isPaid}

    try {
        if (!['equal', 'exact', 'percentage'].includes(splitMethod)) {
            return res.status(400).json({ message: 'Invalid split method' });
        }

        let updatedParticipantsInfo;

        if (splitMethod === 'equal') {
            const splitAmount = amount / participantsInfo.length;
            updatedParticipantsInfo = participantsInfo.map(user => ({
                user: user.id,
                amountOwed: splitAmount,
                isPaid: user.isPaid || false,
            }));
        } else if (splitMethod === 'exact') {
            const totalAmount = participantsInfo.reduce((sum, user) => sum + user.amountOwed, 0);
            if (totalAmount !== amount) {
                return res.status(400).json({ message: 'Total amonut must be equal' });
            }
            updatedParticipantsInfo = participantsInfo.map(user => ({
                user: user.id,
                amountOwed: user.amountOwed,
                isPaid: user.isPaid || false,
            }));
        } else if (splitMethod === 'percentage') {
            const totalPercentage = participantsInfo.reduce((sum, user) => sum + user.percentageOwed, 0);
            if (totalPercentage !== 100) {
                return res.status(400).json({ message: 'Total percentage must equal 100%' });
            }
            updatedParticipantsInfo = participantsInfo.map(user => ({
                user: user.id,
                percentageOwed: user.percentageOwed,
                amountOwed: (amount * user.percentageOwed) / 100,
                isPaid: user.isPaid || false,
            }));
        }

        const expense = new Expense({
            createdBy: req.user.id,
            description,
            amount,
            splitMethod,
            participantsInfo: updatedParticipantsInfo,
        });

        await expense.save();

        res.status(201).json({ message: 'Expense added successfully', expense });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add expense', error: error.message });
    }
};

export const getOverallExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find().populate('participantsInfo.user', '_id');
        res.status(200).json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve overall expenses', error: error.message });
    }
};
