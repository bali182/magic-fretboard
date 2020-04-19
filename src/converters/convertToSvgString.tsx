import React from 'react'
import { renderToString } from 'react-dom/server'
import { FretboardModel, FretboardTheme } from '../components/Fretboard/FretboardModel'
import { Fretboard } from '../components/Fretboard/Fretboard'

export function convertToSvgString(fretboard: FretboardModel, theme: FretboardTheme): Promise<string> {
  try {
    return Promise.resolve(renderToString(<Fretboard model={fretboard} theme={theme} pure={true} />))
  } catch (error) {
    return Promise.reject(error)
  }
}
