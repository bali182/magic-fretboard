import React from 'react'
import { render } from 'react-dom'
import { Fretboard } from './Fretboard/Fretboard'
import { sampleModel } from './Fretboard/sampleModel'
import { defaultTheme } from './Fretboard/defaultTheme'

render(
  <div style={{ padding: '20px' }}>
    <Fretboard model={sampleModel} theme={defaultTheme} />
  </div>,
  document.getElementById('root')
)
