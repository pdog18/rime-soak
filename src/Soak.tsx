import { useEffect } from "react"
import { HashRouter, Routes, Route } from "react-router-dom"
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
    <HashRouter>
      <Routes>
        <Route path="/">
          <Route index element={<PreviousPage />} />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
