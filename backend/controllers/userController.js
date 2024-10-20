import User from '../models/userModel.js';
import bcrypt from "bcryptjs";


export const createUser = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
        console.log(`name: ${name}, email: ${email}, mobile: ${mobile}, password: ${password}`)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, mobile, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    
        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    
        // Generate JWT token
        const token = jwt.sign({ id: user._id ,email: user.email }, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password -allExpenses");
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllExpensesIdsOfUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password -name -email -number");
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
