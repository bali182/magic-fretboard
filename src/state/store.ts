import { createStore, combineReducers } from 'redux'
import { MagicFretboardAppState } from './state'
import { fretboardsReducer } from './fretboards/fretboards.reducer'
import { themeReducer } from './theme/theme.reducer'

const reducers = combineReducers<MagicFretboardAppState>({
  fretboards: fretboardsReducer,
  theme: themeReducer,
})

export const store = createStore<MagicFretboardAppState, any, any, any>(reducers)
