import React, { PureComponent } from 'react'
import { css } from 'emotion'
import { FretboardView } from './FretboardView'
import { defaultTheme } from '../../state/defaultTheme'
import { sampleModel } from '../Fretboard/sampleModel'
import { FretboardModel } from '../Fretboard/FretboardModel'
import { MagicFretboardAppState } from '../../state/state'
import { connect } from 'react-redux'

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

export type FretboardsViewProps = ReduxProps

type ReduxProps = {
  fretboards: FretboardModel[]
}

export class _FretboardsView extends PureComponent<FretboardsViewProps> {
  render() {
    const { fretboards } = this.props
    return (
      <div className={fretboardsViewStyle}>
        {fretboards.map((fretboard) => (
          <FretboardView model={fretboard} key={fretboard.id} />
        ))}
      </div>
    )
  }
}

function mapStateToProps(state: MagicFretboardAppState): ReduxProps {
  return {
    fretboards: state.fretboards,
  }
}

export const FretboardsView = connect(mapStateToProps)(_FretboardsView)
