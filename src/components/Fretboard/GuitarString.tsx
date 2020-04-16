import React, { PureComponent } from 'react'
import { StringModel } from './FretboardModel'
import { FretboardContext } from './FretboardContext'

type GuitarStringProps = {
  string: StringModel
}

export class GuitarString extends PureComponent<GuitarStringProps> {
  render() {
    const { string } = this.props

    return (
      <FretboardContext.Consumer>
        {({ util, onStringSelected }) => {
          const theme = util.getTheme()
          const x1 = util.getStringX1(string.id)
          const x2 = util.getStringX2(string.id)
          const y = util.getStringY(string.id)
          const onClick = (e: React.MouseEvent<SVGLineElement>) => {
            e.stopPropagation()
            onStringSelected(string.id)
          }
          return (
            <line
              stroke={theme.stringColor}
              x1={x1}
              x2={x2}
              y1={y}
              y2={y}
              strokeWidth={string.thickness}
              key={string.id}
              onClick={util.ifNotPure(onClick)}
            />
          )
        }}
      </FretboardContext.Consumer>
    )
  }
}
