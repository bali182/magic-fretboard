import React, { PureComponent } from 'react'
import { css } from 'emotion'

const editorPanelStyle = css({
  height: '100vh',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  width: '300px',
  backgroundColor: '#fff',
  borderLeftColor: '#bbb',
  borderLeftWidth: '1px',
  borderLeftStyle: 'solid',
  boxShadow: '0px 0px 24px 0px rgba(0,0,0,0.3)',
})

export type EditorPanelProps = {}

export class EditorPanel extends PureComponent<EditorPanelProps> {
  render() {
    return <div className={editorPanelStyle}>henlo</div>
  }
}
