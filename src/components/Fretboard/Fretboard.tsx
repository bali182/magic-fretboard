import React, { PureComponent } from 'react'
import { FretboardModel, FretboardTheme, SelectionModel } from './FretboardModel'
import { FretboardModelUtil } from './FretboadModelUtil'
import { MarkerDefs } from './MarkerDefs'
import { Nut } from './Nut'
import { Markers } from './Markers'
import { Frets } from './Frets'
import { GuitarStrings } from './GuitarStrings'
import {
  FretboardContext,
  FretboardContextType,
  MarkerCreationHandler,
  MarkerSelectionHandler,
  FretSelectionHandler,
  StringSelectionHandler,
} from './FretboardContext'

export type FretboardProps = {
  model: FretboardModel
  theme: FretboardTheme
  selection?: SelectionModel
  pure?: boolean

  onMarkerCreated?: MarkerCreationHandler
  onMarkerSelected?: MarkerSelectionHandler
  onFretSelected?: FretSelectionHandler
  onStringSelected?: StringSelectionHandler
}

export class Fretboard extends PureComponent<FretboardProps> {
  render() {
    const {
      model,
      theme,
      pure,
      onMarkerCreated,
      onMarkerSelected,
      onFretSelected,
      onStringSelected,
      selection,
    } = this.props

    const util = new FretboardModelUtil(model, theme, selection, Boolean(pure))
    const width = util.getViewportWidth()
    const height = util.getViewportHeight()
    const transform = util.getOrientationTransform()

    const context: FretboardContextType = {
      util,
      onMarkerCreated,
      onMarkerSelected,
      onFretSelected,
      onStringSelected,
    }

    return (
      <FretboardContext.Provider value={context}>
        <svg width={width} height={height} transform={transform} xmlns="http://www.w3.org/2000/svg">
          <MarkerDefs />
          <Frets />
          <Nut />
          <GuitarStrings />
          <Markers />
        </svg>
      </FretboardContext.Provider>
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
