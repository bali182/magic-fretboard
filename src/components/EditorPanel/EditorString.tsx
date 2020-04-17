import React, { PureComponent, ChangeEvent } from 'react'
import { inputStyle } from './commonStyles'
import isNil from 'lodash/isNil'

export type EditorStringProps = {
  value: string
  onChange: (value: string) => void
  minLength?: number
  maxLength?: number
  placeholder?: string
  disabled?: boolean
}

export class EditorString extends PureComponent<EditorStringProps> {
  private onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props
    onChange(e.target.value)
  }

  render() {
    const { value, placeholder, minLength, maxLength, disabled } = this.props
    const stringValue = isNil(value) ? '' : value.toString()
    return (
      <input
        type="text"
        value={stringValue}
        className={inputStyle}
        onChange={this.onChange}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        disabled={disabled}
      />
    )
  }
}
