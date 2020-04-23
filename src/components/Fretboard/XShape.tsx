import React, { PureComponent } from 'react'
import { FretboardContext } from './FretboardContext'
import { MarkerModel } from './FretboardModel'

type XShapeProps = {
  marker: MarkerModel
}

export class XShape extends PureComponent<XShapeProps> {
  render() {
    const { marker } = this.props
    return (
      <FretboardContext.Consumer>
        {({ util }) => {
          const theme = util.getTheme()
          const strokeWidth = util.getMarkerStrokeWidth(marker)
          const strokeColor = util.getMarkerStrokeColor(marker)
          const radius = theme.markerRadius
          const strokeCompensation = Math.floor(strokeWidth / 6)
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
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                x1={line1X1}
                y1={line1Y1}
                x2={line1X2}
                y2={line1Y2}
              />
              <line
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                x1={line2X1}
                y1={line2Y1}
                x2={line2X2}
                y2={line2Y2}
              />
            </g>
          )
        }}
      </FretboardContext.Consumer>
    )
  }
}
