'use client';

import { TrendingUp, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from 'recharts';
import { salesSummary } from '@/types/api-response';

export default function SalesSummary({ salesSummary }: { salesSummary: salesSummary[] }) {

  const data = salesSummary.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-US", { month: "numeric", day: "numeric" }),
    value: Number((item.totalValue / 1000000).toFixed(2)), // value in millions
  }));

  const totalValue = salesSummary[0]?.totalValue || 0;
  const changePercentage = salesSummary[0]?.changePercentage || 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm font-bold text-primary">
            ${payload[0].value}m
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-full flex flex-col bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2 shrink-0">
        <CardTitle className="text-base font-semibold">Sales Summary</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col overflow-hidden">


        <div className="mb-3 flex items-center justify-between shrink-0">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Total Value</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl font-bold text-foreground">
                ${(totalValue / 1000000).toFixed(2)}M
              </h2>
              <span className={`text-xs font-medium flex items-center gap-1
                ${changePercentage >= 0 ? "text-green-600" : "text-red-600"}`}>
                <TrendingUp className="h-3 w-3" />
                {changePercentage}%
              </span>
            </div>
          </div>
        </div>


        <div className="flex-1 w-full overflow-hidden">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="var(--border)" 
                className="opacity-30"
              />
              <XAxis 
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
                dy={6}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
                tickFormatter={(value) => `$${value}m`}
                domain={[0, 8]}
                ticks={[0, 2, 4, 6, 8]}
              />
              <RechartsTooltip 
                content={<CustomTooltip />} 
                cursor={{ fill: 'var(--muted)', opacity: 0.1 }} 
              />
              <Bar dataKey="value" fill="var(--primary)" radius={[2, 2, 0, 0]} maxBarSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>


        <div className="mt-2 pt-2 border-t border-border shrink-0">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Last 5 days</span>
            <span className="font-medium text-foreground">
              Peak: <span className="text-primary font-bold">
                {new Date(salesSummary[0]?.date).toLocaleDateString()}
              </span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

