import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/model/product";

export async function POST(request: Request) {
    try {
        await dbConnect()
        const { name, price, rating, stockQuantity, img} = await request.json()
        const newProduct = new ProductModel({
            name,
            price,
            rating,
            stockQuantity,
            img
        })
        if (!newProduct) {
            return new Response(JSON.stringify({
                success: false,
                message: "Failed to add product"
            }), {
                status: 500
            })
        }
        await newProduct.save()
        return new Response(JSON.stringify({
            success: true,
            message: "Product added sucessfully"
        }), {
            status: 200
        })
    } catch (error) {
            return new Response(JSON.stringify({
                success: false,
                message: error
            }), {
                status: 500
            })
    }
   
}