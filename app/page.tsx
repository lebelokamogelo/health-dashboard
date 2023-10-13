import KpiCard from "@/components/dashboard/KpiCard"
import Overview from "@/components/dashboard/PatientChart"
import { RecentPatient } from "@/components/dashboard/RecentPatient"
import { db } from "@/model/firebase"
import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
} from "@firebase/firestore"

export default async function Home() {
  const querySnapshot = async (searchCollections: string) => {
    const q = query(collection(db, searchCollections))
    const querySnapshot = await getDocs(q)

    return querySnapshot.size
  }

  const salesAmmount = async () => {
    const docRef = doc(db, "sales", "BNqAM4fXY8PeBAGHjUj2")
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data().amount
    }
    return "400"
  }

  const patient = await querySnapshot("patients")
  const doctor = await querySnapshot("doctors")
  const apppointments = (await getDocs(collectionGroup(db, "appointment"))).size
  const sales = (await salesAmmount()).toString()

  const percentage = (patient: any, prevMonth: any) => {
    if (patient >= prevMonth) {
      return Math.round(((patient - prevMonth) / prevMonth) * 100)
    }

    return Math.round(((prevMonth - patient) / prevMonth) * 100)
  }

  return (
    <div>
      <div className="text-xl font-medium heading text-slate-800">
        Dashboard
      </div>
      <div className="grid grid-cols-1 gap-3 mt-4 md:grid-cols-2 kpicard 2xl:grid-cols-4">
        <KpiCard
          heading="Patients"
          total={patient}
          percent={percentage(patient, 3)}
        />
        <KpiCard heading="Doctors" total={doctor} percent={14} />
        <KpiCard
          heading="Appointments"
          total={apppointments}
          percent={percentage(patient, 4)}
        />
        <KpiCard heading="Sales" total={sales} percent={26} />
      </div>
      <div className="grid grid-cols-1 h-[480px] gap-3 space-y-4 xl:grid-cols-3 lg:space-y-0 overview">
        <div className="col-span-2">
          <Overview />
        </div>
        <RecentPatient />
      </div>
    </div>
  )
}
