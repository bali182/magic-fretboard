import React, { PureComponent, ReactNode } from 'react'
import { css } from 'emotion'

export type EditorFieldProps = {
  name: string
  description: string
  children: ReactNode
}

const fieldStyle = css({
  marginBottom: '20px',
})

const fieldNameStyle = css({
  fontWeight: 'bold',
  marginBottom: '5px',
  color: '#6c6c6c',
})

const fieldDescriptionStyle = css({
  marginBottom: '5px',
  fontSize: '.8em',
  color: '#666',
})

export class EditorField extends PureComponent<EditorFieldProps> {
  render() {
    const { name, children, description } = this.props
    return (
      <div className={fieldStyle}>
        <div className={fieldNameStyle}>{name}</div>
        <div className={fieldDescriptionStyle}>{description}</div>
        {children}
      </div>
    )
  }
}
