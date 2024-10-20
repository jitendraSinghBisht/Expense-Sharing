// HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
                {/* Card for Creating User */}
                <Link to="/create-user" className="hover:no-underline">
                    <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create User</h2>
                        <p className="text-gray-600">
                            Add new users with their details like name, email, and mobile number to start sharing expenses.
                        </p>
                        <div className="mt-6">
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                                Create User
                            </button>
                        </div>
                    </div>
                </Link>

                {/* Card for Adding Expense */}
                <Link to="/add-expense" className="hover:no-underline">
                    <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Expense</h2>
                        <p className="text-gray-600">
                            Record expenses and split them among users using equal, exact, or percentage-based methods.
                        </p>
                        <div className="mt-6">
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                                Add Expense
                            </button>
                        </div>
                    </div>
                </Link>

                {/* Card for Viewing Balance Sheet */}
                <Link to="/balance-sheet" className="hover:no-underline">
                    <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">View Balance Sheet</h2>
                        <p className="text-gray-600">
                            Check the overall expenses and balances between users for a clear understanding of shared costs.
                        </p>
                        <div className="mt-6">
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                                View Balance Sheet
                            </button>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
