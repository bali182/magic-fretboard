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

const markerStyle = (lowerOpacity: boolean) =>
  css({
    cursor: 'pointer',
    transition: 'opacity 200ms',
    opacity: lowerOpacity ? 0.5 : 1,
  })

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
    const isPure = util.isPure()
    if (!isNil(marker)) {
      const markerTheme = util.getMarkerTheme(marker.kind)
      if (marker.kind === MarkerKind.Muted) {
        return <XShape markerTheme={markerTheme} theme={theme} />
      }
      return <CircleShape markerTheme={markerTheme} theme={theme} />
    }
    if (!isPure) {
      return <PlaceholderShape theme={theme} />
    }
  }

  private shouldLowerOpacity(util: FretboardModelUtil, marker: MarkerModel): boolean {
    const isMarkerHovered = util.isMarkerHovered(marker.id)
    if (isMarkerHovered) {
      return false
    }
    const isAnyMarkerHovered = isMarkerSelection(util.getHoverSelection())
    if (isAnyMarkerHovered && !isMarkerHovered) {
      return true
    }
    const isAnyMarkerSelected = isMarkerSelection(util.getSelection())
    const isMarkerSelected = util.isMarkerSelected(marker.id)
    return !isMarkerSelected && isAnyMarkerSelected
  }

  render() {
    const { fret, stringId } = this.props
    return (
      <FretboardContext.Consumer>
        {({ util, onMarkerSelected, onMarkerCreated, onMarkerHovered }) => {
          const marker = util.getMarker(stringId, fret)
          const x = util.getMarkerX(fret)
          const y = util.getMarkerY(stringId)

          const onClick = util.ifNotPure((e: React.MouseEvent) => {
            e.stopPropagation()
            if (isNil(marker)) {
              onMarkerCreated(stringId, fret)
            } else {
              onMarkerSelected(util.isMarkerSelected(marker.id) ? null : marker.id)
            }
          })

          const onMouseEnter = util.ifNotPure(() => {
            if (!isNil(marker)) {
              onMarkerHovered(marker.id)
            }
          })

          const onMouseLeave = util.ifNotPure(() => {
            if (!isNil(marker)) {
              onMarkerHovered(null)
            }
          })

          const shouldLowerOpacity = !isNil(marker) && this.shouldLowerOpacity(util, marker)
          const className = util.ifNotPure(markerStyle(shouldLowerOpacity))
          return (
            <svg
              x={x}
              y={y}
              className={className}
              onClick={onClick}
              xmlns="http://www.w3.org/2000/svg"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}>
              {this.renderShape(util, marker)}
              {this.renderLabel(util, marker)}
            </svg>
          )
        }}
      </FretboardContext.Consumer>
    )
  }
}
