import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/model/product";

export async function GET() {
    try {
        await dbConnect()
        const data = await ProductModel.find()
        return new Response(JSON.stringify({
            success: true,
            products: data
        }))
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: error
        }))
    }
}