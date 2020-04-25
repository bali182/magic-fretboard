import React, { PureComponent, Fragment } from 'react'
import { FretWire } from './FretWire'
import { FretboardContext } from './FretboardContext'
import { Dot } from './Dot'

export class Frets extends PureComponent {
  render() {
    return (
      <FretboardContext.Consumer>
        {({ util }) => {
          return util
            .getFrets(false)
            .filter((fret) => fret > 0)
            .map((fret) => (
              <Fragment key={fret}>
                <FretWire fret={fret} />
                <Dot fret={fret} />
              </Fragment>
            ))
        }}
      </FretboardContext.Consumer>
    )
  }
}
