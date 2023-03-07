import React from "react"

interface FileSystemHandleState {
  handle?: FileSystemDirectoryHandle
  setHandle: (handle: FileSystemDirectoryHandle) => void
}

const FileSystemHandleContext = React.createContext<FileSystemHandleState>({ setHandle: () => {} })

export default FileSystemHandleContext
