import React, { PureComponent, ChangeEvent } from 'react'
import { inputStyle } from './commonStyles'

export type EditorSelectProps = {
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder: string
  stringify: (item: string) => string
}

export class EditorSelect<T> extends PureComponent<EditorSelectProps> {
  private onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { onChange } = this.props
    onChange(e.target.value)
  }

  private renderOptions() {
    const { options, value, stringify } = this.props
    return options.map((opt) => (
      <option value={opt} selected={opt === value} key={opt}>
        {stringify(opt)}
      </option>
    ))
  }

  render() {
    const { placeholder, value } = this.props
    return (
      <select className={inputStyle} placeholder={placeholder} onChange={this.onChange} value={value}>
        {this.renderOptions()}
      </select>
    )
  }

  static defaultProps: Partial<EditorSelectProps> = {
    stringify: (item: string) => item,
  }
}
