import React from 'react'
import { render } from 'react-dom'
import { Fretboard } from './Fretboard/Fretboard'
import { model } from './Fretboard/sampleModels'

render(
  <div style={{ padding: '20px' }}>
    <Fretboard model={model} />
  </div>,
  document.getElementById('root')
)
