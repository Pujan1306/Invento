import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/model/product";

export async function DELETE(request: Request) {
    try {
        await dbConnect()
        const {ids} = await request.json()
        await ProductModel.deleteMany({ _id: { $in: ids } })
        return new Response(JSON.stringify({
            success: true,
            message: "Product deleted successfully"
        }), {
            status: 200
        })
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: error 
        }), {
            status: 500
        })
    }
}