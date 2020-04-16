import React, { PureComponent } from 'react'
import { css } from 'emotion'
import { EditorField } from './EditorField'
import { EditorString } from './EditorString'
import { EditorNumber } from './EditorNumber'
import { EditorSelect } from './EditorSelect'
import { MarkerKind } from '../Fretboard/FretboardModel'

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
  backgroundColor: '#eee',
  borderBottomColor: '#bbb',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
})

const headerLabelStyle = css({
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
  padding: '8px',
  fontWeight: 'bold',
  fontSize: '1.2em',
  color: '#6c6c6c',
})

const scrollAreaStyle = css({
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
  overflowY: 'auto',
  padding: '8px',
})

export type EditorPanelProps = {}

export class EditorPanel extends PureComponent<EditorPanelProps> {
  render() {
    return (
      <div className={editorPanelStyle}>
        <div className={headerStyle}>
          <div className={headerLabelStyle}>Edit Properties</div>
        </div>
        <div className={scrollAreaStyle}>
          <EditorField name="String field" description="This is a string field">
            <EditorString value="String value" onChange={() => {}} />
          </EditorField>
          <EditorField name="Number field" description="This is a number field">
            <EditorNumber value={5} onChange={() => {}} />
          </EditorField>
          <EditorField name="Select field" description="This is a select field">
            <EditorSelect
              value={MarkerKind.Default}
              options={[MarkerKind.Default, MarkerKind.Hollow, MarkerKind.Pimary, MarkerKind.Muted]}
              onChange={() => {}}
            />
          </EditorField>
        </div>
      </div>
    )
  }
}
