import React, { PureComponent } from 'react'
import { css } from 'emotion'

const lineStyle = css({
  borderColor: '#bbb',
  borderStyle: 'solid',
  borderTopWidth: '1px',
  height: '1px',
  flexBasis: '1px',
  marginLeft: '60px',
  marginTop: '20px',
  marginBottom: '20px',
})

export class FretboardSeparator extends PureComponent {
  render() {
    return <div className={lineStyle} />
  }
}
