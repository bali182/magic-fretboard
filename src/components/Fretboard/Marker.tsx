import React, { PureComponent, ReactNode } from 'react'
import isNil from 'lodash/isNil'
import { MarkerModel, MarkerKind } from './FretboardModel'
import { FretboardContext } from './FretboardContext'
import { FretboardModelUtil } from './FretboadModelUtil'
import { css } from 'emotion'
import { isMarkerSelection } from './TypeGuards'
import { XShape } from './XShape'
import { CircleShape } from './CircleShape'
import { PlaceholderShape } from './PlaceholderShape'

const markerStyle = (faded: boolean) => {
  return css({
    cursor: 'pointer',
    opacity: faded ? 0.7 : 1,
  })
}

type MarkerProps = {
  fret: number
  stringId: string
}

export class Marker extends PureComponent<MarkerProps> {
  private renderLabel(util: FretboardModelUtil, marker: MarkerModel): ReactNode {
    if (isNil(marker) || isNil(marker.label) || marker.label.length === 0) {
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

  private renderShape(util: FretboardModelUtil, marker: MarkerModel): ReactNode {
    const theme = util.getTheme()
    if (isNil(marker)) {
      return <PlaceholderShape theme={theme} />
    }
    const markerTheme = util.getMarkerTheme(marker.kind)
    if (marker.kind === MarkerKind.Muted) {
      return <XShape markerTheme={markerTheme} theme={theme} />
    }
    return <CircleShape markerTheme={markerTheme} theme={theme} />
  }

  render() {
    const { fret, stringId } = this.props
    return (
      <FretboardContext.Consumer>
        {({ util, onMarkerSelected, onMarkerCreated }) => {
          const marker = util.getMarker(stringId, fret)
          const x = util.getMarkerX(fret, isNil(marker) ? null : marker.kind)
          const y = util.getMarkerY(stringId, isNil(marker) ? null : marker.kind)
          const onClick = util.ifNotPure((e: React.MouseEvent) => {
            e.stopPropagation()
            if (isNil(marker)) {
              onMarkerCreated(stringId, fret)
            } else {
              onMarkerSelected(util.isMarkerSelected(marker) ? null : marker.id)
            }
          })
          const isMarkerFaded =
            isMarkerSelection(util.getSelection()) && !isNil(marker) && !util.isMarkerSelected(marker)
          const className = util.ifNotPure(markerStyle(isMarkerFaded))
          return (
            <svg x={x} y={y} className={className} onClick={onClick} xmlns="http://www.w3.org/2000/svg">
              {this.renderShape(util, marker)}
              {this.renderLabel(util, marker)}
            </svg>
          )
        }}
      </FretboardContext.Consumer>
    )
  }
}
