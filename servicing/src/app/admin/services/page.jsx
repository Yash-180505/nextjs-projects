"use client"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function AdminServices() {
  const [services, setServices] = useState([])

  useEffect(() => {
    fetchServices()
  }, [])

  async function fetchServices() {
    const { data } = await supabase.from("services").select("*").order("id")
    setServices(data || [])
  }

  async function updatePrice(id, price) {
    await supabase.from("services").update({ price }).eq("id", id)
    fetchServices()
  }

  return (
    <main className="max-w-4xl mx-auto bg-white p-8 mt-10 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-6">Manage Services</h2>
      <table className="w-full border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 border">Service</th>
            <th className="p-3 border">Vehicle</th>
            <th className="p-3 border">Price</th>
          </tr>
        </thead>
        <tbody>
          {services.map(s => (
            <tr key={s.id}>
              <td className="p-3 border">{s.service_name}</td>
              <td className="p-3 border">{s.vehicle_type}</td>
              <td className="p-3 border">
                <input
                  type="number"
                  value={s.price}
                  onChange={e => updatePrice(s.id, e.target.value)}
                  className="border px-2 py-1 rounded w-24"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
