import React, { PureComponent } from 'react'
import { FretboardModelUtil } from './FretboadModelUtil'

type NutProps = {
  util: FretboardModelUtil
}

export class Nut extends PureComponent<NutProps> {
  render() {
    const { util } = this.props
    if (!util.isNutVisible()) {
      return null
    }
    const theme = util.getTheme()
    const x = util.getNutX()
    const y1 = util.getNutY1()
    const y2 = util.getNutY2()
    return <line stroke={theme.nutColor} x1={x} x2={x} y1={y1} y2={y2} strokeWidth={theme.nutWidth} key="nut" />
  }
}
