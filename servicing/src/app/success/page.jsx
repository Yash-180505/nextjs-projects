"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SuccessPage() {
  const router = useRouter()

  useEffect(() => {
    const t = setTimeout(() => router.push("/"), 3000)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className="flex justify-center items-center min-h-[70vh]">
      <div className="bg-white p-8 rounded-xl shadow text-center">
        <h2 className="text-2xl font-bold text-green-600">Service Request Submitted</h2>
        <p className="text-gray-500 mt-2">Redirecting to home...</p>
      </div>
    </main>
  )
}
