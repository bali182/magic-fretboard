import React, { PureComponent, Fragment } from 'react'
import { css } from 'emotion'
import { FretboardView } from './FretboardView'
import { FretboardModel } from '../Fretboard/FretboardModel'
import { MagicFretboardAppState } from '../../state/state'
import { connect } from 'react-redux'
import { addFretboard } from '../../state/fretboards/fretboards.actionCreators'
import { EditorHeader, EditorTitle } from '../EditorPanel/EditorHeader'
import { setSelection } from '../../state/selection/selection.actionCreators'
import { FretboardSeparator } from './FretboardSeparator'

const fretboardsViewStyle = css({
  height: '100vh',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
  backgroundColor: '#fff',
})

const scrollAreaStyle = css({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  padding: '20px',
})

export type FretboardsViewProps = ReduxProps & ActionCreatorProps

type ReduxProps = {
  fretboards: FretboardModel[]
}

type ActionCreatorProps = {
  addFretboard: typeof addFretboard
  setSelection: typeof setSelection
}

export class _FretboardsView extends PureComponent<FretboardsViewProps> {
  render() {
    const { fretboards } = this.props
    return (
      <div className={fretboardsViewStyle}>
        <EditorHeader>
          <EditorTitle title="Fretboards" />
        </EditorHeader>
        <div className={scrollAreaStyle}>
          {fretboards.map((fretboard, i) => (
            <Fragment key={fretboard.id}>
              <FretboardView model={fretboard} />
              {i === fretboards.length - 1 ? null : <FretboardSeparator />}
            </Fragment>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: MagicFretboardAppState): ReduxProps {
  return {
    fretboards: state.fretboards,
  }
}

const actionCreators: ActionCreatorProps = {
  addFretboard,
  setSelection,
}

export const FretboardsView = connect(mapStateToProps, actionCreators)(_FretboardsView)
