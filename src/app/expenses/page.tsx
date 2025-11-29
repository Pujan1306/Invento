"use client"
import { useEffect, useState } from "react";
import { Expense } from "@/types/api-response";
import ExpensePage from "@/components/dashboard/expenses/expensePage";
import NavBar from "@/components/dashboard/navbar";

export default function Expenses() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch("/api/getExpenses");
                const data = await response.json();
                setExpenses(data.expenses);
            } catch (error) {
                console.error('Error fetching expenses:', error)
            }
        };
        fetchExpenses();
    }, []);
    return (
        <div>
            <NavBar />
            <ExpensePage expenses={expenses} />
        </div>
    );
}