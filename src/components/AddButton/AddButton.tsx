import React, { PureComponent } from 'react'
import { css } from 'emotion'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const circleStyle = css({
  width: '50px',
  height: '50px',
  borderColor: '#6c6c6c',
  borderStyle: 'dashed',
  borderWidth: '3px',
  borderRadius: '25px',
  cursor: 'pointer',
  display: 'flex',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  justifyItems: 'center',
})

const lineStyle = css({
  borderColor: '#6c6c6c',
  borderStyle: 'dashed',
  borderTopWidth: '3px',
  height: '1px',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
})

const containerStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  alignItems: 'center',
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
        <div className={lineStyle} />
        <div className={circleStyle}>
          <FontAwesomeIcon icon={faPlus} cursor="pointer" size="lg" className={iconStyle} />
        </div>
        <div className={lineStyle} />
      </div>
    )
  }
}
