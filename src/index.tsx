import React from 'react'
import { render } from 'react-dom'
import { Fretboard } from './Fretboard/Fretboard'
import { defaultModel, defaultTheme } from './Fretboard/sampleModels'

render(
  <div style={{ padding: '20px' }}>
    <Fretboard model={defaultModel} theme={defaultTheme} />
  </div>,
  document.getElementById('root')
)
