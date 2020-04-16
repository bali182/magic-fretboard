import React, { PureComponent } from 'react'
import { Marker } from './Marker'
import { MarkerPlaceholder } from './MarkerPlaceholder'
import isNil from 'lodash/isNil'
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
            flatMap(frets, (fret) => {
              const marker = util.getMarker(stringId, fret)
              if (!isNil(marker)) {
                return <Marker marker={marker} key={marker.id} />
              } else {
                return util.isPure() ? null : (
                  <MarkerPlaceholder stringId={stringId} fret={fret} key={`${stringId}-${fret}`} />
                )
              }
            })
          )
        }}
      </FretboardContext.Consumer>
    )
  }
}
