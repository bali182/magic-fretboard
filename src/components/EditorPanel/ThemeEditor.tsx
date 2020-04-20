import React, { PureComponent, Fragment } from 'react'
import { FretboardTheme } from '../Fretboard/FretboardModel'
import { EditorField } from './EditorField'
import { EditorNumber } from './EditorNumber'
import { EditorSection } from './EditorSection'
import { EditorString } from './EditorString'
import { EditorPadding } from './EditorPadding'

export type ThemeEditorProps = {
  theme: FretboardTheme
  onChange: (model: FretboardTheme) => void
}

enum SectionIds {
  FRETS = 'FRETS',
  NUT = 'NUT',
}

export class ThemeEditor extends PureComponent<ThemeEditorProps> {
  private onFretWidthChanged = (fretWidth: number) => {
    const { onChange, theme } = this.props
    onChange({ ...theme, fretWidth })
  }

  private onFretWireWidthChanged = (fretWireWidth: number) => {
    const { onChange, theme } = this.props
    onChange({ ...theme, fretWireWidth })
  }

  private onFretWireColorChanged = (fretWireColor: string) => {
    const { onChange, theme } = this.props
    onChange({ ...theme, fretWireColor })
  }

  private onNutWidthChanged = (nutWidth: number) => {
    const { onChange, theme } = this.props
    onChange({ ...theme, nutWidth })
  }

  private onNutColorChanged = (nutColor: string) => {
    const { onChange, theme } = this.props
    onChange({ ...theme, nutColor })
  }

  renderNutSection() {
    return (
      <EditorSection title="Nut" id={SectionIds.NUT}>
        <EditorPadding>
          {this.renderNutWidthEditor()}
          {this.renderNutColorEditor()}
        </EditorPadding>
      </EditorSection>
    )
  }

  renderNutWidthEditor() {
    const { theme } = this.props
    return (
      <EditorField name="Nut width" description="Width of the nut in pixels">
        <EditorNumber value={theme.nutWidth} minValue={1} onChange={this.onNutWidthChanged} />
      </EditorField>
    )
  }

  renderNutColorEditor() {
    const { theme } = this.props
    return (
      <EditorField name="Nut color" description="Color of the nut (hex or rgba)">
        <EditorString value={theme.nutColor} onChange={this.onNutColorChanged} />
      </EditorField>
    )
  }

  renderFretsSection() {
    return (
      <EditorSection title="Frets" id={SectionIds.FRETS}>
        <EditorPadding>
          {this.renderFretWidthEditor()}
          {this.renderFretWireWidthEditor()}
          {this.renderFretWireColor()}
        </EditorPadding>
      </EditorSection>
    )
  }

  renderFretWidthEditor() {
    const { theme } = this.props
    return (
      <EditorField name="Fret width" description="Width of the frets in pixels">
        <EditorNumber value={theme.fretWidth} minValue={1} onChange={this.onFretWidthChanged} />
      </EditorField>
    )
  }

  renderFretWireWidthEditor() {
    const { theme } = this.props
    return (
      <EditorField name="Fret wire width" description="Width of the fret wire in pixels">
        <EditorNumber value={theme.fretWireWidth} minValue={1} onChange={this.onFretWireWidthChanged} />
      </EditorField>
    )
  }

  renderFretWireColor() {
    const { theme } = this.props
    return (
      <EditorField name="Fret wire color" description="Color of the fret wire (hex or rgba)">
        <EditorString value={theme.fretWireColor} onChange={this.onFretWireColorChanged} />
      </EditorField>
    )
  }

  render() {
    return (
      <Fragment>
        {this.renderFretsSection()}
        {this.renderNutSection()}
      </Fragment>
    )
  }
}
