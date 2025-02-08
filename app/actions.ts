"use server"

import { revalidatePath } from "next/cache"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function getReviews() {
  const client = await clientPromise
  const db = client.db("portflow")
  const reviews = await db.collection("reviews").find().sort({ createdAt: -1 }).limit(10).toArray()
  return reviews
}

export async function addReview(review: {
  name: string
  role: string
  content: string
  rating: number
  userId: string
}) {
  const client = await clientPromise
  const db = client.db("portflow")
  const result = await db.collection("reviews").insertOne({
    ...review,
    createdAt: new Date(),
  })
  revalidatePath("/")
  return result
}

export async function deleteReview(id: string, userId: string) {
  const client = await clientPromise
  const db = client.db("portflow")
  const result = await db.collection("reviews").deleteOne({ _id: new ObjectId(id), userId })
  revalidatePath("/")
  return result
}

