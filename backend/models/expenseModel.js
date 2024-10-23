import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    splitMethod: {
        type: String,
        required: true,
        enum: ['equal', 'exact', 'percentage'],
    },
    participantsInfo: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        amountOwed: { type: Number },
        percentageOwed: { type: Number },
        isPaid: { type: Boolean },
      },
    ],
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expenses", expenseSchema);
export default Expense;
