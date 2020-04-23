import React, { PureComponent } from 'react'
import { StringModel, Note } from '../Fretboard/FretboardModel'
import { EditorField } from './EditorField'
import { EditorString } from './EditorString'
import { EditorPadding } from './EditorPadding'
import { EditorSelect } from './EditorSelect'
import { ChromaticScaleFromC } from '../FretboardsView/noteUtils'

export type StringEditorProps = {
  string: StringModel
  onChange: (model: StringModel) => void
}

export class StringEditor extends PureComponent<StringEditorProps> {
  private onLabelChange = (label: string) => {
    const { onChange, string } = this.props
    onChange({ ...string, label })
  }
  private onNoteChange = (note: Note) => {
    const { onChange, string } = this.props
    onChange({ ...string, note })
  }
  private renderLabelEditor() {
    const { string } = this.props
    return (
      <EditorField name="Label" description="Short label of the string">
        <EditorString value={string.label} maxLength={3} onChange={this.onLabelChange} />
      </EditorField>
    )
  }
  private renderNoteEditor() {
    const { string } = this.props
    return (
      <EditorField name="Note" description="The note of the string when not fretted">
        <EditorSelect value={string.note} options={ChromaticScaleFromC} onChange={this.onNoteChange} />
      </EditorField>
    )
  }

  render() {
    return (
      <EditorPadding>
        {this.renderLabelEditor()}
        {this.renderNoteEditor()}
      </EditorPadding>
    )
  }
}
