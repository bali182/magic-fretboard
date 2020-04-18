import React, { PureComponent } from 'react'
import { FretboardTheme, MarkerTheme } from './FretboardModel'

type XShapeProps = {
  theme: FretboardTheme
  markerTheme: MarkerTheme
}

export class XShape extends PureComponent<XShapeProps> {
  render() {
    const { theme, markerTheme } = this.props
    const radius = theme.markerRadius
    const strokeCompensation = Math.floor(markerTheme.strokeWidth / 6)
    const shift = radius / 2

    const line1X1 = -strokeCompensation + shift
    const line1Y1 = -strokeCompensation + shift
    const line1X2 = radius + strokeCompensation + shift
    const line1Y2 = radius + strokeCompensation + shift

    const line2X1 = radius + strokeCompensation + shift
    const line2Y1 = -strokeCompensation + shift
    const line2X2 = -strokeCompensation + shift
    const line2Y2 = radius + strokeCompensation + shift

    return (
      <g alignmentBaseline="central">
        <line
          stroke={markerTheme.strokeColor}
          strokeWidth={markerTheme.strokeWidth}
          strokeLinecap="round"
          x1={line1X1}
          y1={line1Y1}
          x2={line1X2}
          y2={line1Y2}
        />
        <line
          stroke={markerTheme.strokeColor}
          strokeWidth={markerTheme.strokeWidth}
          strokeLinecap="round"
          x1={line2X1}
          y1={line2Y1}
          x2={line2X2}
          y2={line2Y2}
        />
      </g>
    )
  }
}
