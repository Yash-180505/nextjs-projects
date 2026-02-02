"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../lib/supabaseClient"

export default function AdminDashboard() {
  const [requests, setRequests] = useState([])
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    fetchRequests()
  }, [])

  async function checkAuth() {
    const { data } = await supabase.auth.getSession()
    if (!data.session) router.push("/admin/login")
  }

  async function fetchRequests() {
    const { data } = await supabase
      .from("service_requests")
      .select("*")
      .order("id", { ascending: false })

    setRequests(data || [])
  }

  // ⭐ OPTIMISTIC UPDATE (THIS IS THE KEY)
  async function updateStatus(id, newStatus) {
    // update UI first
    setRequests(prev =>
      prev.map(r =>
        r.id === id ? { ...r, status: newStatus } : r
      )
    )

    // update DB
    const { error } = await supabase
      .from("service_requests")
      .update({ status: newStatus })
      .eq("id", id)

    if (error) {
      alert("Failed to update")
      fetchRequests()
    }
  }

  return (
    <main className="max-w-7xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Service Requests</h2>

      <table className="w-full border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 border">Customer</th>
            <th className="p-3 border">Phone</th>
            <th className="p-3 border">Vehicle</th>
            <th className="p-3 border">Service</th>
            <th className="p-3 border">Pickup</th>
            <th className="p-3 border">Status</th>
          </tr>
        </thead>

        <tbody>
          {requests.map(r => (
            <tr key={r.id}>
              <td className="p-3 border">{r.customer_name}</td>
              <td className="p-3 border">{r.phone}</td>
              <td className="p-3 border">{r.vehicle_number}</td>
              <td className="p-3 border">{r.selected_service}</td>
              <td className="p-3 border">{r.pickup_slot}</td>
              <td className="p-3 border">
                <select
                  value={r.status}
                  onChange={(e) =>
                    updateStatus(r.id, e.target.value)
                  }
                  className="border px-2 py-1 rounded"
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
