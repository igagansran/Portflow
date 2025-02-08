import { NextResponse } from "next/server"
import { deleteReview } from "@/app/actions"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const result = await deleteReview(params.id, session.user.id)

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Review not found or you're not authorized to delete it" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "An error occurred while deleting the review" }, { status: 500 })
  }
}

