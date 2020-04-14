import React, { PureComponent } from 'react'
import { css } from 'emotion'
import { Fretboard } from '../Fretboard/Fretboard'
import { FretboardModel, FretboardTheme } from '../Fretboard/FretboardModel'

const fretboardViewStyle = css({
  backgroundColor: '#eee',
  border: '1px solid #bbb',
  padding: '20px',
  marginBottom: '20px',
  overflowX: 'auto',
  overflowY: 'hidden',
  flexShrink: 0,
})

export type FretboardViewProps = {
  model: FretboardModel
  theme: FretboardTheme
}

export class FretboardView extends PureComponent<FretboardViewProps> {
  render() {
    const { model, theme } = this.props
    return (
      <div className={fretboardViewStyle}>
        <Fretboard model={model} theme={theme} />
      </div>
    )
  }
}
