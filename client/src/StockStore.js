import { extendObservable, autorun } from 'mobx'
import io from 'socket.io-client'

class StockStore {
  constructor() {
    let socket
    if (process.env.NODE_ENV !== 'production') {
      socket = io({
        path: '/api'
      })
    } else {
      socket = io()
    }
    socket.on('new stock', stocks => this.updateStocks(stocks))
    extendObservable(this, {
      stocks: [],
      socket
    })
  }

  createNew(newStock) {
    this.socket.emit('new stock', newStock)
  }

  updateStocks(newStocks) {
    this.stocks = newStocks
  }

  removeStock(stock) {
    this.socket.emit('remove stock', stock)
  }

  getStocks() {
    this.socket.emit('get stocks')
  }
}

let theStore = (window.store = new StockStore())
export default theStore

autorun(() => console.log(theStore.stocks))
