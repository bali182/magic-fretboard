import React, { PureComponent, ReactNode } from 'react'
import { FretboardModelUtil } from './FretboadModelUtil'
import { MarkerKind, MarkerShape, FretboardTheme, MarkerTheme } from './FretboardModel'
import { FretboardContext } from './FretboardContext'

export class MarkerDefs extends PureComponent {
  renderCircleShapeDef(id: string, theme: FretboardTheme, markerTheme: MarkerTheme): ReactNode {
    const radius = markerTheme.strokeWidth > 0 ? theme.markerRadius - markerTheme.strokeWidth / 2 : theme.markerRadius
    return (
      <circle
        id={id}
        fill={markerTheme.fillColor}
        r={radius}
        stroke={markerTheme.strokeColor}
        strokeWidth={markerTheme.strokeWidth}
      />
    )
  }

  renderXShapeDef(id: string, theme: FretboardTheme, markerTheme: MarkerTheme): ReactNode {
    const radius = theme.markerRadius
    const strokeCompensation = Math.floor(markerTheme.strokeWidth / 6)

    const line1X1 = -strokeCompensation
    const line1Y1 = -strokeCompensation
    const line1X2 = radius + strokeCompensation
    const line1Y2 = radius + strokeCompensation

    const line2X1 = radius + strokeCompensation
    const line2Y1 = -strokeCompensation
    const line2X2 = -strokeCompensation
    const line2Y2 = radius + strokeCompensation

    return (
      <g id={id} alignmentBaseline="central">
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

  renderPlaceholderMarker(util: FretboardModelUtil) {
    const radius = util.getTheme().markerRadius - 2
    return <circle id={MarkerDefs.placeholderMarkerId()} fill="none" r={radius} strokeWidth={2} />
  }

  renderMarkerShapeDef(util: FretboardModelUtil, kind: MarkerKind): ReactNode {
    const theme = util.getTheme()
    const id = MarkerDefs.shapeId(kind)
    const markerTheme = util.getMarkerTheme(kind)
    switch (markerTheme.shape) {
      case MarkerShape.Circle:
        return this.renderCircleShapeDef(id, theme, markerTheme)
      case MarkerShape.X:
        return this.renderXShapeDef(id, theme, markerTheme)
    }
  }

  render() {
    return (
      <FretboardContext.Consumer>
        {({ util }) => (
          <defs>
            {this.renderMarkerShapeDef(util, MarkerKind.Default)}
            {this.renderMarkerShapeDef(util, MarkerKind.Hollow)}
            {this.renderMarkerShapeDef(util, MarkerKind.Pimary)}
            {this.renderMarkerShapeDef(util, MarkerKind.Muted)}
            {this.renderPlaceholderMarker(util)}
          </defs>
        )}
      </FretboardContext.Consumer>
    )
  }

  static shapeId(kind: MarkerKind): string {
    return `marker-shape-${kind.toLowerCase()}`
  }
  static shapeRefId(kind: MarkerKind): string {
    return `#${MarkerDefs.shapeId(kind)}`
  }
  static placeholderMarkerId() {
    return `marker-placeholder`
  }
  static placeholderMarkerRefId() {
    return `#${MarkerDefs.placeholderMarkerId()}`
  }
}
