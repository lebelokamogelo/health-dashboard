import KpiCard from "@/components/dashboard/KpiCard";
import Overview from "@/components/dashboard/PatientChart";
import { RecentPatient } from "@/components/dashboard/RecentPatient";
import { db } from "@/model/firebase";
import { collection, collectionGroup, getDocs, query, where } from "@firebase/firestore";
import React from "react";

export default async function Home() {

  const querySnapshot = async (searchCollections: string) => {
    const q = query(collection(db, searchCollections));
    const querySnapshot = await getDocs(q);

    return querySnapshot.size
  };

  const patient = await querySnapshot("patients")
  const doctor = await querySnapshot("doctors")

  return (
    <div>
      <div className="text-2xl font-medium heading text-slate-800">
        Dashboard
      </div>
      <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 kpicard 2xl:grid-cols-4">
        <KpiCard heading="Patients" total={patient} />
        <KpiCard heading="Doctors" total={doctor} />
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
