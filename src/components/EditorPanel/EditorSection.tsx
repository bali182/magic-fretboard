import React, { PureComponent, ReactNode, Fragment } from 'react'
import { css } from 'emotion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { EditorContext } from './EditorContext'

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

const sectionChildrenStyle = (closed: boolean) =>
  css({
    height: closed ? '0px' : 'auto',
    overflowY: closed ? 'hidden' : 'auto',
  })

export type EditorSectionProps = {
  id: string
  title: string
  children: ReactNode
}

export class EditorSection extends PureComponent<EditorSectionProps> {
  render() {
    const { children, title, id } = this.props
    return (
      <EditorContext.Consumer>
        {({ isSectionOpen, setSectionOpen }) => {
          const isOpen = isSectionOpen(id)
          const toggle = () => setSectionOpen(id, !isOpen)
          return (
            <Fragment>
              <div className={sectionHeaderStyle}>
                <div className={headerLabelStyle}>{title}</div>
                <FontAwesomeIcon
                  icon={isOpen ? faChevronUp : faChevronDown}
                  cursor="pointer"
                  size="lg"
                  onClick={toggle}
                />
              </div>
              <div className={sectionChildrenStyle(!isOpen)}>{children}</div>
            </Fragment>
          )
        }}
      </EditorContext.Consumer>
    )
  }
}
