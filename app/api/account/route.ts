import { Twilio } from "twilio"

const client = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export async function POST(req: Request) {
  const { username, password, phone } = await req.json()

  try {
    const response = await client.messages.create({
      body: `Your account was created successfully. Username:  ${username} and Password: ${password}.`,
      to: phone,
      from: process.env.TWILIO_PHONE_NUMBER,
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
