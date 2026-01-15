"use client"
import { useState } from "react"

export default function ToggleLight() {
  const [isOn, setIsOn] = useState(false)

  function toggleBtn() {
    setIsOn(!isOn)
  }

  return (
    <div className="outer">
      <h1>Light Toggle App</h1>

      <div className={isOn ? "light on" : "light off"}>
        {isOn ? "💡 Light ON" : "🌙 Light OFF"}
      </div>

      <button className="btn" onClick={toggleBtn}>
        Toggle
      </button>
    </div>
  )
}
