import React, { PureComponent } from 'react'
import { GuitarString } from './GuitarString'
import { FretboardContext } from './FretboardContext'

export class GuitarStrings extends PureComponent {
  render() {
    return (
      <FretboardContext.Consumer>
        {({ util }) => util.getModel().strings.map((string) => <GuitarString string={string} key={string.id} />)}
      </FretboardContext.Consumer>
    )
  }
}
