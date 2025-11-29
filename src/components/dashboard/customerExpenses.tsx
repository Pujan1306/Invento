'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { expenseSummary, salesSummary } from '@/types/api-response';

export default function CustomerExpenses({
  salesSummary = [],
  expenseSummary = [],
}: {
  salesSummary: salesSummary[];
  expenseSummary: expenseSummary[];
}) {


  const lastSales = salesSummary[0]?.totalValue || 0;
  const prevSales = salesSummary[1]?.totalValue || 1;
  const salesChange = (((lastSales - prevSales) / prevSales) * 100).toFixed(1);
  const salesTrend: "up" | "down" = Number(salesChange) >= 0 ? "up" : "down";


  const lastExpense = expenseSummary[0]?.totalExpenses || 0;
  const prevExpense = expenseSummary[1]?.totalExpenses || 1;
  const expenseChange = (((lastExpense - prevExpense) / prevExpense) * 100).toFixed(1);
  const expenseTrend: "up" | "down" = Number(expenseChange) >= 0 ? "up" : "down";


  const data = [
    { label: 'Customer Growth', value: lastSales, change: Number(salesChange), trend: salesTrend },
    { label: 'Expenses', value: lastExpense, change: Number(expenseChange), trend: expenseTrend },
  ];

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };
  
    function formatNumber(num: number) {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(3) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(3) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(3) + "K";
    return num.toString();
  }

  return (
    <Card className="h-full flex flex-col bg-card">
      <CardHeader className="pb-3 shrink-0">
        <CardTitle className="text-base font-semibold">Customer & Expenses</CardTitle>
        <p className="text-xs text-muted-foreground">{formatDate()}</p>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <div className="h-full flex flex-col justify-center space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xl font-bold">${formatNumber(item.value)}</p>
                </div>
              </div>

              <div className={`flex items-center gap-1 text-sm font-medium ${
                item.trend === "up" ? "text-green-600" : "text-red-600"
              }`}>
                {item.trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span>{item.change > 0 ? "+" : ""}{item.change}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
