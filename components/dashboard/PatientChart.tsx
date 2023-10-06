"use client"
import { useState } from "react"
import { Code } from "react-content-loader"
import Chart from "react-google-charts"
import { Card } from "../ui/card"

const data = [
  ["Months", "Patients ..."],
  ["Apr", 3],
  ["May", 4],
  ["Jun", 2],
  ["Jul", 5],
  ["Aug", 6],
  ["Sep", 3],
  ["Oct", 1],
  ["Nov", 0],
  ["Dec", 0],
]

const options = {
  chart: {
    title: "Hospital Performance",
    subtitle: "Patient: 2023 to 2024",
  },
}

export default function PatientChart() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div>
      <Card>
        <div className="p-8 graph">
          {isLoading && (
            <p className="h-[480px] flex items-center justify-center">
              <Code />
            </p>
          )}
          <Chart
            chartType="Bar"
            width="100%"
            height="480px"
            data={data}
            options={options}
            onLoad={() => setIsLoading((prev) => !prev)}
          />
        </div>
      </Card>
    </div>
  )
}
