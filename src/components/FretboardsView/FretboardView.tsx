import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { css } from 'emotion'
import { Fretboard } from '../Fretboard/Fretboard'
import { FretboardModel, FretboardTheme, SelectionModel, MarkerKind } from '../Fretboard/FretboardModel'
import { MagicFretboardAppState } from '../../state/state'
import { setSelection } from '../../state/selection/selection.actionCreators'
import { updateFretboard } from '../../state/fretboards/fretboards.actionCreators'
import { nanoid } from 'nanoid'

const fretboardViewStyle = css({
  // backgroundColor: '#eee',
  // border: '1px solid #bbb',
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
      fretboardId: model.id,
      selection: {
        type: 'markerSelection',
        markerId,
      },
    })
  }

  onMarkerCreated = (stringId: string, fret: number) => {
    const { updateFretboard, model } = this.props
    const modelWithMarker: FretboardModel = {
      ...model,
      markers: [
        ...model.markers,
        {
          id: nanoid(),
          type: 'marker',
          fret,
          stringId,
          kind: fret === 0 ? MarkerKind.Hollow : MarkerKind.Default,
          label: '',
        },
      ],
    }
    updateFretboard({ fretboard: modelWithMarker })
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
          onFretSelected={this.onFretSelected}
          onStringSelected={this.onStringSelected}
          onMarkerSelected={this.onMarkerSelected}
          onMarkerCreated={this.onMarkerCreated}
        />
      </div>
    )
  }
}

function mapStateToProps(state: MagicFretboardAppState, props: OwnProps): ReduxProps {
  return {
    theme: state.theme,
    selection: state.selection[props.model.id],
  }
}

const actionCreators: ActionCreatorsProps = {
  setSelection,
  updateFretboard,
}

export const FretboardView = connect(mapStateToProps, actionCreators)(_FretboardView)
