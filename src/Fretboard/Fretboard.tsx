import React, { PureComponent, ReactNode } from 'react'
import { FretboardModel, StringModel, MarkerModel } from './FretboardModel'
import { from, FretboardModelUtil } from './FretboadModelUtil'
import range from 'lodash/range'

export type FretboardProps = {
  model: FretboardModel
}

export class Fretboard extends PureComponent<FretboardProps> {
  render() {
    const util = from(this.props.model)
    return (
      <svg width={util.getViewportWidth()} height={util.getViewportHeight()} xmlns="http://www.w3.org/2000/svg">
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
    const { model } = this.props
    const x = util.getNutX()
    const y1 = util.getNutY1()
    const y2 = util.getNutY2()
    return (
      <line stroke={model.theme.nutColor} x1={x} x2={x} y1={y1} y2={y2} strokeWidth={model.theme.nutWidth} key="nut" />
    )
  }

  renderMarkers(util: FretboardModelUtil) {
    const { model } = this.props
    return model.markers.map(this.renderMarker(util))
  }

  renderMarker = (util: FretboardModelUtil) => (marker: MarkerModel) => {
    const x = util.getMarkerX(marker)
    const y = util.getMarkerY(marker)
    const fill = util.getMarkerFill(marker)
    const theme = util.getTheme()
    return (
      <React.Fragment>
        <circle fill={fill} cx={x} cy={y} r={theme.markerRadius} />
        <text x={x} y={y} fill="white" fontSize={20} textAnchor="middle" alignmentBaseline="central">
          {marker.label}
        </text>
      </React.Fragment>
    )
  }
}
