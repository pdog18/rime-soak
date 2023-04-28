import { HashRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Result from "./pages/Result"
import ConvertYamlToJson from "./pages/theme/ConvertYamlToJson"

const Soak = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="result" element={<Result />} />
          <Route path="convert" element={<ConvertYamlToJson />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default Soak
