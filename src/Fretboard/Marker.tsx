import React, { PureComponent, ReactNode, Fragment } from 'react'
import { FretboardModelUtil } from './FretboadModelUtil'
import { MarkerModel, MarkerShape } from './FretboardModel'
import isNil from 'lodash/isNil'
import { MarkerDefs } from './MarkerDefs'

type MarkerProps = {
  util: FretboardModelUtil
  marker: MarkerModel
}

export class Marker extends PureComponent<MarkerProps> {
  renderLabel(x: number, y: number): ReactNode {
    const { util, marker } = this.props
    if (isNil(marker.label) || marker.label.length === 0) {
      return null
    }
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

  renderShape(x: number, y: number): ReactNode {
    const { marker } = this.props
    return <use x={x} y={y} xlinkHref={MarkerDefs.shapeRefId(marker.kind)} />
  }

  render() {
    const { util, marker } = this.props
    const x = util.getMarkerX(marker.fret, marker.kind)
    const y = util.getMarkerY(marker.stringId, marker.kind)
    return (
      <Fragment>
        {this.renderShape(x, y)}
        {this.renderLabel(x, y)}
      </Fragment>
    )
  }
}