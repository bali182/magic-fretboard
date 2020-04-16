import React, { PureComponent } from 'react'
import { css } from 'emotion'
import { FretboardView } from './FretboardView'
import { FretboardModel, FretboardOrientation } from '../Fretboard/FretboardModel'
import { MagicFretboardAppState } from '../../state/state'
import { connect } from 'react-redux'
import { AddButton } from '../AddButton/AddButton'
import { addFretboard } from '../../state/fretboards/fretboards.actionCreators'
import { nanoid } from 'nanoid'
import { sixGuitarStrings } from '../Fretboard/defaultStrings'

const fretboardsViewStyle = css({
  height: '100vh',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
  backgroundColor: '#fff',
  padding: '20px',
})

export type FretboardsViewProps = ReduxProps & ActionCreatorProps

type ReduxProps = {
  fretboards: FretboardModel[]
}

type ActionCreatorProps = {
  addFretboard: typeof addFretboard
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

  render() {
    const { fretboards } = this.props
    return (
      <div className={fretboardsViewStyle}>
        {fretboards.map((fretboard) => (
          <FretboardView model={fretboard} key={fretboard.id} />
        ))}
        <AddButton onClick={this.addFretboard} />
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
}

export const FretboardsView = connect(mapStateToProps, actionCreators)(_FretboardsView)
