import React, { Component } from 'react'
import { observer } from 'mobx-react'

const StockList = observer(
  class StockList extends Component {
    removeStock(stock) {
      this.props.store.removeStock(stock)
    }

    render() {
      const { stocks, colors } = this.props.store
      const stockList = stocks.map((item, idx) => {
        const id = item['Meta Data']['2. Symbol']
        return (
          <li key={id}>
            <span
              onClick={this.removeStock.bind(this, id)}
              style={{ color: colors[idx % 12] }}
            >
              [X]
            </span>&nbsp;&nbsp;{id}
          </li>
        )
      })
      return <ul> {stockList} </ul>
    }
  }
)

export default StockList
