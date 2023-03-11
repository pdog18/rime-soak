import { HashRouter, Routes, Route } from "react-router-dom"
import CustomSkin from "./pages/CustomSkin"
import Home from "./pages/Home"
import Result from "./pages/Result"

const Soak = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="result" element={<Result />} />
          <Route path="custom-skin" element={<CustomSkin />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default Soak
