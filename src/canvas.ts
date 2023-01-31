import c from "chalk"
import { createCanvas } from "canvas"
import path from "path"
import { writeFileSync } from "fs"

export const colors: { [key: string]: string } = {
  White: "#CCCCCC",
  Red: "#FF5757",
  Orange: "#FFA057",
  Yellow: "#FFEC57",
  Green: "#57FF61",
  Cyan: "#57E2FF",
  Blue: "#5795FF",
  Magenta: "#E257FF",
}

const baseHeight = 100
const baseFontSize = 90
const basePadding = 40

export const generateTag = (label: string, height: number, color: string) => {
  const canvas = createCanvas(0, 0)
  const ctx = canvas.getContext("2d")

  ctx.font = `bold ${baseFontSize}px Arial`

  const textWidth = ctx.measureText(label).width
  canvas.width = textWidth + basePadding
  canvas.height = baseHeight

  const gradient = ctx.createRadialGradient(
    canvas.width / 2,
    baseHeight / 2,
    0,
    canvas.width / 2,
    baseHeight / 2,
    canvas.width / 3,
  )
  gradient.addColorStop(0, "white")
  gradient.addColorStop(1, colors[color])
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, baseHeight)

  ctx.font = `bold ${baseFontSize}px Arial`
  ctx.fillStyle = "black"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(label, canvas.width / 2, baseHeight / 2)

  ctx.strokeStyle = "black"
  ctx.lineWidth = 12
  ctx.strokeRect(0, 0, canvas.width, baseHeight)

  // Scale image to desired height
  const scale = height / canvas.height
  const sizedCanvas = createCanvas(canvas.width * scale, height)
  const sizedCtx = sizedCanvas.getContext("2d")

  sizedCtx.scale(scale, scale)
  sizedCtx.drawImage(canvas, 0, 0)

  const buffer = sizedCanvas.toBuffer("image/png")

  const fileName = `${label}_${color.toLowerCase()}.png`
  writeFileSync(`./${fileName}`, buffer)

  console.log(
    `${c.cyan("√")} Created ${c.italic(
      path.resolve("./") + "\\" + c.hex(colors[color])(fileName),
    )}`,
  )
}
