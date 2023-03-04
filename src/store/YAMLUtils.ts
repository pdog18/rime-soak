import { stringify } from "yaml"

export const writeYAML = async (josn: any, handle: FileSystemFileHandle) => {
  josn.customization.modified_time = new Date().toLocaleString()
  const output = stringify(josn)

  const opts: FileSystemHandlePermissionDescriptor = { mode: "readwrite" }

  if ((await handle.queryPermission(opts)) !== "granted" && (await handle.requestPermission(opts)) !== "granted") {
    return
  }

  const writable = await handle.createWritable()
  await writable.write(output)
  await writable.close()
}

export const createNewYAML = async (jsonObject: object, filename: string, rimeDirectory: FileSystemDirectoryHandle) => {
  const content = stringify(jsonObject)
  const newFileHandle = await rimeDirectory.getFileHandle(filename, { create: true })
  const writable = await newFileHandle.createWritable()
  await writable.write(content)
  await writable.close()
}
