import KpiCard from "@/components/dashboard/KpiCard";
import Overview from "@/components/dashboard/PatientChart";
import { RecentPatient } from "@/components/dashboard/RecentPatient";
import React from "react";

export default function Home() {
  return (
    <div>
      <div className="text-2xl font-medium heading text-slate-800">
        Dashboard
      </div>
      <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 kpicard 2xl:grid-cols-4">
        <KpiCard heading="Patients" total={12} />
        <KpiCard heading="Doctors" total={10} />
        <KpiCard heading="Appointments" total={2} />
        <KpiCard heading="Sales" total={400} />
      </div>
      <div className="grid grid-cols-1 h-[480px] gap-4 mt-4 space-y-4 xl:grid-cols-3 lg:space-y-0 overview">
        <div className="col-span-2">
          <Overview />
        </div>
        <RecentPatient />
      </div>
    </div>
  );
}
