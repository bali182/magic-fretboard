import React, { PureComponent, ReactNode, Fragment } from 'react'
import { FretboardModel, StringModel, MarkerModel, FretboardTheme, MarkerShape } from './FretboardModel'
import { FretboardModelUtil } from './FretboadModelUtil'
import range from 'lodash/range'

export type FretboardProps = {
  model: FretboardModel
  theme: FretboardTheme
}

export class Fretboard extends PureComponent<FretboardProps> {
  render() {
    const { model, theme } = this.props
    const util = new FretboardModelUtil(model, theme)
    const style: React.CSSProperties = {
      border: '1px solid black',
    }
    return (
      <svg
        style={style}
        width={util.getViewportWidth()}
        height={util.getViewportHeight()}
        xmlns="http://www.w3.org/2000/svg">
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
    if (util.isNutVisible()) {
      return range(1, util.getFretCount() + 1).map(this.renderFretWire(util))
    }
    return range(0, util.getFretCount() + 1).map(this.renderFretWire(util))
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

  renderFretWire = (util: FretboardModelUtil) => (index: number) => {
    const theme = util.getTheme()
    const x = util.getFretWireX(index)
    const y1 = util.getFretWireY1(index)
    const y2 = util.getFretWireY2(index)
    return (
      <line stroke={theme.fretWireColor} x1={x} x2={x} y1={y1} y2={y2} strokeWidth={theme.fretWireWidth} key={index} />
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

  renderMarkers(util: FretboardModelUtil) {
    const model = util.getModel()
    return model.markers.map(this.renderMarker(util))
  }

  renderMarkerCircle(util: FretboardModelUtil, marker: MarkerModel, x: number, y: number): ReactNode {
    const fill = util.getMarkerFill(marker)
    const stroke = util.getMarkerStroke(marker)
    const radius = util.getMarkerRadius(marker)
    const strokeWidth = util.getMarkerStrokeWidth(marker)
    return <circle fill={fill} cx={x} cy={y} r={radius} stroke={stroke} strokeWidth={strokeWidth} />
  }

  renderMarkerX(util: FretboardModelUtil, marker: MarkerModel, x: number, y: number): ReactNode {
    const fill = util.getMarkerFill(marker)
    const stroke = util.getMarkerStroke(marker)
    const radius = util.getMarkerRadius(marker)
    const strokeWidth = util.getMarkerStrokeWidth(marker)
    return <circle fill={fill} cx={x} cy={y} r={radius} stroke={stroke} strokeWidth={strokeWidth} />
  }

  renderMarkerShape(util: FretboardModelUtil, marker: MarkerModel, x: number, y: number): ReactNode {
    const shape = util.getMarkerShape(marker)
    return shape === MarkerShape.Circle
      ? this.renderMarkerCircle(util, marker, x, y)
      : this.renderMarkerX(util, marker, x, y)
  }

  renderMarkerText(util: FretboardModelUtil, marker: MarkerModel, x: number, y: number): ReactNode {
    const fontColor = util.getMarkerFontColor(marker)
    const fontSize = util.getMarkerFontSize(marker)
    const fontFamily = util.getMarkerFontFamily(marker)
    return (
      <text
        x={x}
        y={y}
        fill={fontColor}
        fontSize={fontSize}
        fontFamily={fontFamily}
        textAnchor="middle"
        alignmentBaseline="central">
        {marker.label}
      </text>
    )
  }

  renderMarker = (util: FretboardModelUtil) => (marker: MarkerModel) => {
    const x = util.getMarkerX(marker)
    const y = util.getMarkerY(marker)
    return (
      <Fragment key={marker.id}>
        {this.renderMarkerShape(util, marker, x, y)}
        {this.renderMarkerText(util, marker, x, y)}
      </Fragment>
    )
  }
}
