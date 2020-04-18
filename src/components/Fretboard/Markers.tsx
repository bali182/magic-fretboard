import React, { PureComponent } from 'react'
import { Marker } from './Marker'
import flatMap from 'lodash/flatMap'
import { FretboardContext } from './FretboardContext'

export class Markers extends PureComponent {
  render() {
    return (
      <FretboardContext.Consumer>
        {({ util }) => {
          const strings = util.getStringIds()
          const frets = util.getFrets(true)
          return flatMap(strings, (stringId) =>
            flatMap(frets, (fret) => <Marker fret={fret} stringId={stringId} key={`${stringId}-${fret}`} />)
          )
        }}
      </FretboardContext.Consumer>
    )
  }
}
