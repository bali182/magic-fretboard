import React from 'react'
import { css } from 'emotion'
import { render } from 'react-dom'

class DummyComponent extends React.Component {
  render() {
    return <div className={css({ color: 'red' })}>Hi</div>
  }
}

render(<DummyComponent />, document.getElementById('root'))
