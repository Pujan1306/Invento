import dbConnect from "@/lib/dbConnect";
import ExpenseModel from "@/model/expense";

export async function GET() {
    try {
        await dbConnect()
        const data = await ExpenseModel.find()
        return new Response(JSON.stringify({
            success: true,
            expenses: data
        }))
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: error
        }))
    }
}