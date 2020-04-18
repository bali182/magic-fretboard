import { FretboardModelUtil } from './FretboadModelUtil'
import { createContext } from 'react'

export type MarkerCreationHandler = (stringId: string, fret: number) => void
export type MarkerSelectionHandler = (markerId: string) => void
export type FretSelectionHandler = (fret: number) => void
export type StringSelectionHandler = (stringId: string) => void
export type FretboardSelectionHandler = (freboardId: string) => void

export type FretboardContextType = {
  util: FretboardModelUtil

  onMarkerCreated: MarkerCreationHandler
  onMarkerSelected: MarkerSelectionHandler
  onFretSelected: FretSelectionHandler
  onStringSelected: StringSelectionHandler
  onFretboardSelected: FretboardSelectionHandler

  onMarkerHovered: MarkerSelectionHandler
  onStringHovered: StringSelectionHandler
}

export const FretboardContext = createContext<FretboardContextType>(null)
