import React, { PureComponent, Fragment } from 'react'
import { FretboardTheme, StringThicknessModel } from '../Fretboard/FretboardModel'
import { EditorField } from './EditorField'
import { EditorNumber } from './EditorNumber'
import { EditorSection } from './EditorSection'
import { EditorString } from './EditorString'
import { EditorPadding } from './EditorPadding'
import { StringThicknessEditor } from './StringThicknessEditor'
import { EditorBoolean } from './EditorCheckbox'

export type ThemeEditorProps = {
  theme: FretboardTheme
  onChange: (model: FretboardTheme) => void
}

export enum ThemeSectionIds {
  FRETS = 'FRETS',
  NUT = 'NUT',
  STRINGS = 'STRINGS',
  MARKERS_COMMON = 'MARKERS_COMMON',
  MARKERS_DEFAULT = 'MARKERS_DEFAULT',
  MARKERS_PRIMARY = 'MARKERS_PRIMARY',
  DOTS = 'DOTS',
  FIRST_FRET_LABEL = 'FIRST_FRET_LABEL',
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

  private onStringSpacingChanged = (stringSpacing: number) => {
    const { onChange, theme } = this.props
    onChange({ ...theme, stringSpacing })
  }

  private onStringOverhangChanged = (stringOverhang: number) => {
    const { onChange, theme } = this.props
    onChange({ ...theme, stringOverhang })
  }

  private onStringColorChanged = (stringColor: string) => {
    const { onChange, theme } = this.props
    onChange({ ...theme, stringColor })
  }

  private onStringThicknessChanged = (stringThickness: StringThicknessModel) => {
    const { onChange, theme } = this.props
    onChange({ ...theme, stringThickness })
  }

  private onMarkerRadiusChanged = (markerRadius: number) => {
    const { onChange, theme } = this.props
    onChange({ ...theme, markerRadius })
  }

  private onMarkerToNutSpaceChanged = (markerToNutSpace: number) => {
    const { onChange, theme } = this.props
    onChange({ ...theme, markerToNutSpace })
  }

  private onMarkerFontSizeChanged = (markerFontSize: number) => {
    const { onChange, theme } = this.props
    onChange({ ...theme, markerFontSize })
  }

  private onMarkerFontFamilyChanged = (markerFontFamily: string) => {
    const { onChange, theme } = this.props
    onChange({ ...theme, markerFontFamily })
  }

  private onDefaultMarkerColorChanged = (defaultMarkerColor: string) => {
    const { onChange, theme } = this.props
    onChange({ ...theme, defaultMarkerColor })
  }

  private onDefaultMarkerFontColorChanged = (defaultMarkerFontColor: string) => {
    const { onChange, theme } = this.props
    onChange({ ...theme, defaultMarkerFontColor })
  }

  private onPrimaryMarkerColorChanged = (primaryMarkerColor: string) => {
    const { onChange, theme } = this.props
    onChange({ ...theme, primaryMarkerColor })
  }

  private onPrimaryMarkerFontColorChanged = (primaryMarkerFontColor: string) => {
    const { onChange, theme } = this.props
    onChange({ ...theme, primaryMarkerFontColor })
  }

  private onHollowMarkerStrokeWidthChanged = (hollowMarkerStrokeWidth: number) => {
    const { onChange, theme } = this.props
    onChange({ ...theme, hollowMarkerStrokeWidth })
  }

  private onMutedMarkerStrokeWidthChanged = (mutedMarkerStrokeWidth: number) => {
    const { onChange, theme } = this.props
    onChange({ ...theme, mutedMarkerStrokeWidth })
  }
  private onShowDotsChanged = (showDots: boolean) => {
    const { onChange, theme } = this.props
    onChange({ ...theme, showDots })
  }
  private onDotColorChanged = (dotColor: string) => {
    const { onChange, theme } = this.props
    onChange({ ...theme, dotColor })
  }
  private onDotRadiusChanged = (dotRadius: number) => {
    const { onChange, theme } = this.props
    onChange({ ...theme, dotRadius })
  }
  private onShowFretLabelChanged = (showFretLabel: boolean) => {
    const { onChange, theme } = this.props
    onChange({ ...theme, showFretLabel })
  }
  private onFretLabelColorChanged = (fretLabelColor: string) => {
    const { onChange, theme } = this.props
    onChange({ ...theme, fretLabelColor })
  }
  private onFretLabelFontFamilyChanged = (fretLabelFontFamily: string) => {
    const { onChange, theme } = this.props
    onChange({ ...theme, fretLabelFontFamily })
  }
  private onFretLabelFontSizeChanged = (fretLabelFontSize: number) => {
    const { onChange, theme } = this.props
    onChange({ ...theme, fretLabelFontSize })
  }

  private renderNutSection() {
    return (
      <EditorSection title="Nut" id={ThemeSectionIds.NUT}>
        <EditorPadding>
          {this.renderNutWidthEditor()}
          {this.renderNutColorEditor()}
        </EditorPadding>
      </EditorSection>
    )
  }

  private renderNutWidthEditor() {
    const { theme } = this.props
    return (
      <EditorField name="Nut width" description="Width of the nut in pixels">
        <EditorNumber value={theme.nutWidth} minValue={1} onChange={this.onNutWidthChanged} />
      </EditorField>
    )
  }

  private renderNutColorEditor() {
    const { theme } = this.props
    return (
      <EditorField name="Nut color" description="Color of the nut (hex or rgba)">
        <EditorString value={theme.nutColor} onChange={this.onNutColorChanged} />
      </EditorField>
    )
  }

  private renderFretsSection() {
    return (
      <EditorSection title="Frets" id={ThemeSectionIds.FRETS}>
        <EditorPadding>
          {this.renderFretWidthEditor()}
          {this.renderFretWireWidthEditor()}
          {this.renderFretWireColor()}
        </EditorPadding>
      </EditorSection>
    )
  }

  private renderFretWidthEditor() {
    const { theme } = this.props
    return (
      <EditorField name="Fret width" description="Width of the frets in pixels">
        <EditorNumber value={theme.fretWidth} minValue={1} onChange={this.onFretWidthChanged} />
      </EditorField>
    )
  }

  private renderFretWireWidthEditor() {
    const { theme } = this.props
    return (
      <EditorField name="Fret wire width" description="Width of the fret wire in pixels">
        <EditorNumber value={theme.fretWireWidth} minValue={1} onChange={this.onFretWireWidthChanged} />
      </EditorField>
    )
  }

  private renderFretWireColor() {
    const { theme } = this.props
    return (
      <EditorField name="Fret wire color" description="Color of the fret wire (hex or rgba)">
        <EditorString value={theme.fretWireColor} onChange={this.onFretWireColorChanged} />
      </EditorField>
    )
  }

  private renderStringsSection() {
    return (
      <EditorSection title="Strings" id={ThemeSectionIds.STRINGS}>
        <EditorPadding>
          {this.renderStringThicknessEditor()}
          {this.renderStringSpacingEditor()}
          {this.renderStringOverhangEditor()}
          {this.renderStringColorEditor()}
        </EditorPadding>
      </EditorSection>
    )
  }

  private renderStringThicknessEditor() {
    const { theme } = this.props
    return <StringThicknessEditor onChange={this.onStringThicknessChanged} value={theme.stringThickness} />
  }

  private renderStringSpacingEditor() {
    const { theme } = this.props
    return (
      <EditorField name="String spacing" description="Space between strings in pixels">
        <EditorNumber value={theme.stringSpacing} minValue={1} onChange={this.onStringSpacingChanged} />
      </EditorField>
    )
  }

  private renderStringOverhangEditor() {
    const { theme } = this.props
    return (
      <EditorField name="String overhang" description="Overhang on first and last fret in pixels">
        <EditorNumber value={theme.stringOverhang} minValue={0} onChange={this.onStringOverhangChanged} />
      </EditorField>
    )
  }

  private renderStringColorEditor() {
    const { theme } = this.props
    return (
      <EditorField name="String color" description="Color of the strings in rgba or hex">
        <EditorString value={theme.stringColor} onChange={this.onStringColorChanged} />
      </EditorField>
    )
  }

  private renderMarkersCommonSection() {
    return (
      <EditorSection title="Markers (Common)" id={ThemeSectionIds.MARKERS_COMMON}>
        <EditorPadding>
          {this.renderMarkerRadiusEditor()}
          {this.renderMarkerFontSizeEditor()}
          {this.renderMarkerFontFamilyEditor()}
          {this.renderMarkerToNutSpaceEditor()}
          {this.renderHollowMarkerStrokeWidthEditor()}
          {this.renderMutedMarkerStrokeWidthEditor()}
        </EditorPadding>
      </EditorSection>
    )
  }

  private renderMarkerRadiusEditor() {
    const { theme } = this.props
    return (
      <EditorField name="Radius" description="Radius of markers in pixels">
        <EditorNumber value={theme.markerRadius} minValue={1} onChange={this.onMarkerRadiusChanged} />
      </EditorField>
    )
  }

  private renderMarkerToNutSpaceEditor() {
    const { theme } = this.props
    return (
      <EditorField name="Space between marker and nut" description="Space in pixels">
        <EditorNumber value={theme.markerToNutSpace} minValue={0} onChange={this.onMarkerToNutSpaceChanged} />
      </EditorField>
    )
  }

  private renderMarkerFontSizeEditor() {
    const { theme } = this.props
    return (
      <EditorField name="Font size" description="Font size of label on markers in pixels">
        <EditorNumber value={theme.markerFontSize} minValue={5} onChange={this.onMarkerFontSizeChanged} />
      </EditorField>
    )
  }

  private renderMarkerFontFamilyEditor() {
    const { theme } = this.props
    return (
      <EditorField name="Font family" description="Font for labels appearing on markers">
        <EditorString value={theme.markerFontFamily} onChange={this.onMarkerFontFamilyChanged} />
      </EditorField>
    )
  }

  private renderHollowMarkerStrokeWidthEditor() {
    const { theme } = this.props
    return (
      <EditorField name="Hollow stroke width" description="Stroke width on markers on unfretted notes in pixels">
        <EditorNumber
          value={theme.hollowMarkerStrokeWidth}
          minValue={1}
          onChange={this.onHollowMarkerStrokeWidthChanged}
        />
      </EditorField>
    )
  }

  private renderMutedMarkerStrokeWidthEditor() {
    const { theme } = this.props
    return (
      <EditorField name="Muted stroke width" description="Stroke width on muted markers in pixels">
        <EditorNumber
          value={theme.mutedMarkerStrokeWidth}
          minValue={1}
          onChange={this.onMutedMarkerStrokeWidthChanged}
        />
      </EditorField>
    )
  }

  private renderMarkersDefaultSection() {
    return (
      <EditorSection title="Markers (Default type)" id={ThemeSectionIds.MARKERS_DEFAULT}>
        <EditorPadding>
          {this.renderDefaultMarkerColorEditor()}
          {this.renderDefaultMarkerFontColorEditor()}
        </EditorPadding>
      </EditorSection>
    )
  }

  private renderDefaultMarkerColorEditor() {
    const { theme } = this.props
    return (
      <EditorField name="Color" description="Color of the default markers">
        <EditorString value={theme.defaultMarkerColor} onChange={this.onDefaultMarkerColorChanged} />
      </EditorField>
    )
  }

  private renderDefaultMarkerFontColorEditor() {
    const { theme } = this.props
    return (
      <EditorField name="Text color" description="Color of the text on default markers">
        <EditorString value={theme.defaultMarkerFontColor} onChange={this.onDefaultMarkerFontColorChanged} />
      </EditorField>
    )
  }

  private renderMarkersPrimarySection() {
    return (
      <EditorSection title="Markers (Primary type)" id={ThemeSectionIds.MARKERS_PRIMARY}>
        <EditorPadding>
          {this.renderPrimaryMarkerColorEditor()}
          {this.renderPrimaryMarkerFontColorEditor()}
        </EditorPadding>
      </EditorSection>
    )
  }

  private renderPrimaryMarkerColorEditor() {
    const { theme } = this.props
    return (
      <EditorField name="Color" description="Color of the primary markers">
        <EditorString value={theme.primaryMarkerColor} onChange={this.onPrimaryMarkerColorChanged} />
      </EditorField>
    )
  }

  private renderPrimaryMarkerFontColorEditor() {
    const { theme } = this.props
    return (
      <EditorField name="Text color" description="Color of the text on primary markers">
        <EditorString value={theme.primaryMarkerFontColor} onChange={this.onPrimaryMarkerFontColorChanged} />
      </EditorField>
    )
  }

  private renderDotsSection() {
    return (
      <EditorSection title="Dots" id={ThemeSectionIds.DOTS}>
        <EditorPadding>
          {this.renderShowDotsEditor()}
          {this.renderDotColorEditor()}
          {this.renderDotRadiusEditor()}
        </EditorPadding>
      </EditorSection>
    )
  }

  private renderShowDotsEditor() {
    const { theme } = this.props
    return (
      <EditorField name="Show dots" description="Show dots on the fretboard (on 3, 5, 7, 12th frets)">
        <EditorBoolean value={theme.showDots} onChange={this.onShowDotsChanged} />
      </EditorField>
    )
  }

  private renderDotColorEditor() {
    const { theme } = this.props
    return (
      <EditorField name="Color" description="Color of fretboard dots">
        <EditorString value={theme.dotColor} onChange={this.onDotColorChanged} />
      </EditorField>
    )
  }

  private renderDotRadiusEditor() {
    const { theme } = this.props
    return (
      <EditorField name="Radius" description="Radius of the dots">
        <EditorNumber value={theme.dotRadius} onChange={this.onDotRadiusChanged} />
      </EditorField>
    )
  }

  private renderFirstFretLabelSection() {
    return (
      <EditorSection title="First fret label" id={ThemeSectionIds.FIRST_FRET_LABEL}>
        <EditorPadding>
          {this.renderShowFretLabelEditor()}
          {this.renderFretLabelColorEditor()}
          {this.renderFretLabelFontFamilyEditor()}
          {this.renderFretLabelFontSizeEditor()}
        </EditorPadding>
      </EditorSection>
    )
  }

  private renderShowFretLabelEditor() {
    const { theme } = this.props
    return (
      <EditorField name="Show label" description="Turn on/off the label above the first fret">
        <EditorBoolean value={theme.showFretLabel} onChange={this.onShowFretLabelChanged} />
      </EditorField>
    )
  }

  private renderFretLabelColorEditor() {
    const { theme } = this.props
    return (
      <EditorField name="Label color" description="The color of the label rendered above first fret">
        <EditorString value={theme.fretLabelColor} onChange={this.onFretLabelColorChanged} />
      </EditorField>
    )
  }

  private renderFretLabelFontFamilyEditor() {
    const { theme } = this.props
    return (
      <EditorField name="Label font" description="The font of the label">
        <EditorString value={theme.fretLabelFontFamily} onChange={this.onFretLabelFontFamilyChanged} />
      </EditorField>
    )
  }

  private renderFretLabelFontSizeEditor() {
    const { theme } = this.props
    return (
      <EditorField name="Label size" description="The size of the label">
        <EditorNumber value={theme.fretLabelFontSize} onChange={this.onFretLabelFontSizeChanged} />
      </EditorField>
    )
  }

  render() {
    return (
      <Fragment>
        {this.renderFretsSection()}
        {this.renderNutSection()}
        {this.renderStringsSection()}
        {this.renderMarkersCommonSection()}
        {this.renderMarkersDefaultSection()}
        {this.renderMarkersPrimarySection()}
        {this.renderDotsSection()}
        {this.renderFirstFretLabelSection()}
      </Fragment>
    )
  }
}
