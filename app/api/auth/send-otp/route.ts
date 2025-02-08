import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { generateOTP, sendEmail } from "@/lib/utils"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    const client = await clientPromise
    const db = client.db("portflow")
    const user = await db.collection("users").findOne({ email })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const otp = generateOTP()
    await db.collection("otps").insertOne({
      email,
      otp,
      createdAt: new Date(),
    })

    await sendEmail(email, "Password Reset OTP", `Your OTP for password reset is: ${otp}`)

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 })
  }
}

