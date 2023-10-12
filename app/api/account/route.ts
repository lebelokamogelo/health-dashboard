import { Twilio } from "twilio"

const client = new Twilio(
  "AC8cfc678ad8337aff4b0074631f46db98",
  "55f82e3849b2fa02c037d6d139cc53f1"
)

export async function POST(req: Request) {
  const { username, password, phone } = await req.json()

  try {
    const response = await client.messages.create({
      body: `Your account was created successfully. Username:  ${username} and Password: ${password}.`,
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
