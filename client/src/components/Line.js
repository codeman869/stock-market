import React, { Component } from 'react'
import { line } from 'd3-shape'

export default class Line extends Component {
  render() {
    let { lineColor, xScale, yScale, data, width, height } = this.props
    width = parseInt(width, 10)
    height = parseInt(height, 10)

    let path = line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.close))

    let lineStyle = {
      fill: 'none',
      stroke: lineColor || '#7dc7f4',
      strokeWidth: '1px'
    }

    return <path style={lineStyle} d={path(data)} strokeLinecap="round" />
  }
}
