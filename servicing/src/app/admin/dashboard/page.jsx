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
      .order("created_at", { ascending: false })

    setRequests(data || [])
  }

  async function updateStatus(id, status) {
    const { error } = await supabase
      .from("service_requests")
      .update({ status })
      .eq("id", id)

    if (!error) {
      setRequests(prev =>
        prev.map(r =>
          r.id === id ? { ...r, status } : r
        )
      )
    }
  }

  function statusStyle(status) {
    if (status === "Completed") return "bg-green-100 text-green-700"
    if (status === "In Progress") return "bg-yellow-100 text-yellow-700"
    return "bg-gray-100 text-gray-700"
  }

  return (
    <main className="max-w-7xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Service Requests</h2>
        <button
          onClick={async () => {
            await supabase.auth.signOut()
            router.push("/")
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

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
                  disabled={r.status === "Completed"}
                  value={r.status}
                  onChange={e => updateStatus(r.id, e.target.value)}
                  className={`px-2 py-1 rounded ${statusStyle(r.status)}`}
                >
                  <option>New</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
