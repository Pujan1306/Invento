'use client';

import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from 'recharts';
import { purchaseSummary } from '@/types/api-response';

export default function PurchaseSummary({ purchaseSummary }: { purchaseSummary: purchaseSummary[] }) {

  
  const data = purchaseSummary.map((item) => ({
    name: new Date(item.date).toLocaleDateString("en-US", { month: "numeric", day: "numeric" }),
    value: Number((item.totalPurchased / 1000000).toFixed(2)), // convert to millions
  }));

  const totalPurchased = purchaseSummary[0]?.totalPurchased || 0;
  const changePercentage = purchaseSummary[0]?.changePercentage || 0;

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
      <CardHeader className="pb-2 shrink-0">
        <CardTitle className="text-base font-semibold">Purchase Summary</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col overflow-hidden">


        <div className="mb-2 shrink-0">
          <p className="text-xs text-muted-foreground mb-0.5">Total Purchased</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-bold text-foreground">
              ${(totalPurchased / 1000000).toFixed(2)}M
            </h2>
            <span
              className={`text-xs font-medium flex items-center gap-1 ${
                changePercentage >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              <TrendingUp className="h-3 w-3" />
              {changePercentage}%
            </span>
          </div>
        </div>


        <div className="flex-1 w-full overflow-hidden">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id="colorPurchase" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
                tickFormatter={(value) => `$${value}m`}
              />
              <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'var(--muted)', opacity: 0.1 }} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--primary)"
                strokeWidth={1.5}
                fillOpacity={1}
                fill="url(#colorPurchase)"
                dot={{ r: 2, fill: "var(--primary)", strokeWidth: 1.5, stroke: "var(--background)" }}
                activeDot={{ r: 3 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
