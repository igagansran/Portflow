"use server"

import clientPromise from "./mongodb"
import { ObjectId } from "mongodb"

export async function getReviews() {
  const client = await clientPromise
  const db = client.db("portflow")
  return db.collection("reviews").find().sort({ createdAt: -1 }).limit(10).toArray()
}

export async function addReview(review: {
  name: string
  role: string
  content: string
  rating: number
}) {
  const client = await clientPromise
  const db = client.db("portflow")
  return db.collection("reviews").insertOne({
    ...review,
    createdAt: new Date(),
  })
}

export async function deleteReview(id: string) {
  const client = await clientPromise
  const db = client.db("portflow")
  return db.collection("reviews").deleteOne({ _id: new ObjectId(id) })
}

