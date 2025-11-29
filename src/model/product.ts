import mongoose, {Schema, Document} from "mongoose";

interface Product extends Document {
    name: string,
    price: number,
    rating: number
    stockQuantity: number
    img: string
}

const ProductSchema: Schema<Product> = new Schema({
    name: {type:String, required: [true, "Name Is Required"]},
    price: {type:Number, required: [true, "Price Is Required"]},
    rating: {type:Number, required: [true, "Rating Is Required"]},
    stockQuantity: {type:Number, required: [true, "Stock Quantity Is Required"]},
    img: {type:String, required:[true, "Product Image Should Be Necessary"]}
})

const ProductModel = mongoose.models.Product || mongoose.model("Product", ProductSchema)

export default ProductModel;