import { FretboardModel, FretboardTheme, SelectionModel } from '../components/Fretboard/FretboardModel'

export type FretboardsState = FretboardModel[]
export type ThemeState = FretboardTheme
export type SelectionState = { fretboardId: string; selection: SelectionModel }

export type MagicFretboardAppState = {
  fretboards: FretboardsState
  theme: ThemeState
  selection: SelectionState
}
