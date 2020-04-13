import React, { PureComponent } from 'react'
import { css } from 'emotion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const editorPanelStyle = css({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  width: '300px',
  backgroundColor: '#fff',
  borderLeftColor: '#bbb',
  borderLeftWidth: '1px',
  borderLeftStyle: 'solid',
  boxShadow: '0px 0px 24px 0px rgba(0,0,0,0.3)',
})

const headerStyle = css({
  height: '50px',
  width: '100%',
  display: 'flex',
  alignContent: 'center',
  alignItems: 'center',
  padding: '10px 16px',
  backgroundColor: '#eee',
  borderBottomColor: '#bbb',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
})

const headerLabelStyle = css({
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
})

const scrollAreaStyle = css({
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
  overflowY: 'auto',
})

export type EditorPanelProps = {}

export class EditorPanel extends PureComponent<EditorPanelProps> {
  render() {
    return (
      <div className={editorPanelStyle}>
        <div className={headerStyle}>
          <div className={headerLabelStyle}>Edit Properties</div>
          <FontAwesomeIcon icon={faTimes} color="#333" onClick={() => console.log('hi')} cursor="pointer" />
        </div>
        <div className={scrollAreaStyle}>Property editors here</div>
      </div>
    )
  }
}
