import React, { PureComponent, ReactNode, Fragment } from 'react'
import isNil from 'lodash/isNil'
import { MarkerModel } from './FretboardModel'
import { MarkerDefs } from './MarkerDefs'
import { FretboardContext } from './FretboardContext'
import { FretboardModelUtil } from './FretboadModelUtil'

type MarkerProps = {
  marker: MarkerModel
}

export class Marker extends PureComponent<MarkerProps> {
  private renderLabel(util: FretboardModelUtil, onClick: React.MouseEventHandler, x: number, y: number): ReactNode {
    const { marker } = this.props
    if (isNil(marker.label) || marker.label.length === 0) {
      return null
    }
    const { fontColor, fontFamily, fontSize } = util.getMarkerTheme(marker.kind)
    return (
      <text
        transform={util.getOrientationTransform()}
        x={util.getTextXMultiplier() * x}
        y={y}
        fill={fontColor}
        fontSize={fontSize}
        fontFamily={fontFamily}
        onClick={util.ifNotPure(onClick)}
        textAnchor="middle"
        alignmentBaseline="central">
        {marker.label}
      </text>
    )
  }

  private renderShape(onClick: React.MouseEventHandler, x: number, y: number): ReactNode {
    const { marker } = this.props
    return <use x={x} y={y} onClick={onClick} xlinkHref={MarkerDefs.shapeRefId(marker.kind)} />
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
            onMarkerSelected(marker.id)
          })
          return (
            <Fragment>
              {this.renderShape(onClick, x, y)}
              {this.renderLabel(util, onClick, x, y)}
            </Fragment>
          )
        }}
      </FretboardContext.Consumer>
    )
  }
}
