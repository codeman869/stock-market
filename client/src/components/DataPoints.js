import React, { Component } from 'react'

export default class DataPoints extends Component {
  render() {
    const { color, xScale, yScale, data, r } = this.props
    let output
    if (data.length > 0) {
      output = data.map(item => (
        <circle
          style={{ fill: color }}
          key={item.date}
          cx={xScale(item.date)}
          cy={yScale(item.close)}
          r={r}
        />
      ))
    }

    if (output === undefined) {
      return null
    }

    return output
  }
}
