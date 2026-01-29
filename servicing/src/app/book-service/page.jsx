"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../lib/supabaseClient"

export default function BookService() {

  const router = useRouter()   // ✅ Router here

  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    address: "",
    vehicle_number: "",
    vehicle_type: "",
    selected_service: "",
    pickup_slot: ""
  })

  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase
      .from("service_requests")
      .insert([form])

    setLoading(false)

    if (!error) {
      setForm({
        customer_name: "",
        phone: "",
        address: "",
        vehicle_number: "",
        vehicle_type: "",
        selected_service: "",
        pickup_slot: ""
      })
      
      router.push("/success")   // ✅ Redirect here

    } else {
      alert("❌ Error submitting form")
      console.log(error)
    }
  }

  return (
    <main className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        Book Vehicle Service
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>

        <input className="input" name="customer_name" placeholder="Full Name"
          value={form.customer_name} onChange={handleChange} required />

        <input className="input" name="phone" placeholder="Phone Number"
          value={form.phone} onChange={handleChange} required />

        <input className="input" name="address" placeholder="Address"
          value={form.address} onChange={handleChange} required />

        <input className="input" name="vehicle_number" placeholder="Vehicle Number"
          value={form.vehicle_number} onChange={handleChange} required />

        <select className="input" name="vehicle_type"
          value={form.vehicle_type} onChange={handleChange} required>
          <option value="">Select Vehicle Type</option>
          <option>Car</option>
          <option>Bike</option>
        </select>

        <select className="input" name="selected_service"
          value={form.selected_service} onChange={handleChange} required>
          <option value="">Select Service</option>
          <option>Oil Change</option>
          <option>General Service</option>
          <option>Brake Repair</option>
        </select>

        <input type="time" className="input" name="pickup_slot"
          value={form.pickup_slot} onChange={handleChange} required />

        <button disabled={loading}
          className="w-full bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600 transition">
          {loading ? "Submitting..." : "Submit Request"}
        </button>

      </form>
    </main>
  )
}
