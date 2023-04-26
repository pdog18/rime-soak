const SquirrelOutline: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{
        display: "inline-flex",
        outline: "1px dashed black",
        outlineOffset: "6px",
        gap: "16px",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  )
}

export default SquirrelOutline
