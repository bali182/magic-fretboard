import React, { PureComponent } from 'react'
import { FretboardModelUtil } from './FretboadModelUtil'

type FretWireProps = {
  fret: number
  util: FretboardModelUtil
  onFretSelected: (fret: number) => void
}

export class FretWire extends PureComponent<FretWireProps> {
  private onClick = (e: React.MouseEvent<SVGLineElement>) => {
    e.stopPropagation()
    const { fret, onFretSelected } = this.props
    onFretSelected(fret)
  }

  render() {
    const { util, fret } = this.props
    const theme = util.getTheme()
    const x = util.getFretWireX(fret)
    const y1 = util.getFretWireY1(fret)
    const y2 = util.getFretWireY2(fret)
    const onClick = util.isPure ? null : this.onClick
    return (
      <line
        stroke={theme.fretWireColor}
        x1={x}
        x2={x}
        y1={y1}
        y2={y2}
        strokeWidth={theme.fretWireWidth}
        key={fret}
        onClick={onClick}
      />
    )
  }
}
