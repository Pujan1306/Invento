import mongoose, { Schema, Document } from "mongoose";

interface ExpenseByCategory extends Document {
    expenseSummaryId: Schema.Types.ObjectId,
    date: Date,
    category: string,
    amount: number
}

const ExpenseByCategorySchema: Schema<ExpenseByCategory> = new Schema({
  expenseSummaryId: { type: Schema.Types.ObjectId, ref: "ExpenseSummary" },
  date: Date,
  category: String,
  amount: Number
});

const ExpenseByCategoryModel = mongoose.models.ExpenseByCategory || mongoose.model("ExpenseByCategory", ExpenseByCategorySchema)

export default ExpenseByCategoryModel
