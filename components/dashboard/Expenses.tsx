"use client";
import Chart from "react-google-charts";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import { Code } from "react-content-loader";

const data = [
  ["Month", "Sales"],
  ["Jan", 100],
  ["Feb", 200],
  ["Mar", 300],
  ["Apr", 350],
  ["May", 250],
  ["Jun", 300],
  ["Jul", 280],
];

export default function Expenses() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-medium">Monthly Expenses</CardTitle>
      </CardHeader>
      <div className="px-4 pb-4 graph">
        {isLoading && (
          <p className="h-[380px] flex items-center justify-center">
            <Code />
          </p>
        )}
        <Chart
          chartType="Bar"
          width="100%"
          height="380px"
          data={data}
          onLoad={() => setIsLoading((prev) => !prev)}
        />
      </div>
    </Card>
  );
}
