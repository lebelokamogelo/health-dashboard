import React from "react"
import { Card } from "../ui/card"
import { DollarSign, User2 } from "lucide-react"

type Props = {
  heading: string
  total: number
  percent: number
}

export default function KpiCard({ heading, total, percent }: Props) {
  return (
    <div className="card h-44">
      <Card className="px-8 py-4">
        <div className="text-xl font-medium content heading text-slate-600">
          {heading}
        </div>
        <div className="flex justify-between mt-4 content">
          <div className="space-y-6 left">
            <div className="text-2xl font-medium text-slate-800 total">
              {heading.toLowerCase() == "sales" ? (
                <span>$ {total}</span>
              ) : (
                <span>{total}</span>
              )}
            </div>
            <div className="flex items-center space-x-2 text-base text-slate-800 growth opacity-80">
              <span>{percent}%</span>
              <span>from previous month</span>
            </div>
          </div>
          <div className="icon">
            {heading.toLowerCase() == "sales" ? (
              <DollarSign height={28} width={28} />
            ) : heading.toLowerCase() == "appointments" ? (
              <></>
            ) : (
              <User2 height={28} width={28} />
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
