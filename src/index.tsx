import React from 'react'
import { render } from 'react-dom'
import { Fretboard } from './components/Fretboard/Fretboard'
import { sampleModel } from './components/Fretboard/sampleModel'
import { defaultTheme } from './state/defaultTheme'

render(
  <div style={{ padding: '20px' }}>
    <Fretboard model={sampleModel} theme={defaultTheme} />
  </div>,
  document.getElementById('root')
)
