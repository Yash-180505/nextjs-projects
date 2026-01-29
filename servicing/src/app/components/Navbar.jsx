"use client"
import { supabase } from "../lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const router = useRouter()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  return (
    <nav className="bg-black text-white px-4 py-4 flex justify-between items-center">
      <h1 className="font-bold">QuickRide Service</h1>

      <div className="flex gap-4 text-sm">
        <a href="/">Home</a>
        <a href="/book-service">Book Service</a>
        <a href="/admin/dashboard">Admin</a>

        {/* Logout button */}
        <button 
          onClick={handleLogout}
          className="bg-orange-500 px-3 py-1 rounded-md"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
