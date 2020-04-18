import React, { PureComponent } from 'react'
import { StringModel } from './FretboardModel'
import { FretboardContext } from './FretboardContext'
import { css } from 'emotion'
import { FretboardModelUtil } from './FretboadModelUtil'
import { isStringSelection } from './TypeGuards'

type GuitarStringProps = {
  string: StringModel
}

const stringStyle = (lowerOpacity: boolean) =>
  css({
    cursor: 'pointer',
    transition: 'opacity 200ms',
    opacity: lowerOpacity ? 0.5 : 1,
  })

export class GuitarString extends PureComponent<GuitarStringProps> {
  private shouldLowerOpacity(util: FretboardModelUtil, marker: StringModel): boolean {
    const isMarkerHovered = util.isStringHovered(marker.id)
    if (isMarkerHovered) {
      return false
    }
    const isAnyMarkerHovered = isStringSelection(util.getHoverSelection())
    if (isAnyMarkerHovered && !isMarkerHovered) {
      return true
    }
    const isAnyMarkerSelected = isStringSelection(util.getSelection())
    const isMarkerSelected = util.isStringSelected(marker.id)
    return !isMarkerSelected && isAnyMarkerSelected
  }

  render() {
    const { string } = this.props

    return (
      <FretboardContext.Consumer>
        {({ util, onStringSelected, onStringHovered }) => {
          const theme = util.getTheme()
          const x1 = util.getStringX1(string.id)
          const x2 = util.getStringX2(string.id)
          const y = util.getStringY(string.id)
          const shouldLowerOpacity = this.shouldLowerOpacity(util, string)
          const className = util.ifNotPure(stringStyle(shouldLowerOpacity))
          const onClick = util.ifNotPure((e: React.MouseEvent<SVGLineElement>) => {
            e.stopPropagation()
            onStringSelected(util.isStringSelected(string.id) ? null : string.id)
          })
          const onMouseEnter = util.ifNotPure(() => onStringHovered(string.id))
          const onMouseLeave = util.ifNotPure(() => onStringHovered(null))
          return (
            <line
              className={className}
              stroke={theme.stringColor}
              x1={x1}
              x2={x2}
              y1={y}
              y2={y}
              strokeWidth={string.thickness}
              key={string.id}
              onClick={onClick}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />
          )
        }}
      </FretboardContext.Consumer>
    )
  }
}
