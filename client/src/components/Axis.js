import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { select } from 'd3-selection'

export default class Axis extends Component {
  componentDidUpdate() {
    this.renderAxis()
  }
  componentDidMount() {
    this.renderAxis()
  }
  renderAxis() {
    const { axis, h, axisType } = this.props
    if (axis !== undefined) {
      let node = ReactDOM.findDOMNode(this)
      let selection = select(node)
      selection.call(axis)

      if (axisType === 'grid') {
        selection.select('.domain').remove()
        selection
          .selectAll('.tick line')
          .attr('stroke', '#777')
          .attr('stroke-dasharray', '2,2')
          .attr('x1', h)
      }
    }
  }
  render() {
    const { axisType, h } = this.props

    let translate
    if (axisType === 'x') {
      translate = 'translate(0,' + h + ')'
    } else if (axisType === 'y') {
      translate = 'translate(' + h + ',0)'
    } else {
      translate = 'translate(0,0)'
    }

    return <g className="axis" transform={translate} />
  }
}
