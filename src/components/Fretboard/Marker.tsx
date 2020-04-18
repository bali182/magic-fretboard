import React, { PureComponent, ReactNode } from 'react'
import isNil from 'lodash/isNil'
import { MarkerModel, MarkerKind } from './FretboardModel'
import { FretboardContext } from './FretboardContext'
import { FretboardModelUtil } from './FretboadModelUtil'
import { css } from 'emotion'
import { isMarkerSelection } from './TypeGuards'
import { XShape } from './XShape'
import { CircleShape } from './CircleShape'

const markerStyle = (faded: boolean) => {
  return css({
    cursor: 'pointer',
    opacity: faded ? 0.7 : 1,
  })
}

type MarkerProps = {
  marker: MarkerModel
}

export class Marker extends PureComponent<MarkerProps> {
  private renderLabel(util: FretboardModelUtil, x: number, y: number): ReactNode {
    const { marker } = this.props
    if (isNil(marker.label) || marker.label.length === 0) {
      return null
    }
    const { fontColor, fontFamily, fontSize } = util.getMarkerTheme(marker.kind)
    const { markerRadius } = util.getTheme()
    return (
      <text
        x={util.getTextXMultiplier() * markerRadius}
        y={markerRadius}
        transform={util.getOrientationTransform()}
        fill={fontColor}
        fontSize={fontSize}
        fontFamily={fontFamily}
        textAnchor="middle"
        alignmentBaseline="central">
        {marker.label}
      </text>
    )
  }

  private renderShape(util: FretboardModelUtil): ReactNode {
    const { marker } = this.props
    const theme = util.getTheme()
    const markerTheme = util.getMarkerTheme(marker.kind)
    if (marker.kind === MarkerKind.Muted) {
      return <XShape markerTheme={markerTheme} theme={theme} />
    }
    return <CircleShape markerTheme={markerTheme} theme={theme} />
  }

  render() {
    const { marker } = this.props
    return (
      <FretboardContext.Consumer>
        {({ util, onMarkerSelected }) => {
          const x = util.getMarkerX(marker.fret, marker.kind)
          const y = util.getMarkerY(marker.stringId, marker.kind)
          const onClick = util.ifNotPure((e: React.MouseEvent) => {
            e.stopPropagation()
            onMarkerSelected(util.isMarkerSelected(marker) ? null : marker.id)
          })
          const isMarkerFaded = isMarkerSelection(util.getSelection()) && !util.isMarkerSelected(marker)
          const className = util.ifNotPure(markerStyle(isMarkerFaded))
          const markerRadius = util.getTheme().markerRadius
          return (
            <svg
              x={x - markerRadius}
              y={y - markerRadius}
              className={className}
              onClick={onClick}
              xmlns="http://www.w3.org/2000/svg">
              {this.renderShape(util)}
              {this.renderLabel(util, markerRadius, markerRadius)}
            </svg>
          )
        }}
      </FretboardContext.Consumer>
    )
  }
}
