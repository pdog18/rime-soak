import React from "react"
import "./Reveal.css"

interface RevealOnClickProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  focus: boolean
  color: string
  name: string
}

const RevealOnFocus: React.FC<RevealOnClickProps> = ({
  children,
  focus,
  color,
  name,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div className="wrapper" onClick={onClick} style={{ padding: "1px" }}>
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
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
