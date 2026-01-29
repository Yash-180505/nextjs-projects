"use client"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function AdminDashboard() {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    fetchRequests()
  }, [])

  async function fetchRequests() {
    const { data } = await supabase
      .from("service_requests")
      .select("*")
      .order("id", { ascending: false })

    setRequests(data || [])
  }

  // ✅ NEW FUNCTION — Update Status
  async function updateStatus(id, newStatus) {
    await supabase
      .from("service_requests")
      .update({ status: newStatus })
      .eq("id", id)

    fetchRequests()
  }

  return (
    <main className="max-w-6xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Service Requests</h2>

      <table className="w-full border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 border">Customer</th>
            <th className="p-3 border">Phone</th>
            <th className="p-3 border">Vehicle No</th>
            <th className="p-3 border">Service</th>
            <th className="p-3 border">Pickup Slot</th>
            <th className="p-3 border">Status</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td className="p-3 border">{r.customer_name}</td>
              <td className="p-3 border">{r.phone}</td>
              <td className="p-3 border">{r.vehicle_number}</td>
              <td className="p-3 border">{r.selected_service}</td>
              <td className="p-3 border">{r.pickup_slot}</td>

              {/* ✅ STATUS DROPDOWN */}
              <td className="p-3 border">
                <select
                  value={r.status}
                  onChange={(e) => updateStatus(r.id, e.target.value)}
                  className="border px-2 py-1 rounded"
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
