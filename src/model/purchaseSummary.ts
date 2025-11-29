import mongoose, { Schema, Document } from "mongoose";

interface PurchaseSummary extends Document {
    totalPurchase: number,
    changePercent: number,
    date: Date
}

const PurchaseSummarySchema: Schema<PurchaseSummary> = new Schema({
  totalPurchase: Number,
  changePercent: Number,
  date: Date
});

const PurchaseSummaryModel = mongoose.models.PurchaseSummary || mongoose.model("PurchaseSummary", PurchaseSummarySchema)

export default PurchaseSummaryModel
