'use client';

import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';
import { expenseSummary } from '@/types/api-response';

const COLORS = ['#10B981', '#3B82F6', '#FBBF24', '#8B5CF6', '#EF4444', '#EC4899'];

export default function ExpenseSummary({ expenseSummary = [] }: { expenseSummary: expenseSummary[] }) {
  
  function formatNumber(num: number) {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  }

  const chartData = expenseSummary.map((item, index) => ({
    name: new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    }),
    value: item.totalExpenses,
    color: COLORS[index % COLORS.length],
  }));

  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const percentage = ((item.value / totalValue) * 100).toFixed(1);
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium">{item.name}</p>
          <p className="text-sm font-bold" style={{ color: item.color }}>
            ${item.value.toLocaleString()} ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-full flex flex-col bg-card">
      <CardHeader className="pb-2 shrink-0">
        <CardTitle className="text-base font-semibold">Expense Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <div className="relative h-[120px] w-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={50}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-sm font-bold text-foreground">
                ${formatNumber(totalValue)}
              </span>
              <span className="text-xs text-muted-foreground">Total</span>
            </div>
          </div>

          <div className="ml-3 flex flex-col gap-2">
            {chartData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-muted-foreground">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-border shrink-0">
          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="text-muted-foreground">Average: </span>
              <span className="font-medium text-foreground">
                ${formatNumber(Math.round(totalValue / chartData.length))}
              </span>
            </div>
            <div className="flex items-center gap-1 text-green-600 font-medium">
              <TrendingUp className="h-3 w-3" />
              <span>12%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

