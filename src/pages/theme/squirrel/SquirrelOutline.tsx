const SquirrelOutline: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => {
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          paddingLeft: "6px",
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "inline-flex",
          border: "1px dashed black",
          padding: "6px",
          outlineOffset: "6px",
          gap: "16px",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default SquirrelOutline
