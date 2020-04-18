import React, { PureComponent } from 'react'
import { FretboardTheme, MarkerTheme } from './FretboardModel'

export type CircleShapeProps = {
  theme: FretboardTheme
  markerTheme: MarkerTheme
}

export class CircleShape extends PureComponent<CircleShapeProps> {
  render() {
    const { markerTheme, theme } = this.props
    const { fillColor, strokeColor, strokeWidth } = markerTheme
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
  }
}
