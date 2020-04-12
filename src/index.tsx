import React from 'react'
import { render } from 'react-dom'
import { Fretboard } from './Fretboard/Fretboard'

render(
  <div style={{ padding: '20px' }}>
    <Fretboard />
  </div>,
  document.getElementById('root')
)
