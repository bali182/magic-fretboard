import isNil from 'lodash/isNil'

const PNG_CONTENT_TYPE = 'image/png'

export function convertImageToPngBlob(image: HTMLImageElement): Promise<Blob> {
  const canvas = document.createElement('canvas')
  const { width, height } = image

  const scaledWidth = width * 3
  const scaledHeight = height * 3

  canvas.width = scaledWidth
  canvas.height = scaledHeight

  const context = canvas.getContext('2d')
  context.imageSmoothingEnabled = true
  context.imageSmoothingQuality = 'high'
  context.drawImage(image, 0, 0, scaledWidth, scaledHeight)

  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (isNil(blob) ? reject('Conversion failure') : resolve(blob)), PNG_CONTENT_TYPE)
  )
}
