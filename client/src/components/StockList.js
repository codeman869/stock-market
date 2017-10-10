import React, { Component } from 'react'
import { observer } from 'mobx-react'

import './StockList.css'

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
          <div key={id} className="stock-item">
            <span className="close" onClick={this.removeStock.bind(this, id)}>
              X
            </span>
            <span className="stock-text" style={{ color: colors[idx % 12] }}>
              {id}
            </span>
          </div>
        )
      })
      return <div className="stock-list">{stockList}</div>
    }
  }
)

export default StockList
