import { FretboardModel, FretboardTheme } from '../components/Fretboard/FretboardModel'
import { convertToSvgString } from './convertToSvgString'
import { convertToSvgImage } from './convertSvgToImage'
import { convertImageToPngBlob } from './convertImageToPngBlob'
import { downloadBlob } from './downloadBlob'

export function downloadAsPng(fretboard: FretboardModel, theme: FretboardTheme) {
  convertToSvgString(fretboard, theme)
    .then(convertToSvgImage)
    .then(convertImageToPngBlob)
    .then((blob) => downloadBlob(blob, 'fretboard.png'))
}
