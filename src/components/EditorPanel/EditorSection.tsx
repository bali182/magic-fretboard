import React, { PureComponent, ReactNode, Fragment } from 'react'
import { css } from 'emotion'

const sectionHeaderStyle = css({
  height: '50px',
  width: '100%',
  display: 'flex',
  alignContent: 'center',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: '#eee',
  borderBottomColor: '#bbb',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderTopColor: '#bbb',
  borderTopWidth: '1px',
  borderTopStyle: 'solid',

  ':first-child': {
    borderTopWidth: '0px',
  },
})

const headerLabelStyle = css({
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
  fontWeight: 'bold',
  fontSize: '1.2em',
  color: '#6c6c6c',
})

export type EditorSectionProps = {
  title: string
  children: ReactNode
}

export class EditorSection extends PureComponent<EditorSectionProps> {
  render() {
    const { children, title } = this.props
    return (
      <Fragment>
        <div className={sectionHeaderStyle}>
          <div className={headerLabelStyle}>{title}</div>
        </div>
        {children}
      </Fragment>
    )
  }
}
