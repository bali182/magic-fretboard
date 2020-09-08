import React, { PureComponent } from 'react'
import { FretboardContext } from './FretboardContext'
import { FretboardModelUtil } from './FretboadModelUtil'

export class FretLabel extends PureComponent {
  private renderLabel(util: FretboardModelUtil) {
    const x = util.getFretLabelX()
    const y = util.getFretLabelY()
    const theme = util.getTheme()
    const model = util.getModel()
    return (
      <text
        x={x}
        y={y}
        fill={theme.fretLabelColor}
        color={theme.fretLabelColor}
        fontFamily={theme.fretLabelFontFamily}
        fontSize={theme.fretLabelFontSize}
        textAnchor="middle"
        alignmentBaseline="central">
        {model.firstVisibleFret}
      </text>
    )
  }

  render() {
    return (
      <FretboardContext.Consumer>
        {({ util }) => {
          if (util.isFretLabelVisible()) {
            return this.renderLabel(util)
          }
          return null
        }}
      </FretboardContext.Consumer>
    )
  }
}
