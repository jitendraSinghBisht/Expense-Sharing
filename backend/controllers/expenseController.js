import Expense from '../models/expenseModel.js';

// Add a new expense
export const addExpense = async (req, res) => {
    const { description, amount, paidBy, participants, splitMethod } = req.body;

    try {
        // Validate splitMethod
        if (!['equal', 'exact', 'percentage'].includes(splitMethod)) {
            return res.status(400).json({ message: 'Invalid split method' });
        }

        let updatedParticipants;

        // Handle different split methods
        if (splitMethod === 'equal') {
            const splitAmount = amount / participants.length;
            updatedParticipants = participants.map(userId => ({
                user: userId,
                amountOwed: splitAmount,
            }));
        } else if (splitMethod === 'exact') {
            // Ensure each participant has a defined `amountOwed`
            updatedParticipants = participants;
        } else if (splitMethod === 'percentage') {
            const totalPercentage = participants.reduce((sum, p) => sum + p.percentage, 0);
            if (totalPercentage !== 100) {
                return res.status(400).json({ message: 'Total percentage must equal 100%' });
            }
            updatedParticipants = participants.map(p => ({
                user: p.user,
                amountOwed: (amount * p.percentage) / 100,
            }));
        }

        // Create the expense with the correct participant information
        const expense = new Expense({
            description,
            amount,
            paidBy,
            participants: updatedParticipants,
        });

        await expense.save();

        res.status(201).json({ message: 'Expense added successfully', expense });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add expense', error: error.message });
    }
};

// Retrieve expenses for a specific user
export const getUserExpenses = async (req, res) => {
    try {
        // Find all expenses where the current user is in the participants list
        const expenses = await Expense.find({ 'participants.user': req.params.id })
            .populate('paidBy', 'name email') // Populate paidBy user details
            .populate('participants.user', 'name email'); // Populate participant user details
        res.status(200).json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve user expenses', error: error.message });
    }
};

// Retrieve all expenses
export const getOverallExpenses = async (req, res) => {
    try {
        // Fetch all expenses and populate user details
        const expenses = await Expense.find()
            .populate('paidBy', 'name email') // Populate paidBy with name and email
            .populate('participants.user', 'name email'); // Populate participant user details
        res.status(200).json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve overall expenses', error: error.message });
    }
};
