"use client"
import { useRouter } from "next/navigation"
import { supabase } from "../lib/supabaseClient"

export default function Navbar() {
  const router = useRouter()

  async function goToAdmin() {
    const { data } = await supabase.auth.getSession()
    if (data.session) router.push("/admin/dashboard")
    else router.push("/admin/login")
  }

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold">QuickRide Service</h1>

      <div className="flex gap-4 text-sm">
        <a href="/">Home</a>
        <a href="/book-service">Book Service</a>
        <button onClick={goToAdmin}>Admin</button>
      </div>
    </nav>
  )
}
