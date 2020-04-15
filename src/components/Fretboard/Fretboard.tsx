import React, { PureComponent, ReactNode } from 'react'
import { FretboardModel, StringModel, FretboardTheme } from './FretboardModel'
import { FretboardModelUtil } from './FretboadModelUtil'
import range from 'lodash/range'
import { Marker } from './Marker'
import { MarkerDefs } from './MarkerDefs'
import isNil from 'lodash/isNil'
import flatMap from 'lodash/flatMap'
import { MarkerPlaceholder } from './MarkerPlaceholder'

export type FretboardProps = {
  model: FretboardModel
  theme: FretboardTheme
  pure?: boolean
}

export class Fretboard extends PureComponent<FretboardProps> {
  render() {
    const { model, theme, pure } = this.props
    const util = new FretboardModelUtil(model, theme, Boolean(pure))
    const __temporaryStyle: React.CSSProperties = {
      // border: '1px solid black',
    }
    return (
      <svg
        style={__temporaryStyle}
        width={util.getViewportWidth()}
        height={util.getViewportHeight()}
        transform={util.getOrientationTransform()}
        xmlns="http://www.w3.org/2000/svg">
        <MarkerDefs util={util} />
        {this.renderFrets(util)}
        {this.renderNut(util)}
        {this.renderStrings(util)}
        {this.renderMarkers(util)}
      </svg>
    )
  }

  renderStrings(util: FretboardModelUtil): ReactNode {
    const model = util.getModel()
    return model.strings.map(this.renderString(util))
  }

  renderFrets(util: FretboardModelUtil): ReactNode {
    return util
      .getFrets(false)
      .filter((fret) => fret > 0)
      .map(this.renderFretWire(util))
  }

  renderString = (util: FretboardModelUtil) => (strModel: StringModel): ReactNode => {
    const theme = util.getTheme()
    const x1 = util.getStringX1(strModel)
    const x2 = util.getStringX2(strModel)
    const y = util.getStringY(strModel)
    return (
      <line
        stroke={theme.stringColor}
        x1={x1}
        x2={x2}
        y1={y}
        y2={y}
        strokeWidth={strModel.thickness}
        key={strModel.id}
      />
    )
  }

  renderFretWire = (util: FretboardModelUtil) => (fret: number) => {
    const theme = util.getTheme()
    const x = util.getFretWireX(fret)
    const y1 = util.getFretWireY1(fret)
    const y2 = util.getFretWireY2(fret)
    return (
      <line stroke={theme.fretWireColor} x1={x} x2={x} y1={y1} y2={y2} strokeWidth={theme.fretWireWidth} key={fret} />
    )
  }

  renderNut = (util: FretboardModelUtil) => {
    if (!util.isNutVisible()) {
      return null
    }
    const theme = util.getTheme()
    const x = util.getNutX()
    const y1 = util.getNutY1()
    const y2 = util.getNutY2()
    return <line stroke={theme.nutColor} x1={x} x2={x} y1={y1} y2={y2} strokeWidth={theme.nutWidth} key="nut" />
  }

  renderMarkers(util: FretboardModelUtil): ReactNode {
    const strings = util.getStringIds()
    const frets = util.getFrets(true)
    return flatMap(strings, (stringId) =>
      flatMap(frets, (fret) => {
        const marker = util.getMarker(stringId, fret)
        if (!isNil(marker)) {
          return <Marker util={util} marker={marker} key={marker.id} />
        } else {
          return <MarkerPlaceholder util={util} stringId={stringId} fret={fret} key={`${stringId}-${fret}`} />
        }
      })
    )
  }
}
