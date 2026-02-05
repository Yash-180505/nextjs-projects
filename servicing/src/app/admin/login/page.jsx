"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../lib/supabaseClient"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  async function handleLogin(e) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error) router.push("/admin/dashboard")
    else alert("Invalid login")
  }

  return (
    <main className="flex justify-center items-center min-h-[70vh]">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow w-96 space-y-4">
        <h2 className="text-xl font-bold text-center">Admin Login</h2>
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="input" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full bg-black text-white py-2 rounded">Login</button>
      </form>
    </main>
  )
}
