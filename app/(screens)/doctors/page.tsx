import { db } from "@/model/firebase"
import { collection, getDocs } from "@firebase/firestore"
import ProfileDoctor from "./Profile"

export type Props = {
  name: string
  rating?: string
  image: string
  uuid: string
  experience?: string
  specializing: string
}

export default async function Profile() {
  const querySnapshot = await getDocs(collection(db, "doctors"))

  const data: Array<Props> = []

  querySnapshot.forEach((doc) => {
    data.push({
      name: doc.data().name,
      specializing: doc.data().specializing,
      uuid: doc.data().uuid,
      rating: doc.data().rating,
      image: doc.data().image,
      experience: doc.data().experience,
    })
  })

  return (
    <div className="doctor">
      <h4 className="text-xl">Doctors</h4>
      <div className="grid grid-cols-5 gap-3 mt-4">
        {data.map((doctor: Props) => (
          <ProfileDoctor key={doctor.uuid} data={doctor} />
        ))}
      </div>
    </div>
  )
}
