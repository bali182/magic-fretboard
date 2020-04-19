import React, { PureComponent, Fragment } from 'react'
import { css } from 'emotion'
import { FretboardView } from './FretboardView'
import { FretboardModel, FretboardOrientation } from '../Fretboard/FretboardModel'
import { MagicFretboardAppState } from '../../state/state'
import { connect } from 'react-redux'
import { AddButton } from './AddButton'
import { addFretboard } from '../../state/fretboards/fretboards.actionCreators'
import { nanoid } from 'nanoid'
import { sixGuitarStrings } from '../Fretboard/defaultStrings'
import { EditorHeader, EditorTitle } from '../EditorPanel/EditorHeader'
import { FretboardMenuButton } from './FretboardMenuButton'
import { faPalette } from '@fortawesome/free-solid-svg-icons'
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
  private addFretboard = () => {
    const { addFretboard } = this.props
    addFretboard({
      fretboard: {
        type: 'fretboard',
        id: nanoid(),
        firstVisibleFret: 0,
        lastVisibleFret: 5,
        markers: [],
        orientation: FretboardOrientation.RightHanded,
        strings: sixGuitarStrings,
      },
    })
  }

  private onThemeSelected = () => {
    const { setSelection } = this.props
    setSelection({ fretboardId: null, selection: { type: 'themeSelection' } })
  }

  render() {
    const { fretboards } = this.props
    return (
      <div className={fretboardsViewStyle}>
        <EditorHeader>
          <EditorTitle title="Fretboards" />
          <FretboardMenuButton icon={faPalette} onClick={this.onThemeSelected} tooltip="Theme Settings" />
        </EditorHeader>
        <div className={scrollAreaStyle}>
          {fretboards.map((fretboard, i) => (
            <Fragment key={fretboard.id}>
              <FretboardView model={fretboard} />
              {i === fretboards.length - 1 ? null : <FretboardSeparator />}
            </Fragment>
          ))}
          <AddButton onClick={this.addFretboard} />
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
