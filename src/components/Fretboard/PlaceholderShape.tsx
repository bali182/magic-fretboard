import React, { PureComponent } from 'react'
import { css } from 'emotion'
import { FretboardTheme } from './FretboardModel'

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

export type PlaceholderShapeProps = {
  theme: FretboardTheme
}

export class PlaceholderShape extends PureComponent<PlaceholderShapeProps> {
  render() {
    const { theme } = this.props
    const { markerRadius } = theme
    const radius = markerRadius - 2
    return <circle cx={markerRadius} cy={markerRadius} className={placeholderStyle} r={radius} />
  }
}
