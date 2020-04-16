import React, { PureComponent } from 'react'
import { FretWire } from './FretWire'
import { FretboardContext } from './FretboardContext'

export class Frets extends PureComponent {
  render() {
    return (
      <FretboardContext.Consumer>
        {({ util }) => {
          return util
            .getFrets(false)
            .filter((fret) => fret > 0)
            .map((fret) => <FretWire fret={fret} key={fret} />)
        }}
      </FretboardContext.Consumer>
    )
  }
}
