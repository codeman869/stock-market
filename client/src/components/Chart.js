import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { scaleTime, scaleLinear } from 'd3-scale'
import { extent } from 'd3-array'
import { timeParse } from 'd3-time-format'
import { axisBottom, axisRight, axisLeft } from 'd3-axis'
import { timeDay } from 'd3-time'
import { timeFormat } from 'd3-time-format'

import Line from './Line'
import Axis from './Axis'
import DataPoints from './DataPoints'
import ToolTip from './ToolTip'

let Chart = observer(
  class Chart extends Component {
    constructor(props) {
      super(props)
      this.margin = { top: 5, right: 50, bottom: 20, left: 50 }
      this.showToolTip = this.showToolTip.bind(this)
      this.hideToolTip = this.hideToolTip.bind(this)
      this.state = {
        tooltip: {
          display: false,
          data: {
            key: '',
            value: '',
            stock: ''
          },
          pos: {
            x: '',
            y: ''
          }
        }
      }
    }

    hideToolTip(e) {
      this.setState({
        tooltip: {
          display: false,
          data: {
            key: '',
            value: '',
            stock: ''
          },
          pos: {
            x: '',
            y: ''
          }
        }
      })
    }

    showToolTip(e) {
      // e.target.setAttribute('fill', '#FFFFFF')
      this.setState({
        tooltip: {
          display: true,
          data: {
            key: e.target.getAttribute('data-key'),
            value: e.target.getAttribute('data-value'),
            stock: e.target.getAttribute('data-stock')
          },
          pos: {
            x: e.target.getAttribute('cx'),
            y: e.target.getAttribute('cy')
          }
        }
      })
    }

    extractDataSeries() {
      const { stocks } = this.props.store
      this.dataSeries = []
      let dateParse = timeParse('%Y-%m-%d')
      if (stocks.length <= 0) {
        this.dataSeries = []
      } else {
        for (let i = 0; i < stocks.length; i++) {
          let objSeries = stocks[i]['Time Series (Daily)']
          let stockName = stocks[i]['Meta Data']['2. Symbol']
          let data = []
          Object.keys(objSeries).forEach(key => {
            data.push({
              date: dateParse(key),
              stockName,
              close: parseFloat(objSeries[key]['4. close'])
            })
          })
          this.dataSeries.push(data)
        }
      }
    }

    render() {
      const { colors } = this.props.store

      let { width, height } = this.props

      if (width === undefined || height === undefined) {
        width = 800
        height = 400
      }
      const w = width - (this.margin.right + this.margin.left),
        h = height - (this.margin.top + this.margin.bottom)

      let x, y, xAxis, content, yAxis, displayTimeFormat, gridAxis

      this.extractDataSeries()
      if (this.dataSeries.length > 0) {
        let dates = [],
          closes = []
        this.dataSeries.forEach(data => {
          data.forEach(item => {
            dates.push(item.date)
            closes.push(item.close)
          })
        })
        x = scaleTime()
          .domain(extent(dates))
          .rangeRound([0, w])
        y = scaleLinear()
          .domain(extent(closes))
          .range([h, 0])
        displayTimeFormat = timeFormat('%d %b %y')
        xAxis = axisBottom(x)
          .ticks(timeDay.every(20))
          .tickFormat(displayTimeFormat)
        yAxis = axisRight(y).ticks(20)
        gridAxis = axisLeft(y).ticks(6)
        content = this.dataSeries.map((d, i) => (
          <g key={d[i].stockName + 'Group'}>
            <Line
              height={height + 'px'}
              width={width + 'px'}
              xScale={x}
              yScale={y}
              key={d[i].stockName}
              lineColor={colors[i % 12]}
              data={d}
            />
            <DataPoints
              key={d[i].stockName + 'Points'}
              data={d}
              xScale={x}
              yScale={y}
              color={colors[i % 12]}
              r={4}
              hideToolTip={this.hideToolTip}
              showToolTip={this.showToolTip}
            />
          </g>
        ))
        //let xAxis = <Axis scale={x} />
        //let yAxis = <Axis scale={y} />
      }
      return (
        <svg height={height + 'px'} width={width + 'px'}>
          <g
            transform={
              'translate(' + this.margin.left + ',' + this.margin.top + ')'
            }
          >
            {content}
            <Axis axis={xAxis} axisType="x" h={h} />
            <Axis axis={yAxis} axisType="y" h={w} />
            <Axis axis={gridAxis} axisType="grid" h={w} />
            <ToolTip
              chartHeight={height}
              chartWidth={width}
              tooltip={this.state.tooltip}
            />
          </g>
        </svg>
      )
    }
  }
)

export default Chart
