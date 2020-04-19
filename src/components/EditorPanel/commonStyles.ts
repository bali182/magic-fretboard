import { css } from 'emotion'

export const inputStyle = css({
  outline: 'none',
  border: '1px solid #bbb',
  color: '#6c6c6c',
  padding: '6px',
  display: 'block',
  fontSize: '1em',
  height: '40px',
  borderRadius: '4px',
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
