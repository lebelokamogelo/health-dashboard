import { db } from "@/model/firebase"
import { collection, getDocs } from "@firebase/firestore"

type Props = {
  uuid: string
  name: string
  email: string
  phone: string
}

export async function GET() {
  const querySnapshot = await getDocs(collection(db, "patients"))

  const data: Array<Props> = []

  querySnapshot.forEach((doc) => {
    data.push({
      uuid: doc.data().uuid,
      name: doc.data().name,
      email: doc.data().email,
      phone: doc.data().phone,
    })
  })

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
