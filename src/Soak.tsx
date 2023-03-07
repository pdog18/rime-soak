import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { HashRouter, Routes, Route } from "react-router-dom"
import FileSystemHandleContext from "./FileSystemHandleContext"
import OriginContext, { SoakDefault, SoakDefaultState } from "./OriginContext"
import Home from "./pages/Home"
import PreviousPage from "./pages/PreviousPage"
import { RootState } from "./store/Store"
import copy from "./utils/SimpleDeepCopy"
import { writeYAML } from "./utils/YAMLUtils"

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
  const [soakDefault, setOrigin] = useState<SoakDefault | undefined>(undefined)
  const state = useSelector((state: RootState) => state)

  useEffect(() => {
    console.log(state.defaultCustom)
    console.log(state.rimeCustom)
    console.log(state.schema)
  }, [state.defaultCustom, state.rimeCustom, state.schema, state.skin])

  return (
    <FileSystemHandleContext.Provider
      value={{
        handle: stateHandle,
        setHandle: (handle) => {
          setState(handle)
        },
      }}
    >
      <OriginContext.Provider
        value={{
          soakDefault,
          setSoakDefault: (entry: SoakDefault) => {
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
      </OriginContext.Provider>
    </FileSystemHandleContext.Provider>
  )
}

export default Soak
