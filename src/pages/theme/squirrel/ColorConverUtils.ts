function convertColor(color: number): string
function convertColor(color: string): number
function convertColor(color: string | number): string | number {
  if (typeof color === "number") {
    const a = ((color >> 24) & 0xff) / 0xff
    const b = (color >> 16) & 0xff
    const g = (color >> 8) & 0xff
    const r = color & 0xff
    return `rgba(${r},${g},${b},${a})`
  } else if (typeof color === "string") {
    const matches = color.match(/rgba?\((\d+),(\d+),(\d+),?([\d.]+)?\)/)
    if (!matches) {
      throw new Error("Invalid color format")
    }
    const [r, g, b, a = "1"] = matches.slice(1)
    const alpha = Math.round(parseFloat(a) * 255)
    const red = parseInt(r)
    const green = parseInt(g)
    const blue = parseInt(b)
    return (alpha << 24) | (red << 16) | (green << 8) | blue
  } else {
    throw new Error("Invalid argument type")
  }
}

function abgrToRgbaObject(color: number): { r: number; g: number; b: number; a: number } {
  const a = ((color >> 24) & 0xff) / 0xff
  const b = (color >> 16) & 0xff
  const g = (color >> 8) & 0xff
  const r = color & 0xff
  return { r, g, b, a }
}

function rgbaObjectToAbgr(color: { r: number; g: number; b: number; a: number }): number {
  const a = BigInt(Math.round(color.a * 255)) & BigInt(0xff)
  const b = BigInt(color.b) & BigInt(0xff)
  const g = BigInt(color.g) & BigInt(0xff)
  const r = BigInt(color.r) & BigInt(0xff)

  const abgr = (a << BigInt(24)) | (b << BigInt(16)) | (g << BigInt(8)) | r

  return Number(abgr)
}

export { abgrToRgbaObject, rgbaObjectToAbgr }
export default convertColor
