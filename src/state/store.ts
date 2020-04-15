import { createStore, combineReducers, compose } from 'redux'
import { MagicFretboardAppState } from './state'
import { fretboardsReducer } from './fretboards/fretboards.reducer'
import { themeReducer } from './theme/theme.reducer'
import { selectionReducer } from './selection/selection.reducer'

const reducers = combineReducers<MagicFretboardAppState>({
  fretboards: fretboardsReducer,
  theme: themeReducer,
  selection: selectionReducer,
})

const composeEnhancers: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore<MagicFretboardAppState, any, any, any>(reducers, composeEnhancers())
