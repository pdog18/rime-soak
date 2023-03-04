import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import PreviousPage from "./pages/PreviousPage"

function preventWindowDrop() {
  function preventDrop(e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()
  }
  window.addEventListener("drop", preventDrop)
  window.addEventListener("dragover", preventDrop)
}

export default () => {
  useEffect(() => {
    preventWindowDrop()
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<PreviousPage />} />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
