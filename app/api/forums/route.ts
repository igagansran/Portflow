import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("portflow")
    const forums = await db.collection("forums").find({}).toArray()
    return NextResponse.json(forums)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Failed to fetch forums" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { category, title, content, author } = await request.json()
    const client = await clientPromise
    const db = client.db("portflow")
    const result = await db.collection("forums").insertOne({
      category,
      title,
      content,
      author,
      createdAt: new Date(),
    })
    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Failed to create forum post" }, { status: 500 })
  }
}

