"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../lib/supabaseClient"

export default function BookService() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    address: "",
    vehicle_number: "",
    vehicle_type: "",
    selected_service: "",
    pickup_slot: ""
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (loading) return

    setLoading(true)

    const { error } = await supabase
      .from("service_requests")
      .insert([{ ...form, status: "New" }])

    setLoading(false)

    if (!error) router.push("/success")
    else alert("Submission failed")
  }

  return (
    <main className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Book Service</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="input" name="customer_name" placeholder="Name" onChange={handleChange} required />
        <input className="input" name="phone" placeholder="Phone" onChange={handleChange} required />
        <input className="input" name="address" placeholder="Address" onChange={handleChange} required />
        <input className="input" name="vehicle_number" placeholder="Vehicle No" onChange={handleChange} required />

        <select className="input" name="vehicle_type" onChange={handleChange} required>
          <option value="">Vehicle</option>
          <option>Car</option>
          <option>Bike</option>
        </select>

        <select className="input" name="selected_service" onChange={handleChange} required>
          <option value="">Service</option>
          <option>Oil Change</option>
          <option>General Service</option>
          <option>Brake Repair</option>
        </select>

        <input type="time" className="input" name="pickup_slot" onChange={handleChange} required />

        <button
          disabled={loading}
          className="w-full bg-orange-500 text-white py-2 rounded disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </main>
  )
}
