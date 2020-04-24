import React, { PureComponent } from 'react'
import { FretboardModel, FretboardTheme, SelectionModel } from './FretboardModel'
import { FretboardModelUtil } from './FretboadModelUtil'
import { Nut } from './Nut'
import { Markers } from './Markers'
import { Frets } from './Frets'
import { GuitarStrings } from './GuitarStrings'
import {
  FretboardContext,
  FretboardContextType,
  MarkerCreationHandler,
  MarkerActionHandler,
  FretSelectionHandler,
  StringSelectionHandler,
  FretboardSelectionHandler,
} from './FretboardContext'
import isNil from 'lodash/isNil'

const noop = () => {}

export type FretboardProps = {
  model: FretboardModel
  theme: FretboardTheme
  selection?: SelectionModel
  pure?: boolean

  onMarkerCreated?: MarkerCreationHandler
  onMarkerDeleted?: MarkerActionHandler
  onMarkerSelected?: MarkerActionHandler
  onFretSelected?: FretSelectionHandler
  onStringSelected?: StringSelectionHandler
  onFretboardSelected?: FretboardSelectionHandler
}

export type FretboardState = {
  hoverSelection: SelectionModel
}

export class Fretboard extends PureComponent<FretboardProps, FretboardState> {
  state: FretboardState = {
    hoverSelection: null,
  }

  private onMarkerHovered = (markerId: string) => {
    this.setState({
      hoverSelection: isNil(markerId)
        ? null
        : {
            type: 'markerSelection',
            markerId,
          },
    })
  }

  private onStringHovered = (stringId: string) => {
    this.setState({
      hoverSelection: isNil(stringId)
        ? null
        : {
            type: 'stringSelection',
            stringId,
          },
    })
  }

  render() {
    const {
      model,
      theme,
      pure,
      onMarkerCreated,
      onMarkerSelected,
      onMarkerDeleted,
      onFretSelected,
      onStringSelected,
      onFretboardSelected,
      selection,
    } = this.props

    const { hoverSelection } = this.state

    const util = new FretboardModelUtil(model, theme, selection, hoverSelection, Boolean(pure))
    const width = util.getViewportWidth()
    const height = util.getViewportHeight()
    const transform = util.getOrientationTransform()

    const context: FretboardContextType = {
      util,
      onMarkerCreated,
      onMarkerSelected,
      onFretSelected,
      onStringSelected,
      onFretboardSelected,
      onMarkerDeleted,
      onMarkerHovered: this.onMarkerHovered,
      onStringHovered: this.onStringHovered,
    }

    return (
      <FretboardContext.Provider value={context}>
        <svg width={width} height={height} transform={transform} xmlns="http://www.w3.org/2000/svg">
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
    onMarkerCreated: noop,
    onFretSelected: noop,
    onStringSelected: noop,
    onMarkerSelected: noop,
    onFretboardSelected: noop,
    onMarkerDeleted: noop,
  }
}
