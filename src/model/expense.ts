
import mongoose, { Schema, Document } from "mongoose";

interface Expense extends Document {
    category: string,
    amount: number,
    timestamp: Date
}

const ExpenseSchema: Schema<Expense> = new Schema({
  category: { type: String, enum: ["rent", "salary", "maintenance", "other"] },
  amount: Number,
  timestamp: { type: Date, default: Date.now }
});

const ExpenseModel = mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema)

export default ExpenseModel
