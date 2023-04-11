type Color = number

function getRValue(color: Color): number {
  return (color >> 16) & 0xff
}

function getGValue(color: Color): number {
  return (color >> 8) & 0xff
}

function getBValue(color: Color): number {
  return color & 0xff
}

function RGB(r: number, g: number, b: number): Color {
  return (r << 16) | (g << 8) | b
}

function blendColors(front: Color, back: Color): Color {
  return RGB(
    (getRValue(front) * 2 + getRValue(back)) / 3,
    (getGValue(front) * 2 + getGValue(back)) / 3,
    (getBValue(front) * 2 + getBValue(back)) / 3
  )
}

function convertColor(color: number): string
function convertColor(color: string): number
// (Rime GRB[0xaabbcc]) <<===>> (Web RGB[#CCBBAA])
function convertColor(color: number | string): string | number {
  if (typeof color === "number") {
    const r = (color >> 16) & 0xff // 提取红色分量
    const g = (color >> 8) & 0xff // 提取绿色分量
    const b = color & 0xff // 提取蓝色分量
    const bgrNumber = (b << 16) | (g << 8) | r
    return "#" + bgrNumber.toString(16).padStart(6, "0")
  } else {
    const hexValue = color.replace("#", "").toLowerCase()
    const rgbNumber = parseInt(hexValue, 16)
    const r = (rgbNumber >> 16) & 0xff // 提取红色分量
    const g = (rgbNumber >> 8) & 0xff // 提取绿色分量
    const b = rgbNumber & 0xff // 提取蓝色分量
    const bgrNumber = (b << 16) | (g << 8) | r
    return bgrNumber
  }
}

export { blendColors, convertColor }
