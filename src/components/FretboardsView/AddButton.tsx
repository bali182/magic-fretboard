import React, { PureComponent } from 'react'
import { css } from 'emotion'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const circleStyle = css({
  width: '50px',
  height: '50px',
  border: '1px solid #bbb',
  borderRadius: '25px',
  cursor: 'pointer',
  display: 'flex',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  justifyItems: 'center',
  boxShadow: '0px 5px 8px 0px rgba(0,0,0,0.2)',
  ':hover': {
    boxShadow: '0px 5px 8px 0px rgba(0,0,0,0.3)',
  },
})

const lineStyle = css({
  borderColor: '#bbb',
  borderStyle: 'solid',
  borderTopWidth: '1px',
  height: '1px',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
})

const leftLineStyle = css(lineStyle, {
  marginLeft: '60px',
})

const containerStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  alignItems: 'center',
  marginTop: '20px',
})

const iconStyle = css({
  color: '#6c6c6c',
})

export type AddButtonProps = {
  onClick: () => void
}

export class AddButton extends PureComponent<AddButtonProps> {
  render() {
    return (
      <div className={containerStyle} onClick={this.props.onClick}>
        <div className={leftLineStyle} />
        <div className={circleStyle} data-tip="Add Fretboard">
          <FontAwesomeIcon icon={faPlus} cursor="pointer" size="lg" className={iconStyle} />
        </div>
        <div className={lineStyle} />
      </div>
    )
  }
}
