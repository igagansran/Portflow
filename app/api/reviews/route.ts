import { NextResponse } from "next/server"
import { getReviews, addReview } from "@/app/actions"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET() {
  try {
    const reviews = await getReviews()
    return NextResponse.json(reviews)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const reviewData = await request.json()
    reviewData.userId = session.user.id
    const result = await addReview(reviewData)
    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 })
  }
}

