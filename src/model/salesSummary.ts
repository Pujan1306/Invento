import mongoose, { Schema, Document } from "mongoose";

interface SalesSummary extends Document {
    totalValue: number,
    changePercentage: number,
    date: Date
}

const SalesSummarySchema: Schema<SalesSummary> = new Schema({
  totalValue: Number,
  changePercentage: Number,
  date: Date
});

const SalesSummaryModel = mongoose.models.SalesSummary || mongoose.model("SalesSummary", SalesSummarySchema)

export default SalesSummaryModel
