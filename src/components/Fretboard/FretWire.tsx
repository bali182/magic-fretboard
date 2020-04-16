import React, { PureComponent } from 'react'
import { FretboardContext } from './FretboardContext'

type FretWireProps = {
  fret: number
}

export class FretWire extends PureComponent<FretWireProps> {
  render() {
    const { fret } = this.props
    return (
      <FretboardContext.Consumer>
        {({ util, onFretSelected }) => {
          const theme = util.getTheme()
          const x = util.getFretWireX(fret)
          const y1 = util.getFretWireY1(fret)
          const y2 = util.getFretWireY2(fret)
          const onClick = (e: React.MouseEvent<SVGLineElement>) => {
            e.stopPropagation()
            onFretSelected(fret)
          }
          return (
            <line
              stroke={theme.fretWireColor}
              x1={x}
              x2={x}
              y1={y1}
              y2={y2}
              strokeWidth={theme.fretWireWidth}
              key={fret}
              onClick={util.ifNotPure(onClick)}
            />
          )
        }}
      </FretboardContext.Consumer>
    )
  }
}
