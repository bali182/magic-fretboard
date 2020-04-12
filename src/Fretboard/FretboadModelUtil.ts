import { FretboardModel, StringModel, MarkerModel } from './FretboardModel'
import { Fretboard } from './Fretboard'
import range from 'lodash/range'
import head from 'lodash/head'
import last from 'lodash/last'

export class FretboardModelUtil {
  private model: FretboardModel

  constructor(model: FretboardModel) {
    this.model = model
  }

  getViewportWidth(): number {
    const fretCount = this.getFretCount()
    // No frets provided, nothing to do here
    if (fretCount <= 0) {
      return 0
    }

    const isNutVisible = this.isNutVisible()

    const fretsWidth = fretCount * this.model.fretWidth
    const endOverhangWidth = this.model.stringOverhang
    const startOverhangWidth = isNutVisible ? 0 : this.model.stringOverhang
    const nutWidth = this.model.nutWidth

    return fretsWidth + startOverhangWidth + nutWidth + endOverhangWidth
  }

  getViewportHeight(): number {
    const stringsCount = this.getStringsCount()
    // No strings provided nothing to do here
    if (stringsCount === 0) {
      return 0
    }
    const stringsHeight = (stringsCount - 1) * this.model.stringSpacing
    const topOverhang = head(this.model.strings).thickness / 2
    const bottomOverhang = last(this.model.strings).thickness / 2
    return stringsHeight + topOverhang + bottomOverhang
  }

  getStringY(string: StringModel): number {
    const topOverhang = head(this.model.strings).thickness / 2

    const index = this.model.strings.indexOf(string)
    const basePosition = this.model.stringSpacing * index
    return topOverhang + basePosition
  }
  getStringX1(string: StringModel): number {
    // TODO
    return 0
  }
  getStringX2(string: StringModel): number {
    // TODO
    return this.getViewportWidth()
  }

  getFretCount(): number {
    return this.model.lastVisibleFret - this.model.firstVisibleFret
  }
  getStringsCount(): number {
    return this.model.strings.length
  }

  getFretWireX(fret: number): number {
    const baseXPosition = fret * this.model.fretWidth
    const nutWidth = this.isNutVisible() ? this.model.nutWidth : 0
    const startOverhangWidth = this.isNutVisible() ? 0 : this.model.stringOverhang
    return baseXPosition + nutWidth + startOverhangWidth
  }
  getFretWireY1(fretIndex: number): number {
    // TODO
    return 0
  }
  getFretWireY2(fretIndex: number): number {
    return this.getViewportHeight()
  }

  isNutVisible(): boolean {
    return this.model.firstVisibleFret === 0
  }

  getNutX(): number {
    // TODO
    return this.model.nutWidth / 2
  }
  getNutY1(): number {
    // TODO
    return 0
  }
  getNutY2(): number {
    // TODO
    return this.getViewportHeight()
  }

  getMarkerX(marker: MarkerModel): number {
    const fretsWidth = (marker.fret - this.model.firstVisibleFret - 1) * this.model.fretWidth
    const halfFretWidthToCenter = this.model.fretWidth / 2
    const nutWidth = this.isNutVisible() ? this.model.nutWidth : 0
    const startOverhangWidth = this.isNutVisible() ? 0 : this.model.stringOverhang
    return fretsWidth + halfFretWidthToCenter + nutWidth + startOverhangWidth
  }

  getMarkerY(marker: MarkerModel): number {
    const stringIndex = this.model.strings.findIndex((string) => string.id === marker.stringId)
    const singingsHeight = stringIndex * this.model.stringSpacing
    const topOverhang = head(this.model.strings).thickness / 2
    return singingsHeight + topOverhang
  }
}

export function from(model: FretboardModel): FretboardModelUtil {
  return new FretboardModelUtil(model)
}
