import React, { PureComponent, ChangeEvent } from 'react'
import { inputStyle } from './commonStyles'
import isNil from 'lodash/isNil'

export type EditorNumberProps = {
  value: number
  onChange: (value: number) => void
  minValue?: number
  maxValue?: number
  placeholder?: string
  disabled?: boolean
}

export class EditorNumber extends PureComponent<EditorNumberProps> {
  private onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const { onChange } = this.props
    onChange(value.length === 0 ? null : parseInt(value))
  }

  render() {
    const { value, placeholder, minValue, maxValue, disabled } = this.props
    const stringValue = isNil(value) ? '' : value.toString()
    return (
      <input
        type="number"
        value={stringValue}
        className={inputStyle}
        onChange={this.onChange}
        min={minValue}
        max={maxValue}
        placeholder={placeholder}
        disabled={disabled}
      />
    )
  }
}
