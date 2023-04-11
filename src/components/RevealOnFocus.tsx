import React from "react"
import "./Reveal.css"

interface RevealOnClickProps {
  children: React.ReactNode
  focus: boolean
  color: string
}

const RevealOnFocus: React.FC<RevealOnClickProps> = ({ children, focus, color }) => {
  return (
    <div className="wrapper">
      <div
        className={`content ${focus ? "focus" : ""}`}
        style={{
          backgroundColor: color,
        }}
      />
      <div className="element-under">{children}</div>
    </div>
  )
}

export default RevealOnFocus
