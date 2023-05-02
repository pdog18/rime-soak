import JSZip from "jszip"
import { saveAs } from "file-saver"

const download = async (files: File[], zipName: string = "soak.zip"): Promise<void> => {
  const zip = new JSZip()

  // 将文件添加到 .zip 文件中
  files.forEach((file) => {
    if (file.content.length === 0) {
      file.filename = `${file.filename} 文件压缩失败，重新加载页面或者联系 soak 作者`
    }
    zip.file(file.filename, file.content)
  })

  // 生成并保存 .zip 文件
  try {
    const content = await zip.generateAsync({ type: "blob" })
    saveAs(content, zipName)
  } catch (error) {
    console.error("Error while generating and saving .zip file:", error)
  }
}

type File = {
  filename: string
  content: string
}

export default download
