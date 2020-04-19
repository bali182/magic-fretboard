import React, { PureComponent } from 'react'
import { FretboardModel, FretboardOrientation } from '../Fretboard/FretboardModel'
import { EditorField } from './EditorField'
import { EditorNumber } from './EditorNumber'
import { EditorSelect } from './EditorSelect'
import { EditorPadding } from './EditorPadding'

export type FretboardEditorProps = {
  fretboard: FretboardModel
  onChange: (model: FretboardModel) => void
}

const Orientations: FretboardOrientation[] = [FretboardOrientation.RightHanded, FretboardOrientation.LeftHanded]

export class FretboardEditor extends PureComponent<FretboardEditorProps> {
  private onFirstVisibleFretChange = (firstVisibleFret: number) => {
    const { onChange, fretboard } = this.props
    onChange({ ...fretboard, firstVisibleFret })
  }
  private onLastVisibleFretChange = (lastVisibleFret: number) => {
    const { onChange, fretboard } = this.props
    onChange({ ...fretboard, lastVisibleFret })
  }
  private onOrientationChange = (orientation: FretboardOrientation) => {
    const { onChange, fretboard } = this.props
    onChange({ ...fretboard, orientation })
  }

  private renderFirstVisibleFretEditor() {
    const { fretboard } = this.props
    return (
      <EditorField name="First visible fret" description="The first visible fret (0 is the nut)">
        <EditorNumber
          value={fretboard.firstVisibleFret}
          minValue={0}
          maxValue={fretboard.lastVisibleFret - 1}
          onChange={this.onFirstVisibleFretChange}
        />
      </EditorField>
    )
  }
  private renderLastVisibleFretEditor() {
    const { fretboard } = this.props
    return (
      <EditorField name="Last visible fret" description="The last visible fret (max 24)">
        <EditorNumber
          value={fretboard.lastVisibleFret}
          minValue={fretboard.firstVisibleFret + 1}
          maxValue={24}
          onChange={this.onLastVisibleFretChange}
        />
      </EditorField>
    )
  }

  private stringifyOrientation = (orientation: FretboardOrientation) => {
    switch (orientation) {
      case FretboardOrientation.RightHanded:
        return 'Right handed'
      case FretboardOrientation.LeftHanded:
        return 'Left handed'
      default:
        return 'Unknown'
    }
  }

  private renderOrientationEditor() {
    const { fretboard } = this.props
    return (
      <EditorField name="Orientation" description="Left or right handed orientation">
        <EditorSelect
          value={fretboard.orientation}
          options={Orientations}
          onChange={this.onOrientationChange}
          stringify={this.stringifyOrientation}
        />
      </EditorField>
    )
  }

  render() {
    return (
      <EditorPadding>
        {this.renderOrientationEditor()}
        {this.renderFirstVisibleFretEditor()}
        {this.renderLastVisibleFretEditor()}
      </EditorPadding>
    )
  }
}
