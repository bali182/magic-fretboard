import React, { PureComponent } from 'react'
import { css } from 'emotion'

const fretboardsViewStyle = css({
  height: '100vh',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
  backgroundColor: '#fff',
})

export type FretboardsViewProps = {}

export class FretboardsView extends PureComponent<FretboardsViewProps> {
  render() {
    return <div className={fretboardsViewStyle}>Hi</div>
  }
}
