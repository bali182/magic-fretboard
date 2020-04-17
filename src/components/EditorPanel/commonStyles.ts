import { css } from 'emotion'

export const inputStyle = css({
  outline: 'none',
  border: '1px solid #6c6c6c',
  color: '#6c6c6c',
  padding: '6px',
  display: 'block',
  fontSize: '1em',
  width: '100%',
  boxSizing: 'border-box',
  ':focus': {
    border: '2px solid #27a9e1',
    padding: '5px',
  },
  ':disabled': {
    background: '#ddd',
  },
})
