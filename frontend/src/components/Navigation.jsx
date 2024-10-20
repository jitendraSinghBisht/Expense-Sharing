// Navigation.jsx

import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="bg-indigo-600 p-4 text-white">
            <div className="max-w-7xl mx-auto flex justify-between">
                <div className="font-semibold text-xl">
                    <Link to="/" className="hover:text-gray-300">
                        Expense Sharing App
                    </Link>
                </div>
                {/* <ul className="flex space-x-4">
                    <li>
                        <Link to="/create-user" className="hover:underline">Create User</Link>
                    </li>
                    <li>
                        <Link to="/add-expense" className="hover:underline">Add Expense</Link>
                    </li>
                    <li>
                        <Link to="/balance-sheet" className="hover:underline">Balance Sheet</Link>
                    </li>
                </ul> */}
            </div>
        </nav>
    );
};

export default Navigation;
