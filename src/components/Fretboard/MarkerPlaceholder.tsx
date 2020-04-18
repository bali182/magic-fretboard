import React, { PureComponent } from 'react'
import { css } from 'emotion'
import { FretboardContext } from './FretboardContext'

type MarkerProps = {
  stringId: string
  fret: number
}

const placeholderStyle = css({
  stroke: 'transparent',
  fill: 'transparent',
  strokeWidth: 4,
  strokeDasharray: 6,
  cursor: 'pointer',
  ':hover': {
    fill: 'rgba(39, 169, 225, 0.2)',
    stroke: '#27a9e1',
  },
})

export class MarkerPlaceholder extends PureComponent<MarkerProps> {
  render() {
    const { stringId, fret } = this.props
    return (
      <FretboardContext.Consumer>
        {({ util, onMarkerCreated }) => {
          const x = util.getMarkerX(fret, null)
          const y = util.getMarkerY(stringId, null)
          const theme = util.getTheme()
          const radius = theme.markerRadius - 2
          const onClick = (e: React.MouseEvent<SVGCircleElement>) => {
            e.stopPropagation()
            onMarkerCreated(stringId, fret)
          }
          return <circle cx={x} cy={y} className={placeholderStyle} r={radius} onClick={util.ifNotPure(onClick)} />
        }}
      </FretboardContext.Consumer>
    )
  }
}
