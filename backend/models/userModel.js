import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: [validator.isEmail, "Invalid Email"],
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: [validator.isMobilePhone, "Invalid Mobile Number"],
    },
    password: {
        type: String,
        required: true,
    },
    allExpenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }],
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema);
export default User;
