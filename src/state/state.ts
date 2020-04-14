import { FretboardModel, FretboardTheme } from '../components/Fretboard/FretboardModel'

export type FretboardsState = FretboardModel[]
export type ThemeState = FretboardTheme

export type MagicFretboardAppState = {
  fretboards: FretboardsState
  theme: ThemeState
}
