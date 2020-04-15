import React, { PureComponent, ReactNode } from 'react'
import { FretboardModelUtil } from './FretboadModelUtil'
import { StringModel } from './FretboardModel'
import { GuitarString } from './GuitarString'

export type GuitarStringsProps = {
  util: FretboardModelUtil
  onStringSelected: (stringId: string) => void
}

export class GuitarStrings extends PureComponent<GuitarStringsProps> {
  render() {
    const { util } = this.props
    const model = util.getModel()
    return model.strings.map(this.renderString(util))
  }
  renderString = (util: FretboardModelUtil) => (strModel: StringModel): ReactNode => {
    const { onStringSelected } = this.props
    return <GuitarString util={util} string={strModel} onStringSelected={onStringSelected} key={strModel.id} />
  }
}
