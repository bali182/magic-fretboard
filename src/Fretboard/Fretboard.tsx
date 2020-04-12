import React, { PureComponent, ReactNode } from 'react'
import range from 'lodash/range'

const Strings = 6
const StringWidth = 6
const StringSpacing = 40

const Frets = 10
const FretWidth = 8
const FretSpacing = 100

const MarkerRadius = 20
const MarkerString = 1
const MarkerFret = 8

const FretPadding = FretSpacing / 6
const StringPadding = MarkerRadius

export class Fretboard extends PureComponent {
  render() {
    return (
      <svg
        width={this.getWidth()}
        height={this.getHeight()}
        xmlns="http://www.w3.org/2000/svg"
        style={{ border: '1px solid green' }}>
        {this.renderFrets()}
        {this.renderStrings()}
        {this.renderMarker()}
      </svg>
    )
  }

  // TODO calculate dots
  private getHeight() {
    const overhang = StringWidth
    return (Strings - 1) * StringSpacing + overhang + StringPadding * 2
  }

  private getWidth() {
    const baseWidth = (Frets - 1) * FretSpacing + FretWidth
    return baseWidth + FretPadding * 2
  }

  renderStrings(): ReactNode {
    return range(0, Strings).map((i) => this.renderString(i))
  }

  renderFrets(): ReactNode {
    return range(0, Frets).map((i) => this.renderFret(i))
  }

  renderString(num: number): ReactNode {
    const halfStrWidth = StringWidth / 2
    const x1 = halfStrWidth
    const x2 = this.getWidth() - halfStrWidth
    const y = halfStrWidth + num * StringSpacing + StringPadding
    return (
      <line
        stroke="#6c6c6c"
        x1={x1}
        x2={x2}
        y1={y}
        y2={y}
        strokeWidth={StringWidth}
        strokeLinecap="round"
        key={num}
        cursor="pointer"
        onClick={() => {
          console.log('clicked on str')
        }}
      />
    )
  }

  renderFret(num: number) {
    const halfFretWidth = FretWidth / 2
    const y1 = halfFretWidth + StringPadding
    const y2 = this.getHeight() - halfFretWidth - StringPadding
    const x = FretPadding + halfFretWidth + num * FretSpacing
    return (
      <line stroke="lightgray" x1={x} x2={x} y1={y1} y2={y2} strokeWidth={FretWidth} strokeLinecap="round" key={num} />
    )
  }

  renderMarker() {
    const cx = MarkerFret * FretSpacing - FretSpacing / 2 + FretPadding
    const cy = MarkerString * StringSpacing + StringPadding
    return <circle fill="#27a9e1" cx={cx} cy={cy} r={MarkerRadius} />
  }
}
