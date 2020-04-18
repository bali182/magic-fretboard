import React, { PureComponent, ReactNode } from 'react'
import { css } from 'emotion'
import { SelectionModel, FretboardModel, MarkerModel, StringModel } from '../Fretboard/FretboardModel'
import { connect } from 'react-redux'
import { MagicFretboardAppState } from '../../state/state'
import isNil from 'lodash/isNil'
import { MarkerEditor } from './MarkerEditor'
import { updateFretboard } from '../../state/fretboards/fretboards.actionCreators'
import { isMarkerSelection, isStringSelection, isFretboardSelection } from '../Fretboard/TypeGuards'
import { StringEditor } from './StringEditor'
import { FretboardEditor } from './FretboardEditor'

const editorPanelStyle = css({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  width: '300px',
  backgroundColor: '#fff',
  borderLeftColor: '#bbb',
  borderLeftWidth: '1px',
  borderLeftStyle: 'solid',
  boxShadow: '0px 0px 24px 0px rgba(0,0,0,0.3)',
})

const headerStyle = css({
  height: '50px',
  width: '100%',
  display: 'flex',
  alignContent: 'center',
  alignItems: 'center',
  backgroundColor: '#eee',
  borderBottomColor: '#bbb',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
})

const headerLabelStyle = css({
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
  padding: '8px',
  fontWeight: 'bold',
  fontSize: '1.2em',
  color: '#6c6c6c',
})

const scrollAreaStyle = css({
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
  overflowY: 'auto',
  padding: '8px',
})

type ReduxProps = {
  selection: SelectionModel
  fretboard: FretboardModel
}

type ActionCreatorsProps = {
  updateFretboard: typeof updateFretboard
}

export type EditorPanelProps = ReduxProps & ActionCreatorsProps

export class _EditorPanel extends PureComponent<EditorPanelProps> {
  private onMarkerChange = (marker: MarkerModel) => {
    const { fretboard, updateFretboard } = this.props
    const newFretboard: FretboardModel = {
      ...fretboard,
      markers: fretboard.markers.map((originalMarker) => (originalMarker.id === marker.id ? marker : originalMarker)),
    }
    updateFretboard({ fretboard: newFretboard })
  }

  private onStringChange = (string: StringModel) => {
    const { fretboard, updateFretboard } = this.props
    const newFretboard: FretboardModel = {
      ...fretboard,
      strings: fretboard.strings.map((originalString) => (originalString.id === string.id ? string : originalString)),
    }
    updateFretboard({ fretboard: newFretboard })
  }

  private onFretboardChange = (fretboard: FretboardModel) => {
    const { updateFretboard } = this.props
    updateFretboard({ fretboard })
  }

  private renderHeaderLabel(): string {
    const { selection } = this.props
    if (isNil(selection)) {
      return 'No selection'
    }
    switch (selection.type) {
      case 'markerSelection':
        return 'Edit Marker'
      case 'fretSelection':
        return 'Edit Fret'
      case 'stringSelection':
        return 'Edit String'
      case 'fretboardSelection':
        return 'Edit Fretboard'
    }
  }

  private renderEditor(): ReactNode {
    const { selection, fretboard } = this.props
    if (isNil(selection)) {
      return 'No selection'
    }
    if (isMarkerSelection(selection)) {
      const marker = fretboard.markers.find((marker) => marker.id === selection.markerId)
      return <MarkerEditor marker={marker} onChange={this.onMarkerChange} fretboard={fretboard} />
    } else if (isStringSelection(selection)) {
      const string = fretboard.strings.find((string) => string.id === selection.stringId)
      return <StringEditor string={string} onChange={this.onStringChange} />
    } else if (isFretboardSelection(selection)) {
      return <FretboardEditor fretboard={fretboard} onChange={this.onFretboardChange} />
    }
    return <span>No editor available yet</span>
  }

  render() {
    return (
      <div className={editorPanelStyle}>
        <div className={headerStyle}>
          <div className={headerLabelStyle}>{this.renderHeaderLabel()}</div>
        </div>
        <div className={scrollAreaStyle}>{this.renderEditor()}</div>
      </div>
    )
  }
}

function mapStateToProps({ selection, fretboards }: MagicFretboardAppState): ReduxProps {
  const fretboard: FretboardModel =
    !isNil(selection.fretboardId) && !isNil(selection.selection)
      ? fretboards.find(({ id }) => id === selection.fretboardId)
      : null
  return {
    fretboard,
    selection: selection.selection,
  }
}

const actionCreators: ActionCreatorsProps = {
  updateFretboard: updateFretboard,
}

export const EditorPanel = connect(mapStateToProps, actionCreators)(_EditorPanel)
