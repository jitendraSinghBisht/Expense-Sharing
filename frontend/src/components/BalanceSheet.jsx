// BalanceSheet.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance'; // Adjust based on your structure

const BalanceSheet = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axiosInstance.get('/api/expenses'); // Adjust the endpoint as needed
                setExpenses(response.data); // Assuming response.data is an array
            } catch (err) {
                console.error('Error fetching expenses:', err);
                setError(err.response?.data?.message || 'Error fetching expenses');
            } finally {
                setLoading(false);
            }
        };

        fetchExpenses();
    }, []);

    // Handle loading and error states
    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    // Check if expenses is an array before mapping
    if (!Array.isArray(expenses) || expenses.length === 0) {
        return <div>No expenses available.</div>;
    }

    return (
        <div className="balance-sheet">
            <h2 className="text-2xl font-bold mb-4">Balance Sheet</h2>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense.id} className="border p-2 mb-2">
                        <p>{expense.description}: {expense.amount}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BalanceSheet;
