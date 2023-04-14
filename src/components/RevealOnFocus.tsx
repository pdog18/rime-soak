import React from "react"
import "./Reveal.css"

interface RevealOnClickProps {
  children: React.ReactNode
  focus: boolean
  color: string
  name: string
}

const RevealOnFocus: React.FC<RevealOnClickProps> = ({ children, focus, color, name }) => {
  return (
    <div className="wrapper">
      <div
        className={`content ${focus ? "fadeOut" : "fadeIn"}`}
        style={{
          backgroundColor: color,
        }}
      >
        <div style={{ backgroundColor: "#eeeeee", border: "1px dashed black", borderRadius: "12px", padding: "2px" }}>
          {name}
        </div>
      </div>
      <div className="element-under">{children}</div>
    </div>
  )
}

export default RevealOnFocus
