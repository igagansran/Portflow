// app/api/auth/login/route.ts
"use server"

import { NextResponse } from "next/server"
import clientPromise from "@/app/lib/mongodb"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { ObjectId } from "mongodb"

export async function POST(request: Request) {
  let client;
  try {
    // Get request data
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" }, 
        { status: 400 }
      )
    }

    // Connect to MongoDB
    client = await clientPromise
    const db = client.db("portflow")
    
    // Find user
    const user = await db.collection("users").findOne({ 
      email: email.toLowerCase() 
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" }, 
        { status: 404 }
      )
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" }, 
        { status: 401 }
      )
    }

    // Verify JWT secret exists
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined')
    }

    // Generate token
    const token = jwt.sign(
      { 
        userId: user._id.toString(),
        email: user.email 
      }, 
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    // Return success response
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        // Add other non-sensitive user data you want to return
      }
    })

  } catch (error) {
    console.error('Authentication error:', error)
    return NextResponse.json(
      { error: "Authentication failed" }, 
      { status: 500 }
    )
  }
}