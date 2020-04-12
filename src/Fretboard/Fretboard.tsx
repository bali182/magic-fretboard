import React, { PureComponent, ReactNode } from 'react'
import { FretboardModel, StringModel } from './FretboardModel'
import { fromProps, FretboardModelUtil } from './FretboadModelUtil'
import range from 'lodash/range'

export type FretboardProps = {
  model: FretboardModel
}

export class Fretboard extends PureComponent<FretboardProps> {
  render() {
    const util = fromProps(this)
    return (
      <svg width={util.getViewportWidth()} height={util.getViewportHeight()} xmlns="http://www.w3.org/2000/svg">
        {this.renderFrets(util)}
        {this.renderNut(util)}
        {this.renderStrings(util)}
        {this.renderMarkers(util)}
      </svg>
    )
  }

  renderStrings(util: FretboardModelUtil): ReactNode {
    const { model } = this.props
    return model.strings.map(this.renderString(util))
  }

  renderFrets(util: FretboardModelUtil): ReactNode {
    if (util.isNutVisible()) {
      return range(1, util.getFretCount() + 1).map((index) => this.renderFretWire(util, index))
    }
    return range(0, util.getFretCount() + 1).map((index) => this.renderFretWire(util, index))
  }

  renderString = (util: FretboardModelUtil) => (strModel: StringModel): ReactNode => {
    const x1 = util.getStringX1(strModel)
    const x2 = util.getStringX2(strModel)
    const y = util.getStringY(strModel)
    return <line stroke="#6c6c6c" x1={x1} x2={x2} y1={y} y2={y} strokeWidth={strModel.thickness} key={strModel.id} />
  }

  renderFretWire = (util: FretboardModelUtil, index: number) => {
    const { model } = this.props
    const x = util.getFretWireX(index)
    const y1 = util.getFretWireY1(index)
    const y2 = util.getFretWireY2(index)
    return <line stroke="lightgray" x1={x} x2={x} y1={y1} y2={y2} strokeWidth={model.fretWireWidth} key={index} />
  }

  renderNut = (util: FretboardModelUtil) => {
    if (!util.isNutVisible()) {
      return null
    }
    const { model } = this.props
    const x = util.getNutX()
    const y1 = util.getNutY1()
    const y2 = util.getNutY2()
    return <line stroke="#6c6c6c" x1={x} x2={x} y1={y1} y2={y2} strokeWidth={model.nutWidth} key="nut" />
  }

  renderMarkers(util: FretboardModelUtil) {
    /*const cx = MarkerFret * FretSpacing - FretSpacing / 2 + FretPadding
    const cy = MarkerString * StringSpacing + StringPadding
    return <circle fill="#27a9e1" cx={cx} cy={cy} r={MarkerRadius} />*/
    return null
  }
}
