'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DuesPendingData {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down';
}

const DuesPendingOrders = () => {
  const data: DuesPendingData[] = [
    { label: 'Dues', value: 252342, change: 1312, trend: 'up' },
    { label: 'Pending Orders', value: 147625, change: -562, trend: 'down' },
  ];

  const formatDate = () => {
    const date = new Date();
    const start = new Date(date.getFullYear(), date.getMonth(), 22);
    const end = new Date(date.getFullYear(), date.getMonth(), 29);
    
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric' 
    };
    
    const startStr = start.toLocaleDateString('en-US', options);
    const endStr = end.toLocaleDateString('en-US', options);
    
    return `${startStr} - ${endStr} ${date.getFullYear()}`;
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
        <CardTitle className="text-base font-semibold">Dues & Pending Orders</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">{formatDate()}</p>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <div className="h-full flex flex-col justify-center space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xl font-bold text-foreground">${formatNumber(item.value)}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span>{item.change > 0 ? '+' : ''}{item.change}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DuesPendingOrders;