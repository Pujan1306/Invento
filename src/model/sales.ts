import mongoose, {Schema, Document} from "mongoose";

interface Sales extends Document {
    productId: Schema.Types.ObjectId,
    timestamp: Date,
    quantity: number,
    unitPrice: number,
    totalAmount: number
}

const SalesSchema: Schema<Sales> = new Schema({
    productId: {type: Schema.Types.ObjectId, ref: "Product", required: true},
    timestamp: {type: Date, default: Date.now},
    quantity: {type: Number, required: true},
    unitPrice: {type: Number, required: true},
    totalAmount: {type: Number, required: true}
}) 

const SalesModel = mongoose.models.Sales || mongoose.model("Sales", SalesSchema)

export default SalesModel