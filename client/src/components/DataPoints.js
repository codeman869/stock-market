import React, { Component } from 'react'

export default class DataPoints extends Component {
  render() {
    const {
      showToolTip,
      hideToolTip,
      color,
      xScale,
      yScale,
      data,
      r
    } = this.props
    let output
    if (data.length > 0) {
      output = data.map(item => (
        <circle
          style={{ fill: color }}
          key={item.date}
          cx={xScale(item.date)}
          cy={yScale(item.close)}
          r={r}
          onMouseOver={showToolTip}
          onMouseOut={hideToolTip}
          data-key={item.date}
          data-value={item.close}
          data-stock={item.stockName}
        />
      ))
    }

    if (output === undefined) {
      return null
    }

    return output
  }
}
