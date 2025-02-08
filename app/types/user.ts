// app/types/user.ts
import { ObjectId } from "mongodb"

export interface User {
  _id: ObjectId
  email: string
  password: string
  name?: string
  createdAt?: Date
  updatedAt?: Date
  // Add any other user fields you need
}

// You can also add additional types related to users
export interface UserLoginCredentials {
  email: string
  password: string
}

export interface UserResponse {
  id: string
  email: string
  name?: string
  // Add other fields you want to return to the client
  // but never include password or sensitive data
}