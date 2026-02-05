"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../lib/supabaseClient"

export default function AdminGate() {
  const router = useRouter()

  useEffect(() => {
    check()
  }, [])

  async function check() {
    const { data } = await supabase.auth.getSession()
    if (data.session) router.replace("/admin/dashboard")
    else router.replace("/admin/login")
  }

  return null
}
