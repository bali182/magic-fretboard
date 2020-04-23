import React, { PureComponent, Fragment } from 'react'
import { MarkerModel, FretboardModel, MarkerKind } from '../Fretboard/FretboardModel'
import { EditorField } from './EditorField'
import { EditorString } from './EditorString'
import { EditorSelect } from './EditorSelect'
import { EditorNumber } from './EditorNumber'
import { EditorPadding } from './EditorPadding'
import { EditorSection } from './EditorSection'
import { EditorBoolean } from './EditorCheckbox'

export type MarkerEditorProps = {
  marker: MarkerModel
  fretboard: FretboardModel
  onChange: (model: MarkerModel) => void
}

const MarkerKinds: MarkerKind[] = [MarkerKind.Default, MarkerKind.Pimary]

enum SectionIds {
  VISUALS = 'VISUALS',
  POSITION = 'POSITION',
}

export class MarkerEditor extends PureComponent<MarkerEditorProps> {
  private onLabelChange = (label: string) => {
    const { onChange, marker } = this.props
    onChange({ ...marker, label })
  }

  private onKindChange = (kind: MarkerKind) => {
    const { onChange, marker } = this.props
    onChange({ ...marker, kind })
  }

  private onMutedChange = (muted: boolean) => {
    const { onChange, marker } = this.props
    onChange({ ...marker, muted, label: muted ? null : marker.label })
  }

  private onFretChange = (fret: number) => {
    const { onChange, marker } = this.props
    onChange({ ...marker, fret })
  }

  private onStringChange = (stringId: string) => {
    const { onChange, marker } = this.props
    onChange({ ...marker, stringId })
  }

  renderVisualsSection() {
    return (
      <EditorSection title="Visuals" id={SectionIds.VISUALS}>
        <EditorPadding>
          {this.renderLabelEditor()}
          {this.renderKindEditor()}
          {this.renderMutedEdtior()}
        </EditorPadding>
      </EditorSection>
    )
  }

  private renderLabelEditor() {
    const { marker } = this.props
    return (
      <EditorField name="Label" description="Short label on the marker">
        <EditorString value={marker.label} maxLength={3} onChange={this.onLabelChange} disabled={marker.muted} />
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

  renderMutedEdtior() {
    const { marker } = this.props
    return (
      <EditorField name="Muted" description="Show the marker as X or circle">
        <EditorBoolean value={marker.muted} onChange={this.onMutedChange} />
      </EditorField>
    )
  }

  renderPositionSection() {
    return (
      <EditorSection title="Position" id={SectionIds.POSITION}>
        <EditorPadding>
          {this.renderFretEditor()}
          {this.renderStringEditor()}
        </EditorPadding>
      </EditorSection>
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
        {this.renderVisualsSection()}
        {this.renderPositionSection()}
      </Fragment>
    )
  }
}
