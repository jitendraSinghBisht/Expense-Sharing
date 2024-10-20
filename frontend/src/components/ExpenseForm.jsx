// BalanceSheet.jsx

import React from 'react';

const BalanceSheet = ({ expenses }) => {
    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">Balance Sheet</h2>
            <div className="space-y-4">
                {expenses && expenses.length > 0 ? (
                    expenses.map((expense, index) => (
                        <div key={index} className="border p-4 rounded-md bg-gray-50 shadow-sm">
                            <h3 className="text-lg font-medium">Expense: {expense.description}</h3>
                            <p className="text-sm text-gray-700">Amount: ${expense.amount}</p>
                            <p className="text-sm text-gray-700">Paid By: {expense.paidBy.name}</p>
                            <div className="mt-2">
                                <h4 className="font-semibold">Participants:</h4>
                                <ul className="list-disc pl-5 text-gray-700">
                                    {expense.participants.map((participant, idx) => (
                                        <li key={idx}>{participant.user.name} owes ${participant.amountOwed}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No expenses available.</p>
                )}
            </div>
        </div>
    );
};

export default BalanceSheet;
