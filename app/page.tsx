import KpiCard from "@/components/dashboard/KpiCard";
import Overview from "@/components/dashboard/Expenses";
import { RecentSales } from "@/components/dashboard/RecentSales";
import React from "react";

export default function Home() {
  return (
    <div>
      <div className="text-2xl font-medium heading">Dashboard</div>
      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 kpicard 2xl:grid-cols-4">
        <KpiCard heading="Patients" total={12} />
        <KpiCard heading="Doctors" total={10} />
        <KpiCard heading="Appointments" total={2} />
        <KpiCard heading="Sales" total={400} />
      </div>
      <div className="grid grid-cols-1 h-[470px] gap-4 mt-4 space-y-4 xl:grid-cols-2 lg:space-y-0 overview">
        <Overview />
        <RecentSales />
      </div>
    </div>
  );
}
