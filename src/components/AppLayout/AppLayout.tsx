import React, { PureComponent } from 'react'
import { css } from 'emotion'
import { FretboardsView } from '../FretboardsView/FretboardsView'
import { EditorPanel } from '../EditorPanel/EditorPanel'

const appLayoutStyle = css({
  display: 'flex',
  flexDirection: 'row',
  width: '100vw',
  height: '100vh',
})

export class AppLayout extends PureComponent {
  render() {
    return (
      <div className={appLayoutStyle}>
        <FretboardsView />
        <EditorPanel />
      </div>
    )
  }
}
