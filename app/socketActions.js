'use strict'
const API = require('./services/alphaVantageAPI')

module.exports = function(io) {
  return {
    socketActions: function(client) {
      if (this.stockdata == undefined) {
        this.stockdata = []
        API.getStockInfo('MSFT', (err, data) => {
          if (err) return console.warn(err)

          this.stockdata.push(data)
          client.emit('new stock', this.stockdata)
        })
      }

      client.on('get stocks', () => {
        client.emit('new stock', this.stockdata)
      })

      client.on('new stock', stock => {
        API.getStockInfo(stock, (err, data) => {
          if (err) return console.warn(err)

          this.stockdata.push(data)
          io.emit('new stock', this.stockdata)
        })
      })

      client.on('remove stock', stock => {
        let newstocks = this.stockdata.filter(item => {
          return item['Meta Data']['2. Symbol'] !== stock
        })
        this.stockdata = newstocks
        io.emit('new stock', this.stockdata)
      })

      client.on('disconnect', () => console.log('A client disconnected'))
    }
  }
}
