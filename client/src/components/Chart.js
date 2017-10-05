import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { scaleTime, scaleLinear } from 'd3-scale'
import { extent, max } from 'd3-array'
import { timeParse } from 'd3-time-format'

import Line from './Line'

let Chart = observer(
  class Chart extends Component {
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
      let x, y
      this.extractDataSeries()
      let content
      if (this.dataSeries.length > 0) {
        let width = 400,
          height = 400
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
          .rangeRound([0, width])
        y = scaleLinear()
          .domain([0, max(closes)])
          .range([height, 0])
        content = this.dataSeries.map((d, i) => (
          <Line
            height={height + 'px'}
            width={width + 'px'}
            xScale={x}
            yScale={y}
            key={d[i].stockName}
            lineColor="#000000"
            data={d}
          />
        ))
      }

      return (
        <svg height="400px" width="400px">
          {content}
        </svg>
      )
    }
  }
)

export default Chart
