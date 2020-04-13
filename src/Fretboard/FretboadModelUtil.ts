import { FretboardModel, StringModel, MarkerModel, MarkerKind, FretboardTheme } from './FretboardModel'
import head from 'lodash/head'
import last from 'lodash/last'
import isNil from 'lodash/isNil'

export class FretboardModelUtil {
  private model: FretboardModel

  constructor(model: FretboardModel) {
    if (isNil(model)) {
      throw new TypeError('model null or undefined')
    }
    this.model = model
  }

  private getTopOverhang(): number {
    const model = this.getModel()
    const theme = this.getTheme()
    return Math.max(head(model.strings).thickness / 2, theme.markerRadius)
  }

  private getBottomOverhang(): number {
    const model = this.getModel()
    const theme = this.getTheme()
    return Math.max(last(model.strings).thickness / 2, theme.markerRadius)
  }

  private getMarkerKindColor(kind: MarkerKind): string {
    const theme = this.getTheme()

    switch (kind) {
      case MarkerKind.Default:
        return theme.defaultMarkerColor
      case MarkerKind.Muted:
        return theme.mutedMarkerColor
      case MarkerKind.Pimary:
        return theme.primaryMarkerColor
      case MarkerKind.Secondary:
        return theme.secondaryMarkerColor
    }
  }

  getModel(): FretboardModel {
    return this.model
  }

  getTheme(): FretboardTheme {
    return this.getModel().theme
  }

  getViewportWidth(): number {
    const theme = this.getTheme()

    const fretCount = this.getFretCount()
    // No frets provided, nothing to do here
    if (fretCount <= 0) {
      return 0
    }

    const isNutVisible = this.isNutVisible()

    const fretsWidth = fretCount * theme.fretWidth
    const endOverhangWidth = theme.stringOverhang
    const startOverhangWidth = isNutVisible ? 0 : theme.stringOverhang
    const nutWidth = theme.nutWidth

    return fretsWidth + startOverhangWidth + nutWidth + endOverhangWidth
  }

  getViewportHeight(): number {
    const theme = this.getTheme()

    const stringsCount = this.getStringsCount()
    // No strings provided nothing to do here
    if (stringsCount === 0) {
      return 0
    }
    const stringsHeight = (stringsCount - 1) * theme.stringSpacing
    const topOverhang = this.getTopOverhang()
    const bottomOverhang = this.getBottomOverhang()
    return stringsHeight + topOverhang + bottomOverhang
  }

  getStringY(string: StringModel): number {
    const model = this.getModel()
    const theme = this.getTheme()

    const topOverhang = this.getTopOverhang()

    const index = model.strings.indexOf(string)
    const basePosition = theme.stringSpacing * index
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
    const model = this.getModel()

    return model.lastVisibleFret - model.firstVisibleFret
  }
  getStringsCount(): number {
    const model = this.getModel()

    return model.strings.length
  }

  getFretWireX(fret: number): number {
    const theme = this.getTheme()

    const baseXPosition = fret * theme.fretWidth
    const nutWidth = this.isNutVisible() ? theme.nutWidth : 0
    const startOverhangWidth = this.isNutVisible() ? 0 : theme.stringOverhang
    return baseXPosition + nutWidth + startOverhangWidth
  }
  getFretWireY1(fretIndex: number): number {
    return this.getTopOverhang()
  }
  getFretWireY2(fretIndex: number): number {
    return this.getViewportHeight() - this.getBottomOverhang()
  }

  isNutVisible(): boolean {
    const model = this.getModel()

    return model.firstVisibleFret === 0
  }

  getNutX(): number {
    // TODO
    const theme = this.getTheme()

    return theme.nutWidth / 2
  }
  getNutY1(): number {
    // TODO
    return this.getTopOverhang()
  }
  getNutY2(): number {
    // TODO
    return this.getViewportHeight() - this.getBottomOverhang()
  }

  getMarkerX(marker: MarkerModel): number {
    const model = this.getModel()
    const theme = this.getTheme()

    const fretsWidth = (marker.fret - model.firstVisibleFret - 1) * theme.fretWidth
    const halfFretWidthToCenter = theme.fretWidth / 2
    const nutWidth = this.isNutVisible() ? theme.nutWidth : 0
    const startOverhangWidth = this.isNutVisible() ? 0 : theme.stringOverhang
    return fretsWidth + halfFretWidthToCenter + nutWidth + startOverhangWidth
  }

  getMarkerY(marker: MarkerModel): number {
    const model = this.getModel()
    const theme = this.getTheme()

    const stringIndex = model.strings.findIndex((string) => string.id === marker.stringId)
    const singingsHeight = stringIndex * theme.stringSpacing
    const topOverhang = this.getTopOverhang()
    return singingsHeight + topOverhang
  }

  getMarkerFill(marker: MarkerModel): string {
    if (marker.fret === 0 || marker.kind === MarkerKind.Muted) {
      return null
    }
    return this.getMarkerKindColor(marker.kind)
  }
}

export function from(model: FretboardModel): FretboardModelUtil {
  return new FretboardModelUtil(model)
}
