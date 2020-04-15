import React, { PureComponent, ReactNode, Fragment } from 'react'
import { FretboardModelUtil } from './FretboadModelUtil'
import { MarkerDefs } from './MarkerDefs'
import { css } from 'emotion'

type MarkerProps = {
  util: FretboardModelUtil
  stringId: string
  fret: number
  onMarkerCreated: (stringId: string, fret: number) => void
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
  private onClick = (e: React.MouseEvent<SVGCircleElement>) => {
    e.stopPropagation()
    const { fret, stringId, onMarkerCreated } = this.props
    onMarkerCreated(stringId, fret)
  }

  render() {
    const { util, stringId, fret } = this.props
    const x = util.getMarkerX(fret, null)
    const y = util.getMarkerY(stringId, null)
    const theme = util.getTheme()
    const radius = theme.markerRadius - 2
    const onClick = util.isPure() ? null : this.onClick
    return (
      <circle
        cx={x}
        cy={y}
        className={placeholderStyle}
        id={MarkerDefs.placeholderMarkerId()}
        r={radius}
        onClick={onClick}
      />
    )
  }
}
