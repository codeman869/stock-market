import React, { Component } from 'react'
import { scaleTime, scaleLinear } from 'd3-scale'
import { extent, max } from 'd3-array'
import { timeParse } from 'd3-time-format'
import { line } from 'd3-shape'

export default class Line extends Component {
  getInitialState() {
    return {
      width: this.props.width
    }
  }

  render() {
    let { lineColor, data, width, height } = this.props
    width = parseInt(width, 10)
    height = parseInt(height, 10)
    let dateParse = timeParse('%Y-%m-%d')
    data.forEach(d => (d.date = dateParse(d.date)))

    let x = scaleTime()
      .domain(extent(data, d => d.date))
      .rangeRound([0, width])
    let y = scaleLinear()
      .domain([0, max(data, d => d.close)])
      .range([height, 0])

    let path = line()
      .x(d => x(d.date))
      .y(d => y(d.close))

    let lineStyle = {
      fill: 'none',
      stroke: lineColor || '#7dc7f4',
      strokeWidth: '1px'
    }

    return <path style={lineStyle} d={path(data)} strokeLinecap="round" />
  }
}
