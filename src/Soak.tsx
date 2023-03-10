import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { HashRouter, Routes, Route } from "react-router-dom"
import FileSystemHandleContext from "./FileSystemHandleContext"
import ShapShotContext, { SoakSnapshot } from "./OriginContext"
import Home from "./pages/Home"
import PreviousPage from "./pages/PreviousPage"
import { RootState } from "./store/Store"
import copy from "./utils/SimpleDeepCopy"

function preventWindowDrop() {
  function preventDrop(e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()
  }
  window.addEventListener("drop", preventDrop)
  window.addEventListener("dragover", preventDrop)
}

const Soak = () => {
  useEffect(() => {
    preventWindowDrop()
  }, [])
  const [stateHandle, setState] = useState<FileSystemDirectoryHandle | undefined>(undefined)
  const [soakDefault, setOrigin] = useState<SoakSnapshot | undefined>(undefined)
  const state = useSelector((state: RootState) => state)

  useEffect(() => {
    console.log(state.default)
    console.log(state.style)
    console.log(state.schema)
  }, [state.default, state.style, state.schema, state.skin])

  return (
    <FileSystemHandleContext.Provider
      value={{
        handle: stateHandle,
        setHandle: (handle) => {
          setState(handle)
        },
      }}
    >
      <ShapShotContext.Provider
        value={{
          soakDefault,
          setSoakDefault: (entry: SoakSnapshot) => {
            setOrigin(copy(entry))
          },
        }}
      >
        <HashRouter>
          <Routes>
            <Route path="/">
              <Route index element={<PreviousPage />} />
              <Route path="home" element={<Home />} />
            </Route>
          </Routes>
        </HashRouter>
      </ShapShotContext.Provider>
    </FileSystemHandleContext.Provider>
  )
}

export default Soak
