import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppLayout } from './components/AppLayout/AppLayout'
import { store } from './state/store'

render(
  <Provider store={store}>
    <AppLayout />
  </Provider>,
  document.getElementById('root')
)
