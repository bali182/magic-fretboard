import React, { PureComponent } from 'react'
import { FretboardModelUtil } from './FretboadModelUtil'
import { FretWire } from './FretWire'

export type FretsProps = {
  util: FretboardModelUtil
  onFretSelected: (fret: number) => void
}

export class Frets extends PureComponent<FretsProps> {
  render() {
    const { util } = this.props
    return util
      .getFrets(false)
      .filter((fret) => fret > 0)
      .map(this.renderFretWire(util))
  }
  renderFretWire = (util: FretboardModelUtil) => (fret: number) => {
    const { onFretSelected } = this.props
    return <FretWire util={util} fret={fret} onFretSelected={onFretSelected} />
  }
}
