
import mongoose, { Schema, Document } from "mongoose";

interface ExpenseSummary extends Document {
    totalExpenses: number,
    date: Date
}

const ExpenseSummarySchema: Schema<ExpenseSummary> = new Schema({
  totalExpenses: Number,
  date: Date
});

const ExpenseSummaryModel = mongoose.models.ExpenseSummary || mongoose.model("ExpenseSummary", ExpenseSummarySchema);

export default ExpenseSummaryModel
