import React, { PureComponent } from 'react'
import { css } from 'emotion'

const headerStyle = css({
  height: '70px',
  width: '100%',
  display: 'flex',
  alignContent: 'center',
  alignItems: 'center',
  backgroundColor: '#eee',
  borderBottomColor: '#bbb',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  padding: '10px',
})

const headerLabelStyle = css({
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
  fontWeight: 'bold',
  fontSize: '1.2em',
  color: '#6c6c6c',
})

export class EditorHeader extends PureComponent {
  render() {
    const { children } = this.props
    return <div className={headerStyle}>{children}</div>
  }
}

export type EditorTitleProps = {
  title: string
}

export class EditorTitle extends PureComponent<EditorTitleProps> {
  render() {
    const { title } = this.props
    return <div className={headerLabelStyle}>{title}</div>
  }
}
