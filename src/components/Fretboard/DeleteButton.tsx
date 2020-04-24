import React, { PureComponent, Fragment } from 'react'
import { FretboardContext } from './FretboardContext'
import { MarkerModel } from './FretboardModel'

export type DeleteButtonProps = {
  marker: MarkerModel
}

export class DeleteButton extends PureComponent<DeleteButtonProps> {
  render() {
    const { marker } = this.props
    return (
      <FretboardContext.Consumer>
        {({ util, onMarkerDeleted, onMarkerHovered }) => {
          const onDelete = (e: React.MouseEvent) => {
            e.stopPropagation()
            e.preventDefault()
            onMarkerDeleted(marker.id)
            onMarkerHovered(null)
          }

          const theme = util.getTheme()
          const lineX1 = theme.markerRadius * 2 - 3
          const lineX2 = theme.markerRadius * 2 + 3
          const lineY = 11
          return (
            <Fragment>
              <circle
                fill="#fff"
                cx={theme.markerRadius * 2}
                cy={11}
                stroke="#B75342"
                strokeWidth={2}
                r={10}
                onClick={onDelete}
              />
              <line
                strokeWidth={4}
                stroke="#B75342"
                x1={lineX1}
                y1={lineY}
                x2={lineX2}
                y2={lineY}
                strokeLinecap="round"
                onClick={onDelete}
              />
            </Fragment>
          )
        }}
      </FretboardContext.Consumer>
    )
  }
}
