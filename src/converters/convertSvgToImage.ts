export const SVG_CONTENT_TYPE = 'image/svg+xml'

export function convertToSvgImage(svgString: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svgString], { type: SVG_CONTENT_TYPE })
    const dataUrl = URL.createObjectURL(blob)
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = dataUrl
  })
}
