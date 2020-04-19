export function downloadBlob(data: Blob, fileName: string): void {
  const anchor = document.createElement('a')
  anchor.style.display = 'none'
  document.body.appendChild(anchor)

  anchor.href = URL.createObjectURL(data)
  anchor.setAttribute('download', fileName)
  anchor.click()

  URL.revokeObjectURL(anchor.href)
  document.body.removeChild(anchor)
}
