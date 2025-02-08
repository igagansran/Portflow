import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { email, otp, newPassword } = await request.json()
    const client = await clientPromise
    const db = client.db("portflow")

    const storedOTP = await db.collection("otps").findOne({
      email,
      otp,
      createdAt: { $gte: new Date(Date.now() - 10 * 60 * 1000) }, // OTP valid for 10 minutes
    })

    if (!storedOTP) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await db.collection("users").updateOne({ email }, { $set: { password: hashedPassword } })
    await db.collection("otps").deleteMany({ email })

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Failed to reset password" }, { status: 500 })
  }
}

