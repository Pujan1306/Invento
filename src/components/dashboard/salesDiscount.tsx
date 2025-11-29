'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { salesSummary, purchaseSummary } from '@/types/api-response';

interface SalesDiscountProps {
  salesSummary: salesSummary[];
  purchaseSummary: purchaseSummary[];
}

export default function SalesDiscount({ salesSummary = [], purchaseSummary = [] }: SalesDiscountProps) {
  const latestSales = salesSummary[0] || { totalValue: 0, changePercentage: 0, date: new Date().toISOString() };
  const latestPurchase = purchaseSummary[0] || { totalPurchased: 0 };


  const discountValue = (latestPurchase?.totalPurchased || 0) - (latestSales?.totalValue || 0);
  const discountChange = latestSales?.changePercentage ? latestSales.changePercentage / 2 : 0; // temp logic until real backend data
  const discountTrend: "up" | "down" = discountChange >= 0 ? "up" : "down";

  const data = [
    {
      label: "Sales",
      value: latestSales?.totalValue || 0,
      change: latestSales?.changePercentage || 0,
      trend: (latestSales?.changePercentage || 0) >= 0 ? "up" : "down",
    },
    {
      label: "Discount",
      value: discountValue > 0 ? discountValue : 0,
      change: Number(discountChange.toFixed(1)),
      trend: discountTrend,
    },
  ];

  const formatDate = () => {
    try {
      const date = new Date(latestSales?.date || new Date());
      return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    } catch (e) {
      return new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" });
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(3) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(3) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(3) + "K";
    return num.toString();
  }

  return (
    <Card className="h-full flex flex-col bg-card">
      <CardHeader className="pb-3 shrink-0">
        <CardTitle className="text-base font-semibold">Sales & Discount</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">{formatDate()}</p>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <div className="h-full flex flex-col justify-center space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xl font-bold">₹{formatNumber(item.value)}</p>
                </div>
              </div>

              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  item.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
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
