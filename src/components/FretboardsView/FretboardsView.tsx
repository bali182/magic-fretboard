import React, { PureComponent } from 'react'
import { css } from 'emotion'
import { FretboardView } from './FretboardView'
import { defaultTheme } from '../../state/defaultTheme'
import { sampleModel } from '../Fretboard/sampleModel'

const fretboardsViewStyle = css({
  height: '100vh',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
  backgroundColor: '#fff',
  padding: '20px',
})

export type FretboardsViewProps = {}

export class FretboardsView extends PureComponent<FretboardsViewProps> {
  render() {
    return (
      <div className={fretboardsViewStyle}>
        <FretboardView theme={defaultTheme} model={sampleModel} />
        <FretboardView theme={defaultTheme} model={{ ...sampleModel, firstVisibleFret: 3, lastVisibleFret: 10 }} />
      </div>
    )
  }
}
