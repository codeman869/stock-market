import React, { Component } from 'react'
import { timeFormat, isoParse } from 'd3-time-format'

export default class ToolTip extends Component {
  render() {
    let width = 150,
      height = 70,
      visibility = 'hidden',
      transform = '',
      transformText = 'translate(' + width / 2 + ',' + (height / 2 - 5) + ')',
      x = 0,
      y = 0,
      yTransform = 0,
      xTransform = 0

    const { display, pos, data } = this.props.tooltip
    const { chartHeight, chartWidth } = this.props

    let formatTime = timeFormat('%d %b %Y')
    if (display === true) {
      x = parseInt(pos.x, 10)
      y = parseInt(pos.y, 10)
      visibility = 'visible'

      if (y > height) {
        yTransform = y - height - 20
        transform =
          'translate(' + (x - width / 2) + ',' + (y - height - 20) + ')'
      } else if (y < height) {
        yTransform = Math.round(y) + 20
        transform =
          'translate(' + (x - width / 2) + ',' + (Math.round(y) + 20) + ')'
      }

      if (x + width > chartWidth) {
        xTransform = x - width
      } else if (x - width / 2 < 0) {
        xTransform = x - width / 2 + 30
      } else {
        xTransform = x - width / 2
      }

      transform = 'translate(' + xTransform + ',' + yTransform + ')'
    } else {
      visibility = 'hidden'
    }

    return (
      <g transform={transform}>
        <rect
          className="shadow"
          width={width}
          height={height}
          rx="5"
          ry="5"
          visibility={visibility}
          fill="#6391da"
          opacity=".8"
        />
        <text visibility={visibility} transform={transformText}>
          <tspan x="0" textAnchor="middle" fontSize="15px" fill="#ffffff">
            {data.stock}
          </tspan>
          <tspan
            x="0"
            textAnchor="middle"
            fontSize="10px"
            fill="#ffffff"
            dy="15"
          >
            {formatTime(isoParse(data.key))}
          </tspan>
          <tspan
            x="0"
            textAnchor="middle"
            fontSize="10px"
            fill="#ffffff"
            dy="15"
          >
            {data.value}
          </tspan>
        </text>
      </g>
    )
  }
}
