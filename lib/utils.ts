import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function sendEmail(to: string, subject: string, body: string) {
  // Implement your email sending logic here
  // You can use a service like SendGrid, Mailgun, or NodeMailer
  console.log(`Sending email to ${to}:`, { subject, body })
}

