import React, { PureComponent } from 'react'
import { css } from 'emotion'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export type FretboardMenuButtonProps = {
  icon: IconProp
  onClick: () => void
}

const menuButtonStyle = css({
  background: '#fff',
  width: '50px',
  height: '50px',
  borderRadius: '25px',
  boxShadow: '0px 5px 8px 0px rgba(0,0,0,0.2)',
  border: '1px solid #bbb',
  cursor: 'pointer',
  display: 'flex',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  justifyItems: 'center',
  marginBottom: '10px',
  transition: 'box-shadow 200ms, background-color 500ms',
  ':hover': {
    boxShadow: '0px 5px 8px 0px rgba(0,0,0,0.3)',
  },
  ':last-child': {
    marginBottom: '0px',
  },
})

export class FretboardMenuButton extends PureComponent<FretboardMenuButtonProps> {
  render() {
    const { icon, onClick } = this.props
    return (
      <div className={menuButtonStyle} onClick={onClick}>
        <FontAwesomeIcon icon={icon} cursor="pointer" size="lg" />
      </div>
    )
  }
}
