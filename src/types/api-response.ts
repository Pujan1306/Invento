export interface Product {
    _id: string,
    name: string,
    price: number,
    rating: number,
    stockQuantity: number
    img: string
}

export interface expenseSummary {
    _id: string,
    totalExpenses: number,
    date: string
}

export interface purchaseSummary {
    _id: string,
    totalPurchased: number,
    changePercentage: number,
    date: string
}

export interface salesSummary {
    _id: string,
    totalValue: number,
    changePercentage: number,
    date: string
}

export interface ExpenseByCategory {
    _id: string,
    expenseSummaryId: string,
    date: string,
    category: string,
    amount: number
}

export interface ApiResponse {
    success: boolean,
    message: string,
    data?: any
}

export interface Expense {
    _id: string,
    category: string,
    amount: number,
    timestamp: string
}