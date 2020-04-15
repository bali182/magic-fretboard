import React, { PureComponent } from 'react'
import { FretboardModelUtil } from './FretboadModelUtil'
import { Marker } from './Marker'
import { MarkerPlaceholder } from './MarkerPlaceholder'
import isNil from 'lodash/isNil'
import flatMap from 'lodash/flatMap'

export type MarkersProps = {
  util: FretboardModelUtil
  onMarkerCreated?: (stringId: string, fret: number) => void
  onMarkerSelected?: (markerId: string) => void
}

export class Markers extends PureComponent<MarkersProps> {
  render() {
    const { onMarkerSelected, onMarkerCreated, util } = this.props
    const strings = util.getStringIds()
    const frets = util.getFrets(true)
    return flatMap(strings, (stringId) =>
      flatMap(frets, (fret) => {
        const marker = util.getMarker(stringId, fret)
        if (!isNil(marker)) {
          return <Marker util={util} marker={marker} key={marker.id} onMarkerSelected={onMarkerSelected} />
        } else {
          return util.isPure() ? null : (
            <MarkerPlaceholder
              util={util}
              stringId={stringId}
              fret={fret}
              key={`${stringId}-${fret}`}
              onMarkerCreated={onMarkerCreated}
            />
          )
        }
      })
    )
  }
}
