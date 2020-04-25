import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { css } from 'emotion'
import { Fretboard } from '../Fretboard/Fretboard'
import { FretboardModel, FretboardTheme, SelectionModel, MarkerKind, MarkerModel } from '../Fretboard/FretboardModel'
import { MagicFretboardAppState } from '../../state/state'
import { setSelection } from '../../state/selection/selection.actionCreators'
import { updateFretboard, deleteFretboard } from '../../state/fretboards/fretboards.actionCreators'
import { nanoid } from 'nanoid'
import isNil from 'lodash/isNil'
import { downloadAsPng } from '../../converters/downloadAsPng'
import { FretboardMenuButton } from './FretboardMenuButton'
import { faImage, faTimes, faCog, faPalette } from '@fortawesome/free-solid-svg-icons'
import { FretboardMenu, Top, Bottom } from './FretboardMenu'
import { getNoteByStringAndFret } from '../../noteUtils'
import { isMarkerSelection } from '../Fretboard/TypeGuards'

const containerStyle = css({
  display: 'flex',
  flexDirection: 'row',
  flexShrink: 0,
})

const fretboardViewStyle = css({
  padding: '20px',
  overflowX: 'auto',
  overflowY: 'hidden',
  background: 'white',
  borderRadius: '4px',
  border: '1px solid #bbb',
  flexGrow: 1,
  flexShrink: 0,
  transition: 'box-shadow 200ms, background-color 500ms',
  boxShadow: '0px 5px 8px 0px rgba(0,0,0,0.2)',
  ':hover': {
    boxShadow: '0px 5px 8px 0px rgba(0,0,0,0.3)',
  },
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
  deleteFretboard: typeof deleteFretboard
}

export type FretboardViewProps = OwnProps & ReduxProps & ActionCreatorsProps

export class _FretboardView extends PureComponent<FretboardViewProps> {
  private onFretSelected = (fret: number) => {
    const { model, setSelection } = this.props
    setSelection({
      fretboardId: model.id,
      selection: {
        type: 'fretSelection',
        fret,
      },
    })
  }

  private onFretboardSelected = (fretboardId: string) => {
    const { setSelection } = this.props
    setSelection({
      fretboardId: isNil(fretboardId) ? null : fretboardId,
      selection: isNil(fretboardId) ? null : { type: 'fretboardSelection' },
    })
  }

  private onStringSelected = (stringId: string) => {
    const { model, setSelection } = this.props
    setSelection({
      fretboardId: isNil(stringId) ? null : model.id,
      selection: isNil(stringId)
        ? null
        : {
            type: 'stringSelection',
            stringId,
          },
    })
  }

  private onMarkerSelected = (markerId: string) => {
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

  private onMarkerDeleted = (markerId: string) => {
    const { model, selection, setSelection, updateFretboard } = this.props
    // Unset selection
    if (isMarkerSelection(selection) && selection.markerId === markerId) {
      setSelection({ fretboardId: null, selection: null })
    }
    // Remove from fretboard
    updateFretboard({
      fretboard: {
        ...model,
        markers: model.markers.filter((marker) => marker.id !== markerId),
      },
    })
  }

  private onMarkerCreated = (stringId: string, fret: number) => {
    const { updateFretboard, setSelection, model } = this.props
    const newMarker: MarkerModel = {
      id: nanoid(),
      type: 'marker',
      fret,
      stringId,
      kind: MarkerKind.Default,
      muted: false,
      label: getNoteByStringAndFret(model, stringId, fret),
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

  private onThemeSelected = () => {
    const { setSelection } = this.props
    setSelection({ fretboardId: null, selection: { type: 'themeSelection' } })
  }

  private downloadAsPng = () => {
    downloadAsPng(this.props.model, this.props.theme)
  }

  private deleteFretboard = () => {
    const { deleteFretboard } = this.props
    deleteFretboard({ id: this.props.model.id })
  }

  private onFretboardSelectedFromMenu = () => {
    this.onFretboardSelected(this.props.model.id)
  }

  render() {
    const { model, theme, selection } = this.props
    return (
      <div className={containerStyle}>
        <FretboardMenu>
          <Top>
            <FretboardMenuButton onClick={this.onFretboardSelectedFromMenu} icon={faCog} tooltip="Edit fretboard" />
            <FretboardMenuButton icon={faPalette} onClick={this.onThemeSelected} tooltip="Edit theme" />
            <FretboardMenuButton onClick={this.downloadAsPng} icon={faImage} tooltip="Download as PNG" />
          </Top>
          <Bottom>
            <FretboardMenuButton onClick={this.deleteFretboard} icon={faTimes} tooltip="Delete fretboard" />
          </Bottom>
        </FretboardMenu>
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
            onMarkerDeleted={this.onMarkerDeleted}
          />
        </div>
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
  deleteFretboard,
}

export const FretboardView = connect(mapStateToProps, actionCreators)(_FretboardView)
