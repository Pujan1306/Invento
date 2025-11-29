"use client"
import CustomerExpenses from "@/components/dashboard/customerExpenses";
import ExpenseSummary from "@/components/dashboard/expenseSummary";
import NavBar from "@/components/dashboard/navbar";
import DuesPendingOrders from "@/components/dashboard/pendingOreders";
import PopularProducts from "@/components/dashboard/popularProducts";
import PurchaseSummary from "@/components/dashboard/purchaseSummary";
import SalesDiscount from "@/components/dashboard/salesDiscount";
import SalesSummary from "@/components/dashboard/salesSummary";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardPage() {
    const [data, setData] = useState({
        popularProduct: [],
        salesSummary: [],
        purchaseSummary: [],
        expenseSummary: [],
        expenseByCategory: []
    })

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("/api/dashboardMetrices")
            setData(response.data)
        }
        fetchData()
    }, [])
    
    return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      
      <main className="container mx-auto p-3 md:p-4 lg:p-6 flex-1 overflow-hidden">
        {/* First Row - Main Dashboard */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 lg:gap-4 mb-3 lg:mb-4">
          
          {/* Left Column - Popular Products */}
          <div className="xl:col-span-4 order-2 xl:order-1">
            <div className="h-full">
              <PopularProducts popularProduct={data.popularProduct} />
            </div>
          </div>

          {/* Middle Column - Sales Summary */}
          <div className="xl:col-span-5 order-1 xl:order-2">
            <div className="h-full">
              <SalesSummary salesSummary={data.salesSummary} />
            </div>
          </div>

          {/* Right Column - Purchase & Expense */}
          <div className="xl:col-span-3 order-3 xl:order-3 flex flex-col gap-3 lg:gap-4 h-full">
            <div className="flex-1">
              <PurchaseSummary purchaseSummary={data.purchaseSummary} />
            </div>
            <div className="flex-1">
              <ExpenseSummary expenseSummary={data.expenseSummary} />
            </div>
          </div>

        </div>

        {/* Second Row - New Components */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 lg:gap-4">
          
          {/* Sales & Discount */}
          <div className="xl:col-span-4">
            <SalesDiscount salesSummary={data.salesSummary} purchaseSummary={data.purchaseSummary} />
          </div>

          {/* Dues & Pending Orders */}
          <div className="xl:col-span-4">
            <DuesPendingOrders />
          </div>

          {/* Customer & Expenses */}
          <div className="xl:col-span-4">
            <CustomerExpenses salesSummary={data.salesSummary} expenseSummary={data.expenseSummary} />
          </div>

        </div>
      </main>
    </div>
    );
}