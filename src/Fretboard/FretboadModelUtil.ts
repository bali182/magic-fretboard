import {
  FretboardModel,
  StringModel,
  MarkerModel,
  MarkerKind,
  FretboardTheme,
  MarkerTheme,
  MarkerShape,
} from './FretboardModel'
import head from 'lodash/head'
import last from 'lodash/last'
import isNil from 'lodash/isNil'

export class FretboardModelUtil {
  private readonly model: FretboardModel
  private readonly theme: FretboardTheme

  constructor(model: FretboardModel, theme: FretboardTheme) {
    this.model = model
    this.theme = theme
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

  private getUnfrettedMarkerSpace(): number {
    const model = this.getModel()
    const theme = this.getTheme()
    if (model.markers.some((marker) => marker.fret === 0)) {
      // A full marker width plus a half so there's space between the marker and the nut
      return theme.markerRadius * 2 + theme.markerToNutSpace
    }
    return 0
  }

  private getVisibleNutWidth(): number {
    const theme = this.getTheme()
    return this.isNutVisible() ? theme.nutWidth : 0
  }

  private getStartOverhang(): number {
    const theme = this.getTheme()
    return this.isNutVisible() ? 0 : theme.stringOverhang
  }

  private getEndOverhang(): number {
    const theme = this.getTheme()
    return theme.stringOverhang
  }

  getMarkerTheme(kind: MarkerKind): MarkerTheme {
    const theme = this.getTheme()

    switch (kind) {
      case MarkerKind.Default:
        return theme.defaultMarkerTheme
      case MarkerKind.Muted:
        return theme.mutedMarkerTheme
      case MarkerKind.Pimary:
        return theme.primaryMarkerTheme
      case MarkerKind.Hollow:
        return theme.hollowMarkerTheme
      default:
        return null
    }
  }

  getModel(): FretboardModel {
    return this.model
  }

  getTheme(): FretboardTheme {
    return this.theme
  }

  getViewportWidth(): number {
    const theme = this.getTheme()

    const fretCount = this.getFretCount()
    // No frets provided, nothing to do here
    if (fretCount <= 0) {
      return 0
    }

    const fretsWidth = fretCount * theme.fretWidth
    const endOverhangWidth = this.getEndOverhang()
    const startOverhangWidth = this.getStartOverhang()
    const nutWidth = this.getVisibleNutWidth()
    const unfrettedMarkerWidth = this.getUnfrettedMarkerSpace()

    return fretsWidth + startOverhangWidth + nutWidth + endOverhangWidth + unfrettedMarkerWidth
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
    const unfrettedMarkerSpace = this.getUnfrettedMarkerSpace()
    return unfrettedMarkerSpace
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
    const unfrettedMarkerSpace = this.getUnfrettedMarkerSpace()
    return baseXPosition + nutWidth + startOverhangWidth + unfrettedMarkerSpace
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
    const unfrettedMarkerSpace = this.getUnfrettedMarkerSpace()
    return theme.nutWidth / 2 + unfrettedMarkerSpace
  }
  getNutY1(): number {
    // TODO
    return this.getTopOverhang()
  }
  getNutY2(): number {
    // TODO
    return this.getViewportHeight() - this.getBottomOverhang()
  }

  getMarkerX(fret: number, kind: MarkerKind): number {
    const model = this.getModel()
    const theme = this.getTheme()
    const markerTheme = this.getMarkerTheme(kind)

    // Unfretted marker
    if (fret === 0) {
      return theme.markerRadius
    }
    // Fretted marker
    const fretsWidth = (fret - model.firstVisibleFret - 1) * theme.fretWidth
    const halfFretWidthToCenter = theme.fretWidth / 2
    const nutWidth = this.getVisibleNutWidth()
    const startOverhangWidth = this.getStartOverhang()
    const unfrettedMarkerSpace = this.getUnfrettedMarkerSpace()
    const adjustment = !isNil(markerTheme) && markerTheme.shape === MarkerShape.X ? -theme.markerRadius / 2 : 0

    return fretsWidth + halfFretWidthToCenter + nutWidth + startOverhangWidth + unfrettedMarkerSpace + adjustment
  }

  getMarkerY(stringId: string, kind: MarkerKind): number {
    const model = this.getModel()
    const theme = this.getTheme()
    const markerTheme = this.getMarkerTheme(kind)

    const stringIndex = model.strings.findIndex((string) => string.id === stringId)
    const singingsHeight = stringIndex * theme.stringSpacing
    const topOverhang = this.getTopOverhang()
    const adjustment = !isNil(markerTheme) && markerTheme.shape === MarkerShape.X ? -theme.markerRadius / 2 : 0

    return singingsHeight + topOverhang + adjustment
  }

  getMarkerFontSize(marker: MarkerModel): number {
    const markerTheme = this.getMarkerTheme(marker.kind)
    return markerTheme.fontSize
  }

  getMarkerFontColor(marker: MarkerModel): string {
    const markerTheme = this.getMarkerTheme(marker.kind)
    return markerTheme.fontColor
  }

  getMarkerFontFamily(marker: MarkerModel): string {
    const markerTheme = this.getMarkerTheme(marker.kind)
    return markerTheme.fontFamily
  }
}
