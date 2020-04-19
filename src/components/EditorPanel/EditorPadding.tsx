import React, { PureComponent } from 'react'
import { css } from 'emotion'

const editorPaddingStyle = css({
  padding: '10px',
  paddingBottom: '0px',
})

export class EditorPadding extends PureComponent {
  render() {
    return <div className={editorPaddingStyle}>{this.props.children}</div>
  }
}
