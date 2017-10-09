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
    socket.on('invalid stock', stock => console.warn(`Invalid stock: ${stock}`))
    extendObservable(this, {
      stocks: [],
      socket,
      colors: [
        '#a6cee3',
        '#1f78b4',
        '#b2df8a',
        '#33a02c',
        '#fb9a99',
        '#e31a1c',
        '#fdbf6f',
        '#ff7f00',
        '#cab2d6',
        '#6a3d9a',
        '#ffff99',
        '#b15928'
      ]
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
