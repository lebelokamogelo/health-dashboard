import { db } from "@/model/firebase"
import { doc, setDoc } from "@firebase/firestore"
import { Twilio } from "twilio"

const client = new Twilio(
  "AC8cfc678ad8337aff4b0074631f46db98",
  "bf522be35253ebd67428f700d0c392dc"
)

export async function POST(req: Request) {
  const { date, doctorId, id, name, place, status, time, doctorName, phone } =
    await req.json()

  try {
    await setDoc(
      doc(
        db,
        "appointments",
        "cc7d3055-0911-483a-b836-a9a84454b7b6",
        "appointment",
        id
      ),
      {
        date: date,
        doctorId: doctorId,
        id: id,
        name: doctorName,
        compliant: name,
        place: place,
        status: status,
        time: time,
        uuid: "cc7d3055-0911-483a-b836-a9a84454b7b6",
      }
    )

    const response = await client.messages.create({
      body: `Your appointment with ${doctorName} on ${date} at ${time} is confirmed. Your appointment ID is ${id}.`,
      to: phone,
      from: "+19786274042",
    })

    if (response.status === "queued") {
      return new Response(JSON.stringify({ status: "200" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    } else {
      throw new Error("Failed to send message")
    }
  } catch (error) {
    console.error("Error:", error)
    return new Response(JSON.stringify({ status: "401" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }
}
