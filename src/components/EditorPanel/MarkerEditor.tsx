import React, { PureComponent, Fragment } from 'react'
import { MarkerModel, FretboardModel, MarkerKind } from '../Fretboard/FretboardModel'
import { EditorField } from './EditorField'
import { EditorString } from './EditorString'
import { EditorSelect } from './EditorSelect'
import { EditorNumber } from './EditorNumber'

export type MarkerEditorProps = {
  marker: MarkerModel
  fretboard: FretboardModel
  onChange: (model: MarkerModel) => void
}

const MarkerKinds: MarkerKind[] = [MarkerKind.Default, MarkerKind.Pimary, MarkerKind.Muted, MarkerKind.Hollow]

export class MarkerEditor extends PureComponent<MarkerEditorProps> {
  private canHaveLabel(kind: MarkerKind): boolean {
    return kind !== MarkerKind.Hollow && kind !== MarkerKind.Muted
  }

  private onLabelChange = (label: string) => {
    const { onChange, marker } = this.props
    onChange({ ...marker, label })
  }
  private onKindChange = (kind: MarkerKind) => {
    const { onChange, marker } = this.props
    onChange({
      ...marker,
      kind,
      label: this.canHaveLabel(kind) ? marker.label : '',
    })
  }
  private onFretChange = (fret: number) => {
    const { onChange, marker } = this.props
    onChange({ ...marker, fret })
  }
  private onStringChange = (stringId: string) => {
    const { onChange, marker } = this.props
    onChange({ ...marker, stringId })
  }

  private renderLabelEditor() {
    const { marker } = this.props
    return (
      <EditorField name="Label" description="Short label on the marker">
        <EditorString
          value={marker.label}
          maxLength={3}
          onChange={this.onLabelChange}
          disabled={!this.canHaveLabel(marker.kind)}
        />
      </EditorField>
    )
  }

  renderKindEditor() {
    const { marker } = this.props
    return (
      <EditorField name="Kind" description="Kind of visual representation">
        <EditorSelect options={MarkerKinds} value={marker.kind} onChange={this.onKindChange} />
      </EditorField>
    )
  }

  renderFretEditor() {
    const { marker, fretboard } = this.props
    return (
      <EditorField name="Fret" description="The fret the marker is shown">
        <EditorNumber
          value={marker.fret}
          minValue={0}
          maxValue={fretboard.lastVisibleFret}
          onChange={this.onFretChange}
        />
      </EditorField>
    )
  }

  stringifyStringId = (stringId: string) => {
    const string = this.props.fretboard.strings.find((string) => string.id === stringId)
    return string.label
  }

  renderStringEditor() {
    const { marker, fretboard } = this.props
    return (
      <EditorField name="String" description="The string the marker is shown">
        <EditorSelect
          options={fretboard.strings.map((string) => string.id)}
          value={marker.stringId}
          stringify={this.stringifyStringId}
          onChange={this.onStringChange}
        />
      </EditorField>
    )
  }

  render() {
    return (
      <Fragment>
        {this.renderLabelEditor()}
        {this.renderKindEditor()}
        {this.renderFretEditor()}
        {this.renderStringEditor()}
      </Fragment>
    )
  }
}
