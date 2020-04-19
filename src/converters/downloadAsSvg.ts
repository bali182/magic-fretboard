import { FretboardModel, FretboardTheme } from '../components/Fretboard/FretboardModel'
import { convertToSvgString } from './convertToSvgString'
import { SVG_CONTENT_TYPE } from './convertSvgToImage'
import { downloadBlob } from './downloadBlob'

export function downloadAsSvg(fretboard: FretboardModel, theme: FretboardTheme) {
  convertToSvgString(fretboard, theme).then((svgString) =>
    downloadBlob(new Blob([svgString], { type: SVG_CONTENT_TYPE }), 'fretboard.svg')
  )
}
