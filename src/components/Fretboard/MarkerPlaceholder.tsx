import React, { PureComponent, ReactNode, Fragment } from 'react'
import { FretboardModelUtil } from './FretboadModelUtil'
import { MarkerDefs } from './MarkerDefs'
import { css } from 'emotion'

type MarkerProps = {
  util: FretboardModelUtil
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
    const { util, stringId, fret } = this.props
    const x = util.getMarkerX(fret, null)
    const y = util.getMarkerY(stringId, null)
    const theme = util.getTheme()
    const radius = theme.markerRadius - 2
    return <circle cx={x} cy={y} className={placeholderStyle} id={MarkerDefs.placeholderMarkerId()} r={radius} />
  }
}
