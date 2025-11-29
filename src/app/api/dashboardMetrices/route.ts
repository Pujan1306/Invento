import dbConnect from "@/lib/dbConnect";
import SalesSummaryModel from "@/model/salesSummary";
import PurchaseSummaryModel from "@/model/purchaseSummary";
import ExpenseSummaryModel from "@/model/expenseSummary";
import ExpenseByCategoryModel from "@/model/expenseByCategory";
import ProductModel from "@/model/product";


export async function GET() {
    try {
        await dbConnect()
        const popularProduct = await ProductModel.find({}).sort({rating: -1}).limit(15)
        const salesSummary = await SalesSummaryModel.find({}).sort({date: -1}).limit(5)
        const purchaseSummary = await PurchaseSummaryModel.find({}).sort({date: -1}).limit(5)
        const expenseSummary = await ExpenseSummaryModel.find({}).sort({date: -1}).limit(5)
        const expenseByCategory = await ExpenseByCategoryModel.find({}).sort({date: -1}).limit(5)
        return new Response(JSON.stringify({
            success: true,
            popularProduct,
            salesSummary,
            purchaseSummary,
            expenseSummary,
            expenseByCategory
        }), {
            status: 200
        })
    }
    catch (error){
        console.log(error)
        return new Response(JSON.stringify({
            success: false,
            error: "Failed to fetch Dashboard Data"
        }), {
            status: 500
        })
    }
}