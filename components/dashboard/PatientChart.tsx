"use client";
import Chart from "react-google-charts";
import { Card } from "../ui/card";
import { useState } from "react";
import { Code } from "react-content-loader";

const data = [
  [
   "Monthly Patient",
   ""
  ],
  ["Jan", 10],
  ["Feb", 12],
  ["Mar", 20],
  ["Apr", 15],
  ["May", 18],
  ["Jun", 13],
  ["Jul", 12],
  ["Aug", 16]
];

export const options = {
  chart: {
    title: "Hospital Performance",
    subtitle: "Patient: 2023 to 2024",
  },
};

export default function PatientChart() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Card>
      <div className="p-8 graph">
        {isLoading && (
          <p className="h-[480px] flex items-center justify-center">
            <Code />
          </p>
        )}
        <Chart
          chartType="Line"
          width="100%"
          height="480px"
          data={data}
          options={options}
          onLoad={() => setIsLoading((prev) => !prev)}
        />
      </div>
    </Card>
  );
}
