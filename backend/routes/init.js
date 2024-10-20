import expenseRoutes from "./expenseRoutes";
import userRoutes from "./userRoutes";

const router = express.Router();

router.route('/users', userRoutes);
router.route('/expenses', expenseRoutes);

export default router