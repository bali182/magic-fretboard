import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { css } from 'emotion'
import { Fretboard } from '../Fretboard/Fretboard'
import { FretboardModel, FretboardTheme, SelectionModel, MarkerKind, MarkerModel } from '../Fretboard/FretboardModel'
import { MagicFretboardAppState } from '../../state/state'
import { setSelection } from '../../state/selection/selection.actionCreators'
import { updateFretboard } from '../../state/fretboards/fretboards.actionCreators'
import { nanoid } from 'nanoid'
import isNil from 'lodash/isNil'

const fretboardViewStyle = css({
  padding: '20px',
  marginBottom: '20px',
  overflowX: 'auto',
  overflowY: 'hidden',
  flexShrink: 0,
})

type OwnProps = {
  model: FretboardModel
}

type ReduxProps = {
  theme: FretboardTheme
  selection: SelectionModel
}

type ActionCreatorsProps = {
  setSelection: typeof setSelection
  updateFretboard: typeof updateFretboard
}

export type FretboardViewProps = OwnProps & ReduxProps & ActionCreatorsProps

export class _FretboardView extends PureComponent<FretboardViewProps> {
  onFretSelected = (fret: number) => {
    const { model, setSelection } = this.props
    setSelection({
      fretboardId: model.id,
      selection: {
        type: 'fretSelection',
        fret,
      },
    })
  }

  onFretboardSelected = (fretboardId: string) => {
    const { setSelection } = this.props
    setSelection({
      fretboardId: isNil(fretboardId) ? null : fretboardId,
      selection: isNil(fretboardId) ? null : { type: 'fretboardSelection' },
    })
  }

  onStringSelected = (stringId: string) => {
    const { model, setSelection } = this.props
    setSelection({
      fretboardId: model.id,
      selection: {
        type: 'stringSelection',
        stringId,
      },
    })
  }

  onMarkerSelected = (markerId: string) => {
    const { model, setSelection } = this.props
    setSelection({
      fretboardId: isNil(markerId) ? null : model.id,
      selection: isNil(markerId)
        ? null
        : {
            type: 'markerSelection',
            markerId,
          },
    })
  }

  onMarkerCreated = (stringId: string, fret: number) => {
    const { updateFretboard, setSelection, model } = this.props
    const newMarker: MarkerModel = {
      id: nanoid(),
      type: 'marker',
      fret,
      stringId,
      kind: fret === 0 ? MarkerKind.Hollow : MarkerKind.Default,
      label: '',
    }
    const modelWithMarker: FretboardModel = {
      ...model,
      markers: [...model.markers, newMarker],
    }
    updateFretboard({ fretboard: modelWithMarker })
    setSelection({
      fretboardId: model.id,
      selection: {
        type: 'markerSelection',
        markerId: newMarker.id,
      },
    })
  }

  render() {
    const { model, theme, selection } = this.props
    return (
      <div className={fretboardViewStyle}>
        <Fretboard
          selection={selection}
          model={model}
          theme={theme}
          pure={false}
          onFretboardSelected={this.onFretboardSelected}
          onFretSelected={this.onFretSelected}
          onStringSelected={this.onStringSelected}
          onMarkerSelected={this.onMarkerSelected}
          onMarkerCreated={this.onMarkerCreated}
        />
      </div>
    )
  }
}

function mapStateToProps({ theme, selection }: MagicFretboardAppState, props: OwnProps): ReduxProps {
  return {
    theme: theme,
    selection: isNil(selection) || selection.fretboardId !== props.model.id ? null : selection.selection,
  }
}

const actionCreators: ActionCreatorsProps = {
  setSelection,
  updateFretboard,
}

export const FretboardView = connect(mapStateToProps, actionCreators)(_FretboardView)
