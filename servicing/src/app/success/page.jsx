"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SuccessPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/")   // Redirect to Home
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="flex flex-col justify-center items-center min-h-[70vh] text-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-green-600 mb-3">
          ✅ Service Request Submitted!
        </h2>
        <p className="text-gray-600">
          Our mechanic will contact you soon.
        </p>
        <p className="text-sm text-gray-500 mt-3">
          Redirecting to home page...
        </p>
      </div>
    </main>
  )
}
