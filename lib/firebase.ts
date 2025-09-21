import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcdef123456",
}

const validateFirebaseConfig = () => {
  const requiredFields = ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"]
  const missingFields = requiredFields.filter((field) => !firebaseConfig[field as keyof typeof firebaseConfig])

  if (missingFields.length > 0) {
    console.error("[v0] Missing Firebase configuration fields:", missingFields)
    throw new Error(`Missing Firebase configuration: ${missingFields.join(", ")}`)
  }

  const emptyFields = requiredFields.filter((field) => {
    const value = firebaseConfig[field as keyof typeof firebaseConfig]
    return !value || value.trim() === ""
  })

  if (emptyFields.length > 0) {
    console.error("[v0] Empty Firebase configuration fields:", emptyFields)
    throw new Error(`Empty Firebase configuration: ${emptyFields.join(", ")}`)
  }

  const isDemoConfig = firebaseConfig.apiKey === "demo-api-key"
  if (isDemoConfig) {
    console.warn(
      "[v0] Using demo Firebase configuration. Please set up your Firebase environment variables for production use.",
    )
  }
}

let app
try {
  validateFirebaseConfig()
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
} catch (error) {
  console.error("[v0] Firebase initialization error:", error)
  console.warn("[v0] Creating mock Firebase app for development")
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
}

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
