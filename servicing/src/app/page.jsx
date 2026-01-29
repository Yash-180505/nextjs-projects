"use client"
import { useState, useEffect } from "react"

export default function Home() {
  return (
    <main>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-wide">
          Home Pickup Car & Bike Servicing
        </h1>

        <p className="text-gray-300 mb-6 text-lg">
          Hassle-free vehicle servicing at your doorstep.
        </p>

        <a
          href="/book-service"
          className="bg-orange-500 px-6 py-3 rounded-md text-white font-semibold hover:bg-orange-600 transition"
        >
          Book Service Now
        </a>

        <HeroCarousel />
      </section>

      {/* SERVICES */}
      <section className="py-16 bg-gray-100 text-center px-4 md:px-6">
        <h2 className="text-3xl font-bold mb-10">Our Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <ServiceCard title="Oil Change" img="/images/services/oilChange.jpg" />
          <ServiceCard title="General Service" img="/images/services/generalService.jpg" />
          <ServiceCard title="Brake Repair" img="/images/services/brakeRepair.jpg" />
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 bg-white text-center px-4 md:px-6">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <StepCard step="1" text="Book Service" />
          <StepCard step="2" text="We Pickup Vehicle" />
          <StepCard step="3" text="Service at Garage" />
          <StepCard step="4" text="Deliver Back Home" />
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-16 bg-gray-100 text-center px-4 md:px-6">
        <h2 className="text-3xl font-bold mb-10">Happy Customers</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Testimonial name="Amit" text="Excellent service! Pickup & delivery was perfect." />
          <Testimonial name="Sneha" text="Very professional and transparent pricing." />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-black text-white text-center px-4">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Service Your Vehicle?
        </h2>
        <a
          href="/book-service"
          className="bg-orange-500 px-6 py-3 rounded-md font-semibold hover:bg-orange-600 transition"
        >
          Book Now
        </a>
      </section>

    </main>
  )
}

/* ===== CAROUSEL ===== */

function HeroCarousel() {
  const images = [
    "/images/hero/car1.jpg",
    "/images/hero/car2.jpg",
    "/images/hero/car3.jpg",
    "/images/hero/car4.jpg"
  ]

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="mt-10 flex justify-center">
      <img
        src={images[current]}
        className="rounded-xl shadow-2xl w-full max-w-md mx-auto transition duration-700"
      />
    </div>
  )
}

/* ===== REUSABLE ===== */

function ServiceCard({ title, img }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <div className="overflow-hidden">
        <img
          src={img}
          className="h-48 w-full object-cover transition duration-500 hover:scale-110"
        />
      </div>
      <h3 className="p-4 font-semibold text-lg">{title}</h3>
    </div>
  )
}

function StepCard({ step, text }) {
  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition">
      <div className="text-orange-500 text-3xl font-bold mb-2">{step}</div>
      <p className="font-medium">{text}</p>
    </div>
  )
}

function Testimonial({ name, text }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <p className="text-gray-600 italic">"{text}"</p>
      <h4 className="mt-3 font-semibold">- {name}</h4>
    </div>
  )
}
