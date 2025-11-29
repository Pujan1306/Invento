import mongoose, { Schema, Document } from "mongoose";

interface Purchase extends Document {
    productId: Schema.Types.ObjectId,
    timestamp: Date,
    quantity: number,
    unitCost: number,
    totalCost: number
}

const PurchaseSchema: Schema<Purchase> = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  timestamp: { type: Date, default: Date.now },
  quantity: Number,
  unitCost: Number,
  totalCost: Number
});

const PurchaseModel = mongoose.models.Purchase || mongoose.model("Purchase", PurchaseSchema)

export default PurchaseModel
