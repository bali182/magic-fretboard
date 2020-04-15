import React, { PureComponent } from 'react'
import { FretboardModelUtil } from './FretboadModelUtil'
import { StringModel } from './FretboardModel'

type GuitarStringProps = {
  string: StringModel
  util: FretboardModelUtil
  onStringSelected: (stringId: string) => void
}

export class GuitarString extends PureComponent<GuitarStringProps> {
  private onClick = (e: React.MouseEvent<SVGLineElement>) => {
    e.stopPropagation()
    const { string, onStringSelected } = this.props
    onStringSelected(string.id)
  }

  render() {
    const { util, string } = this.props
    const theme = util.getTheme()
    const x1 = util.getStringX1(string.id)
    const x2 = util.getStringX2(string.id)
    const y = util.getStringY(string.id)
    const onClick = util.isPure() ? null : this.onClick
    return (
      <line
        stroke={theme.stringColor}
        x1={x1}
        x2={x2}
        y1={y}
        y2={y}
        strokeWidth={string.thickness}
        key={string.id}
        onClick={onClick}
      />
    )
  }
}
