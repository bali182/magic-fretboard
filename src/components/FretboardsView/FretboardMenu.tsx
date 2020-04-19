import React, { PureComponent } from 'react'
import { css } from 'emotion'

const menuStyle = css({
  display: 'flex',
  flexDirection: 'column',
  paddingRight: '10px',
})

const topStyle = css({
  display: 'flex',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
  flexDirection: 'column',
  alignItems: 'flex-start',
})

const bottomStyle = css({
  display: 'flex',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
  flexDirection: 'column',
  justifyContent: 'flex-end',
})

export class FretboardMenu extends PureComponent {
  render() {
    const { children } = this.props
    return <div className={menuStyle}>{children}</div>
  }
}

export class Top extends PureComponent {
  render() {
    const { children } = this.props
    return <div className={topStyle}>{children}</div>
  }
}

export class Bottom extends PureComponent {
  render() {
    const { children } = this.props
    return <div className={bottomStyle}>{children}</div>
  }
}
