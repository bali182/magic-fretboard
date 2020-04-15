import { FretboardModel, FretboardTheme } from '../components/Fretboard/FretboardModel'
import { SelectionModel } from './selection/SelectionModel'

export type FretboardsState = FretboardModel[]
export type ThemeState = FretboardTheme
export type SelectionState = SelectionModel

export type MagicFretboardAppState = {
  fretboards: FretboardsState
  theme: ThemeState
  selection: SelectionState
}
