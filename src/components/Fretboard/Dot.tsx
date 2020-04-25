import React, { PureComponent, Fragment } from 'react'
import { FretboardContext } from './FretboardContext'
import { FretboardModelUtil } from './FretboadModelUtil'

export type DotProps = {
  fret: number
}

export class Dot extends PureComponent<DotProps> {
  private renderSingleDot(util: FretboardModelUtil) {
    const { fret } = this.props
    const theme = util.getTheme()
    const x = util.getFretWireX(fret) + theme.fretWidth / 2
    const y = util.getStringAreaHeight() / 2 + util.getTopOverhang() - theme.stringSpacing / 2
    return <circle r={theme.dotRadius} fill={theme.dotColor} cx={x} cy={y} />
  }

  private renderDoubleDot(util: FretboardModelUtil) {
    const { fret } = this.props
    const theme = util.getTheme()
    const x = util.getFretWireX(fret) + theme.fretWidth / 2
    const y1 = theme.stringSpacing * 1.5 + util.getTopOverhang()
    const y2 = util.getStringAreaHeight() + util.getTopOverhang() - theme.stringSpacing * 2.5
    return (
      <Fragment>
        <circle r={theme.dotRadius} fill={theme.dotColor} cx={x} cy={y1} />
        <circle r={theme.dotRadius} fill={theme.dotColor} cx={x} cy={y2} />
      </Fragment>
    )
  }

  render() {
    const { fret } = this.props
    return (
      <FretboardContext.Consumer>
        {({ util }) => {
          const theme = util.getTheme()
          if (!theme.showDots) {
            return null
          }

          const mod12 = (fret + 1) % 12
          const isDoubleDot = fret !== 0 && mod12 === 0
          const isSingleDot = mod12 === 3 || mod12 === 5 || mod12 === 7 || mod12 === 9

          if (isDoubleDot) {
            return this.renderDoubleDot(util)
          } else if (isSingleDot) {
            return this.renderSingleDot(util)
          }
          return null
        }}
      </FretboardContext.Consumer>
    )
  }
}
