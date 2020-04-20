import React, { PureComponent, ReactNode } from 'react'
import { css } from 'emotion'
import { SelectionModel, FretboardModel, MarkerModel, StringModel, FretboardTheme } from '../Fretboard/FretboardModel'
import { connect } from 'react-redux'
import { MagicFretboardAppState } from '../../state/state'
import isNil from 'lodash/isNil'
import { MarkerEditor } from './MarkerEditor'
import { updateFretboard } from '../../state/fretboards/fretboards.actionCreators'
import { isMarkerSelection, isStringSelection, isFretboardSelection, isThemeSelection } from '../Fretboard/TypeGuards'
import { StringEditor } from './StringEditor'
import { FretboardEditor } from './FretboardEditor'
import { EditorHeader, EditorTitle } from './EditorHeader'
import { ThemeEditor } from './ThemeEditor'
import { updateTheme } from '../../state/theme/theme.actionCreators'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { setSelection } from '../../state/selection/selection.actionCreators'
import { EditorContext, EditorContextType } from './EditorContext'

const editorPanelStyle = (visible: boolean) =>
  css({
    position: 'relative',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    width: visible ? '300px' : '0px',
    overflowX: visible ? 'auto' : 'hidden',
    backgroundColor: '#fff',
    borderLeftColor: '#bbb',
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    boxShadow: '0px 0px 24px 0px rgba(0,0,0,0.3)',
  })

const scrollAreaStyle = css({
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
  overflowY: 'auto',
})

type ReduxProps = {
  selection: SelectionModel
  fretboard: FretboardModel
  theme: FretboardTheme
}

type ActionCreatorsProps = {
  updateFretboard: typeof updateFretboard
  updateTheme: typeof updateTheme
  setSelection: typeof setSelection
}

export type SectionState = { [sectionId: string]: boolean }

type EditorPanelState = {
  sectionState: SectionState
}

export type EditorPanelProps = ReduxProps & ActionCreatorsProps

export class _EditorPanel extends PureComponent<EditorPanelProps, EditorPanelState> {
  state: EditorPanelState = {
    sectionState: {},
  }

  private removeSelection = () => {
    const { setSelection } = this.props
    setSelection({ selection: null, fretboardId: null })
  }

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

  private onThemeChange = (theme: FretboardTheme) => {
    const { updateTheme } = this.props
    updateTheme({ theme })
  }

  private setSectionState = (id: string, open: boolean) => {
    const { sectionState } = this.state
    this.setState({ sectionState: { ...sectionState, [id]: !open } })
  }
  private isSectionOpen = (id: string) => {
    const { sectionState } = this.state
    return !Boolean(sectionState[id])
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
      case 'themeSelection':
        return 'Edit Theme'
    }
  }

  private renderEditor(): ReactNode {
    const { selection, fretboard, theme } = this.props
    if (isNil(selection)) {
      return null
    }
    if (isMarkerSelection(selection)) {
      const marker = fretboard.markers.find((marker) => marker.id === selection.markerId)
      return <MarkerEditor marker={marker} onChange={this.onMarkerChange} fretboard={fretboard} />
    } else if (isStringSelection(selection)) {
      const string = fretboard.strings.find((string) => string.id === selection.stringId)
      return <StringEditor string={string} onChange={this.onStringChange} />
    } else if (isFretboardSelection(selection)) {
      return <FretboardEditor fretboard={fretboard} onChange={this.onFretboardChange} />
    } else if (isThemeSelection(selection)) {
      return <ThemeEditor theme={theme} onChange={this.onThemeChange} />
    }
    return <span>No editor available yet</span>
  }

  render() {
    const { selection } = this.props
    const editorContext: EditorContextType = {
      isSectionOpen: this.isSectionOpen,
      setSectionOpen: this.setSectionState,
    }
    return (
      <div className={editorPanelStyle(!isNil(selection))}>
        <EditorHeader>
          <EditorTitle title={this.renderHeaderLabel()} />
          <FontAwesomeIcon icon={faTimes} cursor="pointer" size="lg" onClick={this.removeSelection} />
        </EditorHeader>
        <div className={scrollAreaStyle}>
          <EditorContext.Provider value={editorContext}>{this.renderEditor()}</EditorContext.Provider>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ selection, fretboards, theme }: MagicFretboardAppState): ReduxProps {
  const fretboard: FretboardModel =
    !isNil(selection.fretboardId) && !isNil(selection.selection)
      ? fretboards.find(({ id }) => id === selection.fretboardId)
      : null
  return {
    fretboard,
    selection: selection.selection,
    theme,
  }
}

const actionCreators: ActionCreatorsProps = {
  updateFretboard,
  updateTheme,
  setSelection,
}

export const EditorPanel = connect(mapStateToProps, actionCreators)(_EditorPanel)
