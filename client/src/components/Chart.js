import React, { Component } from 'react'
import { observer } from 'mobx-react'

import Line from './Line'

let Chart = observer(
  class Chart extends Component {
    constructor(props) {
      super(props)
    }
    extractDataSeries() {
      const { stocks } = this.props.store
      this.dataSeries = []
      if (stocks.length <= 0) {
        this.dataSeries = []
      } else {
        for (let i = 0; i < stocks.length; i++) {
          let objSeries = stocks[i]['Time Series (Daily)']
          let stockName = stocks[i]['Meta Data']['2. Symbol']
          let data = []
          Object.keys(objSeries).forEach(key => {
            data.push({
              date: key,
              stockName,
              close: parseFloat(objSeries[key]['4. close'])
            })
          })
          this.dataSeries.push(data)
        }
      }
    }

    render() {
      console.log('rendering chart')
      this.extractDataSeries()
      let content
      if (this.dataSeries.length > 0) {
        console.log('There is a dataseries')
        content = this.dataSeries.map((d, i) => (
          <Line
            height="400px"
            key={d[i].stockName}
            width="400px"
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
