"use client";

import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Expense } from "@/types/api-response";

type PieData = {
  name: string;
  value: number;
};

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

const CustomTooltip: React.FC<{ active?: boolean; payload?: any[] }> = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-lg border bg-popover p-3 shadow-md">
      <div className="grid grid-cols-2 gap-x-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground">Category</p>
          <p>{payload[0].name}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold text-muted-foreground">Amount</p>
          <p className="font-bold">{formatCurrency(payload[0].value)}</p>
        </div>
      </div>
    </div>
  );
};

export default function ExpensesDashboard({ expenses }: { expenses: Expense[] }) {
  const categories = ["All", ...Array.from(new Set(expenses.map(d => d.category)))];

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [startDate, setStartDate] = useState<string>("2020-01-01");
  const [endDate, setEndDate] = useState<string>("2023-12-31");

  const filteredData = expenses.filter(d => {
    const ts = d.timestamp.split("T")[0];
    const inCategory = selectedCategory === "All" || d.category === selectedCategory;
    const inDate = ts >= startDate && ts <= endDate;
    return inCategory && inDate;
  });

  const chartData: PieData[] = Object.values(
    filteredData.reduce((acc: Record<string, PieData>, item) => {
      if (!acc[item.category]) acc[item.category] = { name: item.category, value: 0 };
      acc[item.category].value += item.amount;
      return acc;
    }, {})
  );

  const totalAmount = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter expenses by category and date.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  
          <div className="w-full">
            <p className="text-sm font-medium">Category</p>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(c => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

    
          <div className="w-full">
            <DatePicker label="Start Date" value={startDate} onChange={setStartDate} />
          </div>


          <div className="w-full">
            <DatePicker label="End Date" value={endDate} onChange={setEndDate} />
          </div>
        </CardContent>
      </Card>


      <Card className="w-full lg:max-w-none lg:mx-0">
    <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <div>
            <CardTitle className="text-lg sm:text-xl">Expense Breakdown</CardTitle>
            <CardDescription className="text-sm sm:text-base">Distribution of expenses.</CardDescription>
        </div>
        <div className="text-left sm:text-right mt-2 sm:mt-0">
            <p className="text-xs font-semibold text-muted-foreground">Total Expenses</p>
            <p className="text-xl sm:text-2xl font-bold text-primary">{formatCurrency(totalAmount)}</p>
        </div>
    </CardHeader>

    <CardContent className="w-full h-[300px] sm:h-[400px] lg:h-[500px] px-4 sm:px-6 lg:px-8">
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="30%" 
                outerRadius="70%" 
                paddingAngle={2}
                stroke="var(--card)"
                strokeWidth={2}
                >
                {chartData.map((entry, index) => (
                    <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                    className="stroke-card hover:opacity-80 transition-opacity cursor-pointer"
                    />
                ))}
                </Pie>
                <Tooltip
                    content={<CustomTooltip />}
                    wrapperStyle={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                />
                <Legend
                verticalAlign="bottom"
                height={50} 
                wrapperStyle={{ marginTop: 20 }}
                iconType="circle"
                iconSize={12}
                formatter={(value) => <span className="text-sm sm:text-base">{value}</span>}
                />
            </PieChart>
            </ResponsiveContainer>
    </CardContent>
</Card>
    </div>
  );
}
