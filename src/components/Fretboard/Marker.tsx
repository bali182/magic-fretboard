import React, { PureComponent, ReactNode, Fragment } from 'react'
import isNil from 'lodash/isNil'
import { FretboardModelUtil } from './FretboadModelUtil'
import { MarkerModel } from './FretboardModel'
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
    const { fontColor, fontFamily, fontSize } = util.getMarkerTheme(marker.kind)
    return (
      <text
        transform={util.getOrientationTransform()}
        x={util.getTextXMultiplier() * x}
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
