import React, { PureComponent } from 'react'
import { FretboardModel, FretboardTheme } from './FretboardModel'
import { FretboardModelUtil } from './FretboadModelUtil'
import { MarkerDefs } from './MarkerDefs'
import { Nut } from './Nut'
import { Markers } from './Markers'
import { Frets } from './Frets'
import { GuitarStrings } from './GuitarStrings'

export type FretboardProps = {
  model: FretboardModel
  theme: FretboardTheme
  pure?: boolean

  onMarkerCreated?: (stringId: string, fret: number) => void
  onMarkerSelected?: (markerId: string) => void
  onFretSelected?: (fret: number) => void
  onStringSelected?: (stringId: string) => void
}

export class Fretboard extends PureComponent<FretboardProps> {
  render() {
    const { model, theme, pure, onMarkerCreated, onMarkerSelected, onFretSelected, onStringSelected } = this.props
    const util = new FretboardModelUtil(model, theme, Boolean(pure))
    return (
      <svg
        width={util.getViewportWidth()}
        height={util.getViewportHeight()}
        transform={util.getOrientationTransform()}
        xmlns="http://www.w3.org/2000/svg">
        <MarkerDefs util={util} />
        <Frets util={util} onFretSelected={onFretSelected} />
        <Nut util={util} />
        <GuitarStrings util={util} onStringSelected={onStringSelected} />
        <Markers util={util} onMarkerCreated={onMarkerCreated} onMarkerSelected={onMarkerSelected} />
      </svg>
    )
  }

  static defaultProps: Partial<FretboardProps> = {
    pure: false,
    onMarkerCreated: () => {},
    onFretSelected: () => {},
    onStringSelected: () => {},
    onMarkerSelected: () => {},
  }
}
