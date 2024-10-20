import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const UserForm = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        mobile: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission using axios
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response =  axiosInstance.post('/api/users', userData);
            alert('User created successfully!');
            
            setUserData({ name: '', email: '', mobile: '' });
        } catch (err) {
            console.error('Error creating user:', err);
            setError(err.response?.data?.message || 'Error creating user');
        } finally {
            setLoading(false); // End loading state
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Create User</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                {/* Name input */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your name"
                        required
                    />
                </div>

                {/* Email input */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                {/* Mobile input */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="mobile">
                        Mobile:
                    </label>
                    <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        value={userData.mobile}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your mobile number"
                        required
                    />
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700"
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create User'}
                </button>
            </form>
        </div>
    );
};

export default UserForm;
