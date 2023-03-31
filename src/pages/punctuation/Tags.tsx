import { useState } from "react"
import { CloseCircleFilled as CloseIcon } from "@ant-design/icons"

import { Tag } from "antd"

const AtuoShowClosebleIconTag = ({ shape, onDelete, color }: any) => {
  const [showClosableIcon, changeShowClosableIcon] = useState(false)

  return (
    <Tag
      onMouseEnter={() => changeShowClosableIcon(true)}
      onMouseLeave={() => changeShowClosableIcon(false)}
      style={{
        fontSize: "14px",
        height: "24px",
        width: "40px",
        textAlign: "center",
      }}
      color={color}
      closable={showClosableIcon}
      closeIcon={<CloseIcon style={{ fontSize: "14px" }} />}
      onClose={(e) => {
        e.preventDefault()
        onDelete(shape)
      }}
    >
      {shape}
    </Tag>
  )
}

const Tags = (prop: any) => {
  const { shape, onDelete } = prop

  if (typeof shape === "string") {
    return <AtuoShowClosebleIconTag shape={shape} onDelete={onDelete} />
  }

  if (shape["commit"] !== undefined) {
    return <AtuoShowClosebleIconTag color="processing" shape={shape["commit"]} onDelete={onDelete} />
  }

  if (shape["pair"] !== undefined) {
    return <AtuoShowClosebleIconTag color="success" shape={shape["pair"]} onDelete={onDelete} />
  }

  if (Array.isArray(shape)) {
    return (
      <>
        {shape.map((char, _) => {
          return <AtuoShowClosebleIconTag key={`${char}`} shape={char} onDelete={onDelete} />
        })}
      </>
    )
  }

  return <></> // empty
}

export default Tags
