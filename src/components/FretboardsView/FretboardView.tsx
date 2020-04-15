import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { css } from 'emotion'
import { Fretboard } from '../Fretboard/Fretboard'
import { FretboardModel, FretboardTheme } from '../Fretboard/FretboardModel'
import { MagicFretboardAppState } from '../../state/state'
import { setSelection } from '../../state/selection/selection.actionCreators'

const fretboardViewStyle = css({
  backgroundColor: '#eee',
  border: '1px solid #bbb',
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
}

type ActionCreatorsProps = {
  setSelection: typeof setSelection
}

export type FretboardViewProps = OwnProps & ReduxProps & ActionCreatorsProps

export class _FretboardView extends PureComponent<FretboardViewProps> {
  onFretSelected = (fret: number) => {
    const { model, setSelection } = this.props
    setSelection({
      selection: {
        type: 'fretSelection',
        fret,
        freboardId: model.id,
      },
    })
  }

  onStringSelected = (stringId: string) => {
    const { model, setSelection } = this.props
    setSelection({
      selection: {
        type: 'stringSelection',
        stringId,
        freboardId: model.id,
      },
    })
  }

  onMarkerSelected = (markerId: string) => {
    const { model, setSelection } = this.props
    setSelection({
      selection: {
        type: 'markerSelection',
        markerId,
        freboardId: model.id,
      },
    })
  }

  render() {
    const { model, theme } = this.props
    return (
      <div className={fretboardViewStyle}>
        <Fretboard
          model={model}
          theme={theme}
          pure={false}
          onFretSelected={this.onFretSelected}
          onStringSelected={this.onStringSelected}
          onMarkerSelected={this.onMarkerSelected}
          onMarkerCreated={(stringId, fret) => console.log('onMarkerCreated', stringId, fret)}
        />
      </div>
    )
  }
}

function mapStateToProps(state: MagicFretboardAppState): ReduxProps {
  return {
    theme: state.theme,
  }
}

const actionCreators: ActionCreatorsProps = {
  setSelection,
}

export const FretboardView = connect(mapStateToProps, actionCreators)(_FretboardView)
