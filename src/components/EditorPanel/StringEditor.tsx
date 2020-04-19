import React, { PureComponent } from 'react'
import { StringModel } from '../Fretboard/FretboardModel'
import { EditorField } from './EditorField'
import { EditorString } from './EditorString'
import { EditorPadding } from './EditorPadding'

export type StringEditorProps = {
  string: StringModel
  onChange: (model: StringModel) => void
}

export class StringEditor extends PureComponent<StringEditorProps> {
  private onLabelChange = (label: string) => {
    const { onChange, string } = this.props
    onChange({ ...string, label })
  }
  private renderLabelEditor() {
    const { string } = this.props
    return (
      <EditorField name="Label" description="Short label of the string">
        <EditorString value={string.label} maxLength={3} onChange={this.onLabelChange} />
      </EditorField>
    )
  }

  render() {
    return <EditorPadding>{this.renderLabelEditor()}</EditorPadding>
  }
}
