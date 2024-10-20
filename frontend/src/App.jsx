import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './components/UserForm';
import ExpenseForm from './components/ExpenseForm';
import BalanceSheet from './components/BalanceSheet';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';

function App() {
    return (
        <Router>
            <div>
                <Navigation />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create-user" element={<UserForm />} />
                    <Route path="/add-expense" element={<ExpenseForm />} />
                    <Route path="/balance-sheet" element={<BalanceSheet />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
