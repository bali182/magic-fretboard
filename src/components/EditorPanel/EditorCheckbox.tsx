import React, { PureComponent, ChangeEvent } from 'react'
import { css } from 'emotion'

export const checkboxStyle = css({
  width: '20px',
  height: '20px',
})

export type EditorBooleanProps = {
  value: boolean
  onChange: (value: boolean) => void
  disabled?: boolean
}

export class EditorBoolean extends PureComponent<EditorBooleanProps> {
  private onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked
    const { onChange } = this.props
    onChange(value)
  }

  render() {
    const { value, disabled } = this.props
    return (
      <input
        type="checkbox"
        checked={Boolean(value)}
        onChange={this.onChange}
        disabled={disabled}
        className={checkboxStyle}
      />
    )
  }
}
