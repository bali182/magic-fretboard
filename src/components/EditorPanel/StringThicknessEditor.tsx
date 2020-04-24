import React, { PureComponent, Fragment } from 'react'
import {
  StringThicknessModel,
  InterpolatedStringThicknessModel,
  UniformStringThicknessModel,
} from '../Fretboard/FretboardModel'
import { EditorField } from './EditorField'
import { EditorSelect } from './EditorSelect'
import { isUniformStringThicknessModel, isInterpolatedStringThicknessModel } from '../Fretboard/TypeGuards'
import { EditorNumber } from './EditorNumber'

export type StringThicknessEditorProps = {
  value: StringThicknessModel
  onChange: (thickness: StringThicknessModel) => void
}

type StringThicknessType = StringThicknessModel['type']

const StringThicknessTypes: StringThicknessType[] = ['InterpolatedStringThicknessModel', 'UniformStringThicknessModel']

export class StringThicknessEditor extends PureComponent<StringThicknessEditorProps> {
  private getDefaultThickness(model: StringThicknessModel): number {
    if (isUniformStringThicknessModel(model)) {
      return model.thickness
    } else if (isInterpolatedStringThicknessModel(model)) {
      return Math.max(model.bottomStringThickness, model.topStringThickness)
    }
  }

  private onStringThicknessTypeChange = (type: StringThicknessType): void => {
    const { onChange, value } = this.props
    if (type === 'InterpolatedStringThicknessModel') {
      const newThickness: InterpolatedStringThicknessModel = {
        type: 'InterpolatedStringThicknessModel',
        topStringThickness: this.getDefaultThickness(value),
        bottomStringThickness: this.getDefaultThickness(value),
      }
      onChange(newThickness)
    } else if (type === 'UniformStringThicknessModel') {
      const newThickness: UniformStringThicknessModel = {
        type: 'UniformStringThicknessModel',
        thickness: this.getDefaultThickness(value),
      }
      onChange(newThickness)
    }
  }

  private onThicknessChanged = (thickness: number): void => {
    const { onChange, value } = this.props
    const castedValue = value as UniformStringThicknessModel
    onChange({ ...castedValue, thickness })
  }
  private onTopStringThicknessChanged = (topStringThickness: number): void => {
    const { onChange, value } = this.props
    const castedValue = value as InterpolatedStringThicknessModel
    onChange({ ...castedValue, topStringThickness })
  }
  private onBottomThicknessChanged = (bottomStringThickness: number): void => {
    const { onChange, value } = this.props
    const castedValue = value as InterpolatedStringThicknessModel
    onChange({ ...castedValue, bottomStringThickness })
  }

  private stringifyStringThicknessType = (type: StringThicknessType): string => {
    switch (type) {
      case 'InterpolatedStringThicknessModel':
        return 'Interpolated'
      case 'UniformStringThicknessModel':
        return 'Uniform'
    }
  }

  private renderTypeSelector() {
    const { value } = this.props
    return (
      <EditorField name="Thickness type" description="Strategy for computing string thickness">
        <EditorSelect
          options={StringThicknessTypes}
          value={value.type}
          onChange={this.onStringThicknessTypeChange}
          stringify={this.stringifyStringThicknessType}
        />
      </EditorField>
    )
  }

  private renderThicknessEditor() {
    const { value } = this.props
    return (
      <EditorField name="Thickness" description="Thickness for every string in pixels">
        <EditorNumber
          value={(value as UniformStringThicknessModel).thickness}
          minValue={1}
          onChange={this.onThicknessChanged}
        />
      </EditorField>
    )
  }

  private renderTopStringThicknessEditor() {
    const { value } = this.props
    return (
      <EditorField name="Top string thickness" description="Thickness of the top string in pixels">
        <EditorNumber
          value={(value as InterpolatedStringThicknessModel).topStringThickness}
          minValue={1}
          onChange={this.onTopStringThicknessChanged}
        />
      </EditorField>
    )
  }
  private renderBottomStringThicknessEditor() {
    const { value } = this.props
    return (
      <EditorField name="Bottom string thickness" description="Thickness of the bottom string in pixels">
        <EditorNumber
          value={(value as InterpolatedStringThicknessModel).bottomStringThickness}
          minValue={1}
          onChange={this.onBottomThicknessChanged}
        />
      </EditorField>
    )
  }

  private renderUnionTypeEditor() {
    const { value } = this.props
    if (isUniformStringThicknessModel(value)) {
      return this.renderThicknessEditor()
    } else if (isInterpolatedStringThicknessModel(value)) {
      return (
        <Fragment>
          {this.renderTopStringThicknessEditor()}
          {this.renderBottomStringThicknessEditor()}
        </Fragment>
      )
    }
  }

  render() {
    return (
      <Fragment>
        {this.renderTypeSelector()}
        {this.renderUnionTypeEditor()}
      </Fragment>
    )
  }
}
