import React, { PureComponent } from 'react'
import { MarkerModel } from './FretboardModel'
import { FretboardContext } from './FretboardContext'

export type CircleShapeProps = {
  marker: MarkerModel
}

export class CircleShape extends PureComponent<CircleShapeProps> {
  render() {
    const { marker } = this.props
    return (
      <FretboardContext.Consumer>
        {({ util }) => {
          const theme = util.getTheme()
          const fillColor = util.getMarkerFillColor(marker)
          const strokeColor = util.getMarkerStrokeColor(marker)
          const strokeWidth = util.getMarkerStrokeWidth(marker)
          const { markerRadius } = theme
          const radius = strokeWidth > 0 ? markerRadius - strokeWidth / 2 : markerRadius
          return (
            <circle
              cx={markerRadius}
              cy={markerRadius}
              fill={fillColor}
              r={radius}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          )
        }}
      </FretboardContext.Consumer>
    )
  }
}
